import {
  ChainId,
  CurrencyAmount,
  JSBI,
  MASTERCHEF_ADDRESS,
  MASTERCHEF_V2_ADDRESS,
  MINICHEF_ADDRESS,
} from '@sushiswap/sdk'
import { Chef } from './enum'
import { Dispatch, useCallback, useEffect, useMemo, useState } from 'react'
import { NEVER_RELOAD, useSingleCallResult, useSingleContractMultipleData } from '../../state/multicall/hooks'
import { useMasterChefContract, useMasterChefV2Contract, useMiniChefContract } from '../../hooks'

import { Contract } from '@ethersproject/contracts'
import { SUSHI } from '../../constants'
import { Zero } from '@ethersproject/constants'
import concat from 'lodash/concat'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import zip from 'lodash/zip'
import { useUiPoolDataProvider } from '../../hooks'
import { ethers, BigNumber } from 'ethers'
import { LENDING_POOL_ADDRESSESS_PROVIDER } from '../../constants'

export function useChefContract(chef: Chef) {
  const masterChefContract = useMasterChefContract()
  const masterChefV2Contract = useMasterChefV2Contract()
  const miniChefContract = useMiniChefContract()
  const contracts = useMemo(
    () => ({
      [Chef.MASTERCHEF]: masterChefContract,
      [Chef.MASTERCHEF_V2]: masterChefV2Contract,
      [Chef.MINICHEF]: miniChefContract,
    }),
    [masterChefContract, masterChefV2Contract, miniChefContract]
  )
  return useMemo(() => {
    return contracts[chef]
  }, [contracts, chef])
}

const CHEFS = {
  [ChainId.MAINNET]: [Chef.MASTERCHEF, Chef.MASTERCHEF_V2],
  [ChainId.MATIC]: [Chef.MINICHEF],
}

export function useChefContracts(chefs: Chef[]) {
  const masterChefContract = useMasterChefContract()
  const masterChefV2Contract = useMasterChefV2Contract()
  const miniChefContract = useMiniChefContract()
  const contracts = useMemo(
    () => ({
      [Chef.MASTERCHEF]: masterChefContract,
      [Chef.MASTERCHEF_V2]: masterChefV2Contract,
      [Chef.MINICHEF]: miniChefContract,
    }),
    [masterChefContract, masterChefV2Contract, miniChefContract]
  )
  return chefs.map((chef) => contracts[chef])
}

export function useUserInfo(farm, token) {
  const { account } = useActiveWeb3React()

  const contract = useChefContract(farm.chef)

  const args = useMemo(() => {
    if (!account) {
      return
    }
    return [String(farm.id), String(account)]
  }, [farm, account])

  const result = useSingleCallResult(args ? contract : null, 'userInfo', args)?.result

  const value = result?.[0]

  const amount = value ? JSBI.BigInt(value.toString()) : undefined

  return amount ? CurrencyAmount.fromRawAmount(token, amount) : undefined
}

export function usePendingSushi(farm) {
  const { account, chainId } = useActiveWeb3React()

  const contract = useChefContract(farm.chef)

  const args = useMemo(() => {
    if (!account) {
      return
    }
    return [String(farm.id), String(account)]
  }, [farm, account])

  const result = useSingleCallResult(args ? contract : null, 'pendingSushi', args)?.result

  const value = result?.[0]

  const amount = value ? JSBI.BigInt(value.toString()) : undefined

  return amount ? CurrencyAmount.fromRawAmount(SUSHI[chainId], amount) : undefined
}

export function usePendingToken(farm, contract) {
  const { account } = useActiveWeb3React()

  const args = useMemo(() => {
    if (!account || !farm) {
      return
    }
    return [String(farm.pid), String(account)]
  }, [farm, account])

  const pendingTokens = useSingleContractMultipleData(
    args ? contract : null,
    'pendingTokens',
    args.map((arg) => [...arg, '0'])
  )

  return useMemo(() => pendingTokens, [pendingTokens])
}

export function useChefPositions(contract?: Contract | null, rewarder?: Contract | null, chainId = undefined) {
  const { account } = useActiveWeb3React()

  const numberOfPools = useSingleCallResult(contract ? contract : null, 'poolLength', undefined, NEVER_RELOAD)
    ?.result?.[0]

  const args = useMemo(() => {
    if (!account || !numberOfPools) {
      return
    }
    return [...Array(numberOfPools.toNumber()).keys()].map((pid) => [String(pid), String(account)])
  }, [numberOfPools, account])

  const pendingSushi = useSingleContractMultipleData(args ? contract : null, 'pendingSushi', args)

  const userInfo = useSingleContractMultipleData(args ? contract : null, 'userInfo', args)

  // const pendingTokens = useSingleContractMultipleData(
  //     rewarder,
  //     'pendingTokens',
  //     args.map((arg) => [...arg, '0'])
  // )

  const getChef = useCallback(() => {
    if (MASTERCHEF_ADDRESS[chainId] === contract.address) {
      return Chef.MASTERCHEF
    } else if (MASTERCHEF_V2_ADDRESS[chainId] === contract.address) {
      return Chef.MASTERCHEF_V2
    } else if (MINICHEF_ADDRESS[chainId] === contract.address) {
      return Chef.MINICHEF
    }
  }, [chainId, contract])

  return useMemo(() => {
    if (!pendingSushi || !userInfo) {
      return []
    }
    return zip(pendingSushi, userInfo)
      .map((data, i) => ({
        id: args[i][0],
        pendingSushi: data[0].result?.[0] || Zero,
        amount: data[1].result?.[0] || Zero,
        chef: getChef(),
        // pendingTokens: data?.[2]?.result,
      }))
      .filter(({ pendingSushi, amount }) => {
        return (pendingSushi && !pendingSushi.isZero()) || (amount && !amount.isZero())
      })
  }, [args, getChef, pendingSushi, userInfo])
}

export function usePositions(chainId = undefined) {
  const [masterChefV1Positions, masterChefV2Positions, miniChefPositions] = [
    useChefPositions(useMasterChefContract(), undefined, chainId),
    useChefPositions(useMasterChefV2Contract(), undefined, chainId),
    useChefPositions(useMiniChefContract(), undefined, chainId),
  ]
  return concat(masterChefV1Positions, masterChefV2Positions, miniChefPositions)
}

/*
  Currently expensive to render farm list item. The infinite scroll is used to
  to minimize this impact. This hook pairs with it, keeping track of visible
  items and passes this to <InfiniteScroll> component.
*/
export function useInfiniteScroll(items): [number, Dispatch<number>] {
  const [itemsDisplayed, setItemsDisplayed] = useState(10)
  useEffect(() => setItemsDisplayed(10), [items.length])
  return [itemsDisplayed, setItemsDisplayed]
}

function formatObjectWithBNFields(obj: object): any {
  return Object.keys(obj).reduce((acc, key) => {
    if (isNaN(Number(key))) {
      // @ts-ignore
      let value = obj[key]
      if (value._isBigNumber) {
        value = value.toString()
      }
      acc[key] = value
    }
    return acc
  }, {} as any)
}

/**
 * removes the marketPrefix from a symbol
 * @param symbol
 * @param prefix
 */
export const unPrefixSymbol = (symbol: string, prefix: string) => {
  return symbol.toUpperCase().replace(new RegExp(`^(${prefix[0]}?${prefix.slice(1)})`), '')
}

type ReserveData = {
  id: string
  underlyingAsset: string
  name: string
  symbol: string
  decimals: number
  isActive: boolean
  isFrozen: boolean
  aTokenAddress: string
  pTokenAddress: string
  stableDebtTokenAddress: string
  borrowingEnabled: boolean
  depositsEnabled: boolean
  withdrawalsEnabled: boolean
  interestWithdrawalsEnabled: boolean
  stableBorrowRateEnabled: boolean
  averageStableRate: string
  stableDebtLastUpdateTimestamp: number
  baseVariableBorrowRate: string
  liquidityIndex: string
  avg30DaysVariableBorrowRate?: string
  availableLiquidity: string
  stableBorrowRate: string
  liquidityRate: string
  avg30DaysLiquidityRate?: string
  totalPrincipalStableDebt: string
  totalScaledVariableDebt: string
  lastUpdateTimestamp: number
  projectLiquidityRate: string
  projectBorrowRate: string
}

type UserReserveData = {
  scaledATokenBalance: string
  scaledVariableDebt: string
  variableBorrowIndex: string
  aTokenBalance: string
  pTokenBalance: string
  stableDebtTokenBalance: string
  scaledPTokenBalance: string
  principalStableDebt: string
  stableBorrowLastUpdateTimestamp: number
  reserve: {
    id: string
    underlyingAsset: string
    project: string
    name: string
    symbol: string
    decimals: number
    liquidityRate: BigNumber
    stableBorrowRate: BigNumber
    reserveLiquidationBonus: string
    lastUpdateTimestamp: number
    aTokenAddress: string
    pTokenAddress: string
    stableDebtTokenAddress: string
    withdrawalsEnabled: boolean
    interestWithdrawalsEnabled: boolean
    depositsEnabled: boolean
    borrowingEnabled: boolean
    projectLiquidityRate: string
    projectBorrowRate: string
  }
}

export interface PoolDataContextData {
  loading?: boolean
  isUserHasDeposits?: boolean
  reserves: ReserveData[]
  user?: UserReserveData[]
}

export interface StaticPoolDataContextData {
  rawReserves: ReserveData[]
  isUserHasDeposits: boolean
  rawUserReserves?: UserReserveData[]
}

export function useProtocolDataWithRpc(): PoolDataContextData {
  const { account, chainId } = useActiveWeb3React()
  const currentAccount = account ? account.toLowerCase() : ethers.constants.AddressZero
  const poolDataProviderContract = useUiPoolDataProvider()
  const addressessProvider = LENDING_POOL_ADDRESSESS_PROVIDER[chainId]
  // console.log(addressessProvider)
  const reservesData = useSingleContractMultipleData(
    poolDataProviderContract,
    'getReservesData',
    [[addressessProvider]],
    undefined,
    100_000
  )
  // console.log(reservesData)
  const userReserves = useSingleContractMultipleData(
    poolDataProviderContract,
    'getUserReservesData',
    [[addressessProvider, currentAccount]],
    undefined,
    100_000
  )
  // console.log(userReserves)
  const reservesDataLoading: boolean = useMemo(
    () => reservesData.some((callState) => callState.loading),
    [reservesData]
  )
  const userReservesDataLoading: boolean = useMemo(
    () => userReserves.some((callState) => callState.loading),
    [userReserves]
  )
  const loading = !reservesDataLoading && !userReservesDataLoading ? false : true
  // console.log(reservesDataLoading)
  // console.log(userReservesDataLoading)
  // console.log(loading)
  const rawReservesData = reservesData?.[0]?.result?.[0]

  const formattedReservesData = rawReservesData?.map((rawReserve) => {
    const formattedReserve = formatObjectWithBNFields(rawReserve)
    formattedReserve.symbol = rawReserve.symbol.toUpperCase()
    formattedReserve.id = (rawReserve.project + rawReserve.underlyingAsset).toLowerCase()
    formattedReserve.underlyingAsset = rawReserve.underlyingAsset.toLowerCase()
    formattedReserve.project = rawReserve.project.toLowerCase()
    return formattedReserve
  })
  // console.log(userReserves);
  const rawUserReserveData = userReserves?.[0]?.result?.[0]
  // console.log(rawUserReserveData);

  const formattedUserReserves = rawUserReserveData?.map((rawUserReserve) => {
    const reserve = formattedReservesData.find((resp) => resp.project === rawUserReserve.project.toLowerCase())
    // console.log(reserve);
    const formattedUserReserve = formatObjectWithBNFields(rawUserReserve)
    formattedUserReserve.id = (currentAccount + reserve?.id).toLowerCase()

    formattedUserReserve.reserve = {
      id: reserve?.id,
      underlyingAsset: reserve.underlyingAsset,
      name: reserve.name,
      symbol: reserve.symbol,
      decimals: reserve.decimals,
      liquidityRate: BigNumber.from(reserve.liquidityRate),
      stableBorrowRate: BigNumber.from(reserve.stableBorrowRate),
      reserveLiquidationBonus: reserve.reserveLiquidationBonus,
      lastUpdateTimestamp: reserve.lastUpdateTimestamp,
      aTokenAddress: reserve.aTokenAddress,
      pTokenAddress: reserve.pTokenAddress,
      stableDebtTokenAddress: reserve.stableDebtTokenAddress,
      withdrawalsEnabled: reserve.withdrawalsEnabled,
      interestWithdrawalsEnabled: reserve.interestWithdrawalsEnabled,
      depositsEnabled: reserve.depositsEnabled,
      borrowingEnabled: reserve.borrowingEnabled,
      projectLiquidityRate: reserve.projectLiquidityRate,
      projectBorrowRate: reserve.projectBorrowRate,
    }
    return formattedUserReserve
  })
  // console.log(formattedUserReserves);
  const poolData = {
    reserves: formattedReservesData,
    userReserves: currentAccount !== ethers.constants.AddressZero ? formattedUserReserves : [],
  }

  // console.log(poolData);
  if (!loading) {
    const reserves = poolData?.reserves?.map((reserve) => ({
      ...reserve,
      symbol: unPrefixSymbol(reserve?.symbol, 'A'),
    }))
    // console.log(reserves);

    const userReservesData = poolData?.userReserves?.map((userReserve) => ({
      ...userReserve,
      reserve: {
        ...userReserve.reserve,
        symbol: unPrefixSymbol(userReserve?.reserve?.symbol, 'A'),
      },
    }))
    // console.log(userReservesData);
    const isUserHasDeposits = userReservesData?.some((userReserve) => userReserve.scaledATokenBalance !== '0')
    // console.log(isUserHasDeposits);
    const reservesWithFixedUnderlying = reserves?.map((reserve) => {
      return reserve
    })
    // console.log(reservesWithFixedUnderlying);
    const userReservesWithFixedUnderlying = userReservesData?.map((userReserve) => {
      return userReserve
    })
    // console.log(userReservesWithFixedUnderlying);
    const poolDataContext = {
      loading,
      isUserHasDeposits,
      reserves: reservesWithFixedUnderlying,
      user: userReservesWithFixedUnderlying,
    }

    return poolDataContext
  }

  return {
    loading,
    isUserHasDeposits: false,
    reserves: undefined,
    user: undefined,
  }
}
