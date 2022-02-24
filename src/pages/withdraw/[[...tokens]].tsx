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
import { ConfirmRemoveModalBottom } from '../../features/liquidity/ConfirmRemoveModalBottom'
import Container from '../../components/Container'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import CurrencyLogo from '../../components/CurrencyLogo'
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

export default function Withdraw() {
  const { i18n } = useLingui()
  const { account, chainId, library } = useActiveWeb3React()
  const router = useRouter()
  const tokens = router.query.tokens

  const [currencyIdA, currencyIdB, currencyIdC] = (tokens as string[]) || [undefined, undefined, undefined]

  const currencyA = useCurrency(currencyIdA) // aToken
  const currencyB = useCurrency(currencyIdB) // underlyingAsset

  const [isExpertMode] = useExpertModeManager()

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const { dependentField, currencies, pair, pairState, currencyBalances, parsedAmounts, noLiquidity, error } =
    useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)
  // console.log(error)

  const { onFieldAInput } = useMintActionHandlers(noLiquidity)

  const isValid = !error

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm

  // txn values
  const deadline = useTransactionDeadline() // custom from users settings

  const [txHash, setTxHash] = useState<string>('')
  const [txtError, setTxtError] = useState<string>(undefined)

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

  const addTransaction = useTransactionAdder()

  async function onWithdraw() {
    if (!chainId || !library || !account || !routerContract) return

    const { [Field.CURRENCY_A]: parsedAmountA } = parsedAmounts

    if (!parsedAmountA || !currencyA || !deadline) {
      return
    }

    let estimate,
      method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null
    estimate = routerContract.estimateGas.withdraw
    method = routerContract.withdraw
    args = [currencyIdC, currencyIdB, parsedAmountA.quotient.toString(), account]
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
              t`Withdraw ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(2)} ${currencies[Field.CURRENCY_B]?.symbol}`
            ),
          })

          setTxHash(response.hash)

          ReactGA.event({
            category: 'Liquidity',
            action: 'Withdraw',
            label: [currencies[Field.CURRENCY_B]?.symbol].join('/'),
          })
        })
      )
      .catch((error) => {
        setAttemptingTxn(false)
        // we only care if the error is something _other_ than the user rejected the tx
        if (error?.code !== 4001) {
          console.error(error)
          setTxtError(error.message)
        }
      })
  }

  const modalHeader = () => {
    return (
      <div className="pb-4">
        <div className="flex items-center justify-start gap-3">
          <div className="text-xl font-bold md:text-3xl text-high-emphesis">
            {parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}
          </div>
          <div className="grid grid-flow-col gap-2">
            <CurrencyLogo currency={currencyB} size={48} />
          </div>
        </div>
        <div className="text-lg font-medium md:text-2xl text-high-emphesis">
          {currencies[Field.CURRENCY_B]?.symbol}
          &nbsp;{i18n._(t`Tokens`)}
        </div>
        <div className="pt-3 text-xs italic text-secondary">
          {i18n._(t`These are your transaction details. Make sure to check if this is correct before submitting.`)}
        </div>
      </div>
    )
  }

  const modalBottom = () => {
    return <ConfirmRemoveModalBottom onWithdraw={onWithdraw} />
  }

  const pendingText = i18n._(
    t`Withdrawing ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)} ${currencies[Field.CURRENCY_B]?.symbol}`
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
  // console.log(formattedAmounts[Field.CURRENCY_B])
  // console.log(
  //   { addIsUnsupported, isValid, approvalA, approvalB },
  //   approvalA === ApprovalState.APPROVED && approvalB === ApprovalState.APPROVED
  // )
  return (
    <>
      <Head>
        <title>Withdraw | Pofi</title>
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
                  title={i18n._(t`You will withdraw`)}
                  onDismiss={handleDismissConfirmation}
                  topContent={modalHeader}
                  bottomContent={modalBottom}
                />
              )}
              pendingText={pendingText}
              error={txtError}
            />
            <div className="flex flex-col space-y-4">
              {pair && pairState !== PairState.INVALID && (
                <LiquidityHeader input={currencies[Field.CURRENCY_A]} output={currencies[Field.CURRENCY_B]} />
              )}

              <div>
                <h2 className="pb-1 text-lg text-center">{i18n._(t`Withdraw`)}</h2>
                <div className="text-sm text-center">{i18n._(t`How much do you want to withdraw?`)}</div>
              </div>

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
                  customText={i18n._(t`Available to withdraw`)}
                  otherCurrency={currencies[Field.CURRENCY_B]}
                />
              </div>

              {addIsUnsupported ? (
                <Button color="gradient" size="lg" disabled>
                  {i18n._(t`Unsupported Asset`)}
                </Button>
              ) : !account ? (
                <Web3Connect size="lg" color="blue" className="w-full" />
              ) : (
                (isValid || !!error) && (
                  <AutoColumn gap={'md'}>
                    {formattedAmounts[Field.CURRENCY_A] !== undefined && currencyBalances.CURRENCY_A && (
                      <ButtonError
                        onClick={() => {
                          isExpertMode ? onWithdraw() : setShowConfirm(true)
                        }}
                        disabled={!!error}
                        error={!!error && !!parsedAmounts[Field.CURRENCY_A]}
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
