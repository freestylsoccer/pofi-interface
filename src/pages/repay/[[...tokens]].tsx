import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import { RowCenter } from '../../components/Row'
import Button, { ButtonError } from '../../components/Button'
import { Currency, CurrencyAmount } from '@sushiswap/sdk'
import React, { useCallback, useState } from 'react'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../modals/TransactionConfirmationModal'
import { calculateGasMargin } from '../../functions/trade'
import { maxAmountSpend } from '../../functions/currency'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from '../../state/mint/hooks'
import { useExpertModeManager } from '../../state/user/hooks'

import Alert from '../../components/Alert'
import { AutoColumn } from '../../components/Column'
import { BigNumber } from '@ethersproject/bignumber'
import { ConfirmAddModalBottom } from '../../features/liquidity/ConfirmAddModalBottom'
import Container from '../../components/Container'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import CurrencyLogo from '../../components/CurrencyLogo'
import Dots from '../../components/Dots'
import DoubleGlowShadow from '../../components/DoubleGlowShadow'
import { Field } from '../../state/mint/actions'
import Head from 'next/head'
import LiquidityHeader from '../../features/liquidity/LiquidityHeader'
import { PairState } from '../../hooks/useV2Pairs'
import ReactGA from 'react-ga'
import { TransactionResponse } from '@ethersproject/providers'
import Web3Connect from '../../components/Web3Connect'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useCurrency } from '../../hooks/Tokens'
import { useIsSwapUnsupported } from '../../hooks/useIsSwapUnsupported'
import { useLingui } from '@lingui/react'
import { useRouter } from 'next/router'
import { useRouterContract } from '../../hooks'
import { useTransactionAdder } from '../../state/transactions/hooks'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import Back from '../../components/Back'

export default function Repay() {
  const { i18n } = useLingui()
  const { account, chainId, library } = useActiveWeb3React()
  const router = useRouter()
  const tokens = router.query.tokens
  const [currencyIdA, currencyIdB] = (tokens as string[]) || [undefined, undefined]

  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)

  const [isExpertMode] = useExpertModeManager()

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  // console.log(reserve[0].projectLiquidityRate)
  // console.log(reserveSize)
  // console.log(formatBigNumberToFixed(liquidityRate, 1, 27)) 1545962.23586 + 10900.0001 + 1464700.7769

  const { onFieldAInput } = useMintActionHandlers(noLiquidity)

  const isValid = !error

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm

  // txn values
  const deadline = useTransactionDeadline() // custom from users settings

  const [txHash, setTxHash] = useState<string>('')

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {}
  )

  const atMaxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0'),
      }
    },
    {}
  )

  const routerContract = useRouterContract()

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], routerContract?.address)

  const addTransaction = useTransactionAdder()

  async function onAdd() {
    if (!chainId || !library || !account || !routerContract) return

    const { [Field.CURRENCY_A]: parsedAmountA } = parsedAmounts

    if (!parsedAmountA || !currencyA || !deadline) {
      return
    }

    let estimate,
      method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null
    estimate = routerContract.estimateGas.repay
    method = routerContract.repay
    args = [currencyIdB, currencyIdA, parsedAmountA.quotient.toString(), account]
    value = null

    setAttemptingTxn(true)
    await estimate(...args, value ? { value } : {})
      .then((estimatedGasLimit) =>
        method(...args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
        }).then((response) => {
          setAttemptingTxn(false)

          addTransaction(response, {
            summary: i18n._(
              t`Repay ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${currencies[Field.CURRENCY_A]?.symbol}`
            ),
          })

          setTxHash(response.hash)

          ReactGA.event({
            category: 'Liquidity',
            action: 'Repay',
            label: [currencies[Field.CURRENCY_A]?.symbol].join('/'),
          })
        })
      )
      .catch((error) => {
        setAttemptingTxn(false)
        // we only care if the error is something _other_ than the user rejected the tx
        if (error?.code !== 4001) {
          console.error(error)
        }
      })
  }

  const modalHeader = () => {
    return (
      <div className="pb-4">
        <div className="flex items-center justify-start gap-3">
          <div className="text-xl font-bold md:text-3xl text-high-emphesis">
            {parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)}
          </div>
          <div className="grid grid-flow-col gap-2">
            <CurrencyLogo currency={currencyA} size={48} />
          </div>
        </div>
        <div className="text-lg font-medium md:text-2xl text-high-emphesis">
          {currencies[Field.CURRENCY_A]?.symbol}
          &nbsp;{i18n._(t`Tokens`)}
        </div>
      </div>
    )
  }

  const modalBottom = () => {
    return (
      <ConfirmAddModalBottom
        price={price}
        currencies={currencies}
        parsedAmounts={parsedAmounts}
        noLiquidity={noLiquidity}
        onAdd={onAdd}
        poolTokenPercentage={poolTokenPercentage}
      />
    )
  }

  const pendingText = i18n._(
    t`Repaying ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)} ${currencies[Field.CURRENCY_A]?.symbol}`
  )

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput('')
    }
    setTxHash('')
  }, [onFieldAInput, txHash])

  const addIsUnsupported = useIsSwapUnsupported(currencies?.CURRENCY_A, currencies?.CURRENCY_B)

  // console.log(
  //   { addIsUnsupported, isValid, approvalA, approvalB },
  //   approvalA === ApprovalState.APPROVED && approvalB === ApprovalState.APPROVED
  // )
  return (
    <>
      <Head>
        <title>Repay | Pofi</title>
        <meta
          key="description"
          name="description"
          content="Add liquidity to the SushiSwap AMM to enable gas optimised and low slippage trades across countless networks"
        />
      </Head>

      <Container id="add-liquidity-page" className="py-20 space-y-6 md:py-24 lg:py-24" maxWidth="2xl">
        <div className="flex items-center justify-between px-4 mb-5">
          <Back />
        </div>

        <Alert
          message={
            noLiquidity ? (
              i18n._(
                t`When creating a pair you are the first liquidity provider. The ratio of tokens you add will set the price of this pool. Once you are happy with the rate, click supply to review`
              )
            ) : (
              <>
                <b>{i18n._(t`Tip:`)}</b>{' '}
                {i18n._(
                  t`By adding liquidity you'll earn 0.25% of all trades on this pair
                proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be
                claimed by withdrawing your liquidity.`
                )}
              </>
            )
          }
          type="information"
        />

        <DoubleGlowShadow>
          <div className="p-4 space-y-4 rounded bg-dark-900" style={{ zIndex: 1 }}>
            <TransactionConfirmationModal
              isOpen={showConfirm}
              onDismiss={handleDismissConfirmation}
              attemptingTxn={attemptingTxn}
              hash={txHash}
              content={() => (
                <ConfirmationModalContent
                  title={i18n._(t`You will repay`)}
                  onDismiss={handleDismissConfirmation}
                  topContent={modalHeader}
                  bottomContent={modalBottom}
                />
              )}
              pendingText={pendingText}
            />
            <div className="flex flex-col space-y-4">
              {pair && pairState !== PairState.INVALID && (
                <LiquidityHeader input={currencies[Field.CURRENCY_A]} output={currencies[Field.CURRENCY_B]} />
              )}

              <div>
                <h2 className="pb-1 text-lg text-center">{i18n._(t`How much would you like to repay?`)}</h2>
              </div>
              {/*<Button
                onClick={() => mint()}
              >
                mint
              </Button>*/}
              <div>
                <CurrencyInputPanel
                  value={formattedAmounts[Field.CURRENCY_A]}
                  onUserInput={onFieldAInput}
                  onMax={() => {
                    onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
                  }}
                  showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
                  currency={currencies[Field.CURRENCY_A]}
                  id="add-liquidity-input-tokena"
                  showCommonBases
                  customText={i18n._(t`Available to repay`)}
                />
              </div>

              {addIsUnsupported ? (
                <Button color="gradient" size="lg" disabled>
                  {i18n._(t`Unsupported Asset`)}
                </Button>
              ) : !account ? (
                <Web3Connect size="lg" color="blue" className="w-full" />
              ) : (
                (approvalA === ApprovalState.NOT_APPROVED ||
                  approvalA === ApprovalState.PENDING ||
                  isValid ||
                  !!error) && (
                  <AutoColumn gap={'md'}>
                    {
                      <RowCenter>
                        {approvalA !== ApprovalState.APPROVED && approvalA !== ApprovalState.UNKNOWN && (
                          <Button
                            color="gradient"
                            size="lg"
                            onClick={approveACallback}
                            disabled={approvalA === ApprovalState.PENDING || !!error}
                            style={{
                              width: '48%',
                            }}
                          >
                            {approvalA === ApprovalState.PENDING ? (
                              <Dots>{i18n._(t`Approving ${currencies[Field.CURRENCY_A]?.symbol}`)}</Dots>
                            ) : (
                              error ?? i18n._(t`Approve ${currencies[Field.CURRENCY_A]?.symbol}`)
                            )}
                          </Button>
                        )}
                      </RowCenter>
                    }

                    {approvalA === ApprovalState.APPROVED && (
                      <ButtonError
                        onClick={() => {
                          isExpertMode ? onAdd() : setShowConfirm(true)
                        }}
                        disabled={!!error || approvalA !== ApprovalState.APPROVED}
                        error={!!error && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]}
                      >
                        {error ?? i18n._(t`Continue`)}
                      </ButtonError>
                    )}
                  </AutoColumn>
                )
              )}
            </div>
          </div>
        </DoubleGlowShadow>
      </Container>
    </>
  )
}
