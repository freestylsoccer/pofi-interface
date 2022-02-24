import { Currency, CurrencyAmount, Fraction, Percent } from '@sushiswap/sdk'

import Button from '../../components/Button'
import { Field } from '../../state/mint/actions'
import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { formatBigNumberToFixed } from '../../utils/formatBalance'
import { BigNumber } from 'ethers'

export function ConfirmRemoveModalBottom({ onWithdraw }: { onWithdraw: () => void }) {
  const { i18n } = useLingui()
  return (
    <div className="p-6 mt-0 -m-6 rounded bg-dark-800">
      <div className="grid gap-1"></div>
      <Button color="gradient" size="lg" onClick={onWithdraw}>
        {/*noLiquidity ? i18n._(t`Create Pool & Supply`) : i18n._(t`Confirm Supply`)*/}
        {i18n._(t`Confirm Withdraw`)}
      </Button>
    </div>
  )
}

export default ConfirmRemoveModalBottom
