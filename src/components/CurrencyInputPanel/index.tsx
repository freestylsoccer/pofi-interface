import { Currency, CurrencyAmount, Pair, Percent, Token } from '@sushiswap/sdk'
import React, { ReactNode, useCallback, useState } from 'react'
import { classNames, formatCurrencyAmount } from '../../functions'

import Button from '../Button'
import { ChevronDownIcon } from '@heroicons/react/outline'
import CurrencyLogo from '../CurrencyLogo'
import CurrencySearchModal from '../../modals/SearchModal/CurrencySearchModal'
import DoubleCurrencyLogo from '../DoubleLogo'
import { FiatValue } from './FiatValue'
import { Input as NumericalInput } from '../NumericalInput'
import Lottie from 'lottie-react'
import selectCoinAnimation from '../../animation/select-coin.json'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { useLingui } from '@lingui/react'

interface CurrencyInputPanelProps {
  value?: string
  onUserInput?: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  fiatValue?: CurrencyAmount<Token> | null
  priceImpact?: Percent
  id: string
  showCommonBases?: boolean
  allowManageTokenList?: boolean
  renderBalance?: (amount: CurrencyAmount<Currency>) => ReactNode
  locked?: boolean
  customText?: string
  showSearch?: boolean
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = 'Input',
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  otherCurrency,
  id,
  showCommonBases,
  renderBalance,
  fiatValue,
  priceImpact,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  locked = false,
  customText,
  allowManageTokenList = true,
  showSearch = true,
}: CurrencyInputPanelProps) {
  const { i18n } = useLingui()
  const [modalOpen, setModalOpen] = useState(false)
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  return (
    <div id={id} className={classNames(hideInput ? 'p-1' : 'p-1', 'bg-dark-800')}>
      <div
        className={classNames(
          'flex justify-between w-full space-x-3 bg-dark-800 focus:bg-dark-700 p-3'
          // showMaxButton && selectedCurrencyBalance && 'px-3'
        )}
      >
        {!hideBalance && currency && selectedCurrencyBalance ? (
          <>
            <div className="flex flex-col">
              <div className="text-xs font-medium text-right cursor-pointer text-primary">
                {renderBalance ? renderBalance(selectedCurrencyBalance) : <>{customText}</>}
              </div>
            </div>
            <div className="flex flex-col">
              <div onClick={onMax} className="text-xs font-medium text-right cursor-pointer text-primary">
                {renderBalance ? (
                  renderBalance(selectedCurrencyBalance)
                ) : (
                  <>
                    {formatCurrencyAmount(selectedCurrencyBalance, 4)}{' '}
                    {otherCurrency ? otherCurrency.symbol : currency.symbol}
                  </>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-col justify-between space-y-3 sm:space-y-0 sm:flex-row">
        {!hideInput && (
          <div
            className={classNames(
              'flex items-center w-full space-x-3 bg-dark-900 focus:bg-dark-700 p-3'
              // showMaxButton && selectedCurrencyBalance && 'px-3'
            )}
          >
            <>
              <CurrencyLogo currency={otherCurrency ? otherCurrency : currency} size={'24px'} />
              <NumericalInput
                id="token-amount-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
              />
              {showMaxButton && selectedCurrencyBalance && (
                <Button
                  onClick={onMax}
                  size="xs"
                  className="text-xs font-medium bg-transparent hover:bg-primary border-low-emphesis text-secondary whitespace-nowrap"
                >
                  {i18n._(t`MAX`)}
                </Button>
              )}
            </>
          </div>
        )}
      </div>
      {!disableCurrencySelect && onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
          allowManageTokenList={allowManageTokenList}
          hideBalance={hideBalance}
          showSearch={showSearch}
        />
      )}
    </div>
  )
}
