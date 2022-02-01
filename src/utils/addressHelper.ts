import { ChainId } from '@sushiswap/sdk'
import addresses from '../constants/contracts'

export interface Address {
  97: string
  1: string
  3: string
  4: string
  5: string
  42: string
  137: string
  80001: string
  250: string
  4002: string
  100: string
  56: string
  42161: string
  79377087078960: string
  1287: string
  43114: string
  43113: string
  128: string
  256: string
  1666600000: string
  1666700000: string
  66: string
  65: string
  42220: string
  11297108109: string
  11297108099: string
  1285: string
  122: string
  40: string
}
export const getAddress = (address: Address): string => {
  const chainId = 80001
  return address[chainId] ? address[chainId] : address[ChainId.MATIC_TESTNET]
}

export const getUsdtAddress = () => {
  return getAddress(addresses.usdt)
}
