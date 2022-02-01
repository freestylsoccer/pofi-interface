import { Currency, CurrencyAmount, Fraction, Percent } from '@sushiswap/sdk'

import Button from '../../components/Button'
import { Field } from '../../state/mint/actions'
import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { formatBigNumberToFixed } from '../../utils/formatBalance'
import { BigNumber } from 'ethers'

export function ConfirmRemoveModalBottom({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onWithdraw,
  liquidityRate,
  stableBorrowRate,
  reserveSize,
}: {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in Field]?: Currency }
  parsedAmounts: { [field in Field]?: CurrencyAmount<Currency> }
  poolTokenPercentage?: Percent
  onWithdraw: () => void
  liquidityRate?: BigNumber
  stableBorrowRate?: BigNumber
  reserveSize?: BigNumber
}) {
  const { i18n } = useLingui()
  return (
    <div className="p-6 mt-0 -m-6 rounded bg-dark-800">
      <div className="grid gap-1"></div>

      {/*<div className="h-px my-6 bg-gray-700" />
      <div className="grid gap-1 pb-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-secondary">{i18n._(t`${currencies[Field.CURRENCY_A]?.symbol} Deposited`)}</div>
          <div className="text-sm font-bold justify-center items-center flex right-align pl-1.5 text-high-emphesis">
            <div>{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</div>
            <span className="ml-1">{parsedAmounts[Field.CURRENCY_A]?.currency.symbol}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-secondary">{i18n._(t`${currencies[Field.CURRENCY_B]?.symbol} Deposited`)}</div>
          <div className="text-sm font-bold justify-center items-center flex right-align pl-1.5 text-high-emphesis">
            <div>{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</div>
            <span className="ml-1">{parsedAmounts[Field.CURRENCY_B]?.currency.symbol}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-secondary">{i18n._(t`Share of Pool:`)}</div>
          <div className="text-sm font-bold justify-center items-center flex right-align pl-1.5 text-high-emphesis">
            {noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%
          </div>
        </div>
      </div>*/}

      <Button color="gradient" size="lg" onClick={onWithdraw}>
        {/*noLiquidity ? i18n._(t`Create Pool & Supply`) : i18n._(t`Confirm Supply`)*/}
        {i18n._(t`Confirm Withdraw`)}
      </Button>
    </div>
  )
}

export default ConfirmRemoveModalBottom
