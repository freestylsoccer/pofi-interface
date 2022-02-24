import Button, { ButtonError } from '../../../components/Button'
import React, { useCallback, useState } from 'react'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../../modals/TransactionConfirmationModal'
import { calculateGasMargin } from '../../../functions/trade'
import Alert from '../../../components/Alert'
import { AutoColumn } from '../../../components/Column'
import { BigNumber } from '@ethersproject/bignumber'
import { ConfirmRemoveModalBottom } from '../../../features/liquidity/ConfirmRemoveModalBottom'
import Container from '../../../components/Container'
import CurrencyLogo from '../../../components/CurrencyLogo'
import DoubleGlowShadow from '../../../components/DoubleGlowShadow'
import Head from 'next/head'
import ReactGA from 'react-ga'
import { TransactionResponse } from '@ethersproject/providers'
import Web3Connect from '../../../components/Web3Connect'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../../hooks/useActiveWeb3React'
import { useCurrency } from '../../../hooks/Tokens'
import { useLingui } from '@lingui/react'
import { useRouter } from 'next/router'
import { useRouterContract } from '../../../hooks'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import Back from '../../../components/Back'
import { useProtocolDataWithRpc } from '../../../features/farm/hooks'
import { formatBalance } from '../../../functions'
import { Input as NumericalInput } from '../../../components/NumericalInput'

export default function WithdrawInterest() {
  const { i18n } = useLingui()
  const { account, chainId, library } = useActiveWeb3React()
  const router = useRouter()
  const tokens = router.query.tokens
  // console.log(tokens)
  const [currencyIdA] = (tokens as string[]) || [undefined]

  // get reserve data info
  const { user: userReservesData } = useProtocolDataWithRpc()
  const type = router.query.filter == null ? 'current' : (router.query.filter as string)
  // console.log(userReservesData)
  const FILTER = {
    all: (project) => project?.reserve?.projectStatus === true,
    current: (project) => project?.project === currencyIdA,
  }

  const reserve = userReservesData?.filter((project) => {
    return type in FILTER ? FILTER[type](project) : true
  })
  // console.log(reserve?.[0]?.aTokenBalance)
  const interestBalance = BigNumber.from(reserve?.[0]?.aTokenBalance).sub(reserve?.[0]?.pTokenBalance)
  // console.log(interestBalance)
  const underlyingAsset = useCurrency(reserve?.[0]?.reserve?.underlyingAsset)

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm

  const [txHash, setTxHash] = useState<string>('')
  const [error, setError] = useState<string>(undefined)

  const routerContract = useRouterContract()

  const addTransaction = useTransactionAdder()

  async function onWithdraw() {
    if (!chainId || !library || !account || !routerContract) return

    if (!interestBalance || !currencyIdA || !reserve?.[0]?.reserve?.underlyingAsset) {
      return
    }

    let estimate,
      method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null
    estimate = routerContract.estimateGas.withdrawInterest
    method = routerContract.withdrawInterest
    args = [currencyIdA, reserve?.[0]?.reserve?.underlyingAsset, account]
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
              t`Withdraw ${formatBalance(interestBalance, underlyingAsset?.decimals, 4)} ${underlyingAsset?.symbol}`
            ),
          })

          setTxHash(response.hash)

          ReactGA.event({
            category: 'Liquidity',
            action: 'Withdraw',
            label: underlyingAsset?.symbol,
          })
        })
      )
      .catch((error) => {
        setAttemptingTxn(false)
        // we only care if the error is something _other_ than the user rejected the tx
        if (error?.code !== 4001) {
          console.error(error)
          setError(error.message)
        }
      })
  }

  const modalHeader = () => {
    return (
      <div className="pb-4">
        <div className="flex items-center justify-start gap-3">
          <div className="text-xl font-bold md:text-3xl text-high-emphesis">
            {formatBalance(interestBalance, underlyingAsset?.decimals, 6)}
          </div>
          <div className="grid grid-flow-col gap-2">
            <CurrencyLogo currency={underlyingAsset} size={48} />
          </div>
        </div>
        <div className="text-lg font-medium md:text-2xl text-high-emphesis">
          {underlyingAsset?.symbol}
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
    t`Withdrawing ${formatBalance(interestBalance, underlyingAsset?.decimals, 4)} ${underlyingAsset?.symbol}`
  )

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    // if there was a tx hash, we want to clear the input
    setTxHash('')
  }, [txHash])

  return (
    <>
      <Head>
        <title>Withdraw Interest | Pofi</title>
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
            false ? (
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
            {/* <AddRemoveTabs creating={isCreate} adding={true} defaultSlippage={DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE} /> */}

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
              error={error}
            />
            <div className="flex flex-col space-y-4">
              <div>
                <h2 className="pb-1 text-lg text-center">{i18n._(t`Withdraw Interest`)}</h2>
              </div>

              <div>
                <div id="interest-withdraw" className="p-1 bg-dark-800">
                  <div className="flex justify-between w-full space-x-3 bg-dark-800 focus:bg-dark-700 p-3">
                    {interestBalance ? (
                      <>
                        <div className="flex flex-col">
                          <div className="text-xs font-medium text-right cursor-pointer text-primary">
                            {i18n._(t`Available to withdraw`)}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div
                            onClick={() => {
                              ;('')
                            }}
                            className="text-xs font-medium text-right cursor-pointer text-primary"
                          >
                            <>
                              {formatBalance(interestBalance, underlyingAsset?.decimals, 4)} {underlyingAsset?.symbol}
                            </>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>

                  <div className="flex flex-col justify-between space-y-3 sm:space-y-0 sm:flex-row">
                    <div className="flex items-center w-full space-x-3 bg-dark-900 focus:bg-dark-700 p-3">
                      <>
                        <CurrencyLogo currency={underlyingAsset} size={'24px'} />
                        <NumericalInput
                          id="token-amount-input"
                          value={formatBalance(interestBalance, underlyingAsset?.decimals, underlyingAsset?.decimals)}
                          onUserInput={(val) => {}}
                          disabled
                        />
                      </>
                    </div>
                  </div>
                </div>
              </div>

              {!interestBalance ? (
                <Button color="gradient" size="lg" disabled>
                  {i18n._(t`Unavailable balance`)}
                </Button>
              ) : !account ? (
                <Web3Connect size="lg" color="blue" className="w-full" />
              ) : (
                <AutoColumn gap={'md'}>
                  <ButtonError
                    onClick={() => {
                      setShowConfirm(true)
                    }}
                    disabled={!interestBalance}
                    // error={!!error}
                  >
                    {i18n._(t`Continue`)}
                  </ButtonError>
                </AutoColumn>
              )}
            </div>
          </div>
        </DoubleGlowShadow>
      </Container>
    </>
  )
}
