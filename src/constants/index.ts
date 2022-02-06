import { ChainId, JSBI, Percent } from '@sushiswap/sdk'
import { binance, fortmatic, injected, portis, torus, walletconnect, walletlink } from '../connectors'

import { AbstractConnector } from '@web3-react/abstract-connector'
import { BigNumber } from 'ethers'

export const RPC = {
  [ChainId.MAINNET]: 'https://eth-mainnet.alchemyapi.io/v2/q1gSNoSMEzJms47Qn93f9-9Xg5clkmEC',
  [ChainId.ROPSTEN]: 'https://eth-ropsten.alchemyapi.io/v2/cidKix2Xr-snU3f6f6Zjq_rYdalKKHmW',
  [ChainId.RINKEBY]: 'https://eth-rinkeby.alchemyapi.io/v2/XVLwDlhGP6ApBXFz_lfv0aZ6VmurWhYD',
  [ChainId.GÖRLI]: 'https://eth-goerli.alchemyapi.io/v2/Dkk5d02QjttYEoGmhZnJG37rKt8Yl3Im',
  [ChainId.KOVAN]: 'https://eth-kovan.alchemyapi.io/v2/6OVAa_B_rypWWl9HqtiYK26IRxXiYqER',
  [ChainId.FANTOM]: 'https://rpcapi.fantom.network',
  [ChainId.FANTOM_TESTNET]: 'https://rpc.testnet.fantom.network',
  [ChainId.MATIC]: 'https://rpc-mainnet.maticvigil.com',
  [ChainId.MATIC_TESTNET]: 'https://rpc-mumbai.matic.today',
  [ChainId.XDAI]: 'https://rpc.xdaichain.com',
  [ChainId.BSC]: 'https://bsc-dataseed.binance.org/',
  [ChainId.BSC_TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  [ChainId.MOONBEAM_TESTNET]: 'https://rpc.testnet.moonbeam.network',
  [ChainId.AVALANCHE]: 'https://api.avax.network/ext/bc/C/rpc',
  [ChainId.AVALANCHE_TESTNET]: 'https://api.avax-test.network/ext/bc/C/rpc',
  [ChainId.HECO]: 'https://http-mainnet.hecochain.com',
  [ChainId.HECO_TESTNET]: 'https://http-testnet.hecochain.com',
  [ChainId.HARMONY]: 'https://api.harmony.one',
  [ChainId.HARMONY_TESTNET]: 'https://api.s0.b.hmny.io',
  [ChainId.OKEX]: 'https://exchainrpc.okex.org',
  [ChainId.OKEX_TESTNET]: 'https://exchaintestrpc.okex.org',
  [ChainId.ARBITRUM]: 'https://arb1.arbitrum.io/rpc',
  [ChainId.PALM]: 'https://palm-mainnet.infura.io/v3/da5fbfafcca14b109e2665290681e267',
  [ChainId.FUSE]: 'https://rpc.fuse.io',
  [ChainId.CELO]: 'https://forno.celo.org',
  [ChainId.MOONRIVER]: 'https://rpc.moonriver.moonbeam.network',
  [ChainId.TELOS]: 'https://mainnet.telos.net/evm',
}

export const POOL_DENY = ['14', '29', '45', '30']

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 13

export const ARCHER_RELAY_URI: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: 'https://api.archerdao.io/v1/transaction',
}

export const ARCHER_GAS_URI: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: 'https://api.archerdao.io/v1/gas',
}

// export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
//     // [UNI_ADDRESS]: 'UNI',
//     [TIMELOCK_ADDRESS]: 'Timelock',
// }

// TODO: update weekly with new constant
export const WEEKLY_MERKLE_ROOT =
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-13/merkle-10959148-11550728.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-14/merkle-10959148-11596364.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-15/merkle-10959148-11641996.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-16/merkle-10959148-11687577.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-17/merkle-10959148-11733182.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-18/merkle-10959148-11778625.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-19/merkle-10959148-11824101.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-20/merkle-10959148-11869658.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-21/merkle-10959148-11915191.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-22/merkle-10959148-11960663.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-23/merkle-10959148-12006121.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-24/merkle-10959148-12051484.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-24/protocol-claim.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-24/merkle-10959148-12051484-2.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-25/merkle-10959148-12096934.json'
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-26/merkle-10959148-12142433.json'
  'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-27/merkle-10959148-12171394.json'

export const PROTOCOL_MERKLE_ROOT =
  //'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/protocol/merkle-10959148-12171394.json'
  'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/protocol-02/merkle-10959148-12171394.json'

// /**
//  * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
//  * tokens.
//  */
// export const CUSTOM_BASES: {
//     [chainId in ChainId]?: { [tokenAddress: string]: Token[] }
// } = {
//     [ChainId.MAINNET]: {
//         [AMPL.address]: [DAI, WETH[ChainId.MAINNET]],
//         [DUCK.address]: [USDP, WETH[ChainId.MAINNET]],
//         [BAB.address]: [BAC, WETH[ChainId.MAINNET]],
//         [HBTC.address]: [CREAM, WETH[ChainId.MAINNET]],
//         [FRAX.address]: [FXS, WETH[ChainId.MAINNET]],
//         [IBETH.address]: [ALPHA, WETH[ChainId.MAINNET]],
//         [PONT.address]: [PWING, WETH[ChainId.MAINNET]],
//         [UMA_CALL.address]: [UMA, WETH[ChainId.MAINNET]],
//         [PLAY.address]: [DOUGH, WETH[ChainId.MAINNET]],
//         [XSUSHI_CALL.address]: [XSUSHI, WETH[ChainId.MAINNET]],
//     },
// }

export interface WalletInfo {
  connector?: (() => Promise<AbstractConnector>) | AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'injected.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'wallet-connect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
  },
  KEYSTONE: {
    connector: async () => {
      const KeystoneConnector = (await import('@keystonehq/keystone-connector')).KeystoneConnector
      return new KeystoneConnector({
        chainId: 1,
        url: RPC[ChainId.MAINNET],
      })
    },
    name: 'Keystone',
    iconName: 'keystone.png',
    description: 'Connect to Keystone hardware wallet.',
    href: null,
    color: '#4196FC',
    mobile: true,
  },
  LATTICE: {
    connector: async () => {
      const LatticeConnector = (await import('@web3-react/lattice-connector')).LatticeConnector
      return new LatticeConnector({
        chainId: 1,
        url: RPC[ChainId.MAINNET],
        appName: 'SushiSwap',
      })
    },
    name: 'Lattice',
    iconName: 'lattice.png',
    description: 'Connect to GridPlus Wallet.',
    href: null,
    color: '#40a9ff',
    mobile: true,
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbase.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5',
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbase.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true,
  },
  FORTMATIC: {
    connector: fortmatic,
    name: 'Fortmatic',
    iconName: 'fortmatic.png',
    description: 'Login using Fortmatic hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true,
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: 'portis.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true,
  },
  Torus: {
    connector: torus,
    name: 'Torus',
    iconName: 'torus.png',
    description: 'Login using Torus hosted wallet',
    href: null,
    color: '#315CF5',
    mobile: true,
  },
  Binance: {
    connector: binance,
    name: 'Binance',
    iconName: 'bsc.jpg',
    description: 'Login using Binance hosted wallet',
    href: null,
    color: '#F0B90B',
    mobile: true,
  },
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 30 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 30

// default archer gas estimate, 250k wei
export const DEFAULT_ARCHER_GAS_ESTIMATE: BigNumber = BigNumber.from(250000)
// default gas prices to use if all other sources unavailable
export const DEFAULT_ARCHER_GAS_PRICES: BigNumber[] = [
  BigNumber.from(60000000000),
  BigNumber.from(70000000000),
  BigNumber.from(100000000000),
  BigNumber.from(140000000000),
  BigNumber.from(300000000000),
  BigNumber.from(800000000000),
  BigNumber.from(2000000000000),
]
// default miner tip, equal to median gas price * default gas estimate
export const DEFAULT_ARCHER_ETH_TIP: JSBI = JSBI.BigInt(
  DEFAULT_ARCHER_GAS_ESTIMATE.mul(DEFAULT_ARCHER_GAS_PRICES[4]).toString()
)

// used for rewards deadlines
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH

export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = [
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
]

// BentoBox Swappers
export const BASE_SWAPPER: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: '0x0',
  [ChainId.ROPSTEN]: '0xe4E2540D421e56b0B786d40c5F5268891288c6fb',
}

// Boring Helper
// export const BORING_HELPER_ADDRESS = '0x11Ca5375AdAfd6205E41131A4409f182677996E6'

export const ANALYTICS_URL: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: 'https://analytics.sushi.com',
  [ChainId.MATIC]: 'https://analytics-polygon.sushi.com',
  [ChainId.FANTOM]: 'https://analytics-ftm.sushi.com',
  [ChainId.BSC]: 'https://analytics-bsc.sushi.com',
  [ChainId.XDAI]: 'https://analytics-xdai.sushi.com',
  [ChainId.HARMONY]: 'https://analytics-harmony.sushi.com',
  [ChainId.ARBITRUM]: 'https://analytics-arbitrum.sushi.com',
}

export const EIP_1559_ACTIVATION_BLOCK: { [chainId in ChainId]?: number } = {
  [ChainId.ROPSTEN]: 10499401,
  [ChainId.GÖRLI]: 5062605,
  [ChainId.RINKEBY]: 8897988,
}

export const LENDING_POOL_ADDRESSESS_PROVIDER: { [chainId in ChainId]?: string } = {
  [ChainId.MATIC_TESTNET]: '0x1255F085c6373007a4E0Dc6A910371a9Fc85c5Ab',
  [ChainId.BSC_TESTNET]: '0xDeB7Fc10dc0591849c4F636Bc7c135c3961f16Be',
}
export const LENDING_POOL_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MATIC_TESTNET]: '0x1DEA34e2556511b6A36783CbF716e10CFC709a35',
  [ChainId.BSC_TESTNET]: '0x3a7e85f8D7163967Bd9C9BbfE114fDD0bBe7da04',
}
export const PROTOCOL_DATA_PROVIDER_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MATIC_TESTNET]: '0x538e6Fc93d954176345c41E9B49a295632F8d9B7',
  [ChainId.BSC_TESTNET]: '0xCb3f06455562a931522e45f4A7a239c73be8deA0',
}
export const UI_POOL_DATA_PROVIDER: { [chainId in ChainId]?: string } = {
  [ChainId.MATIC_TESTNET]: '0xb9Fb44436D9f44e04062Eb5e5798238c27b58B19',
  [ChainId.BSC_TESTNET]: '0x2eAEdEE87564286D32a3bBB450EAE5Cc47190036',
}

export const PROJECT_DAI: { [chainId in ChainId]?: string } = {
  [ChainId.MATIC_TESTNET]: '0x58397AbCe419984AC70ae1B24869C84a05111e21',
  [ChainId.BSC_TESTNET]: '0xd0144480064B0d0E22399BC1AF7b244Fd21f95a4',
}
export const PROJECT_TUSD: { [chainId in ChainId]?: string } = {
  [ChainId.MATIC_TESTNET]: '0xd0761F8315d52CCc7B5D524032060e7166c47a00',
  [ChainId.BSC_TESTNET]: '0xBb3A93Fdd5d6a2940fa76CE97870B62b4a7Eb841',
}
export const PROJECT_USDC: { [chainId in ChainId]?: string } = {
  [ChainId.MATIC_TESTNET]: '0x28B389456aa1f841261f0809d2c2b5106566E13f',
  [ChainId.BSC_TESTNET]: '0x743765Bb7D4c93705E58BD666c9161ac3EE992E1',
}
export const PROJECT_USDT: { [chainId in ChainId]?: string } = {
  [ChainId.MATIC_TESTNET]: '0x4633c6F79e27e1B75eA38632740506dD5f56e33C',
  [ChainId.BSC_TESTNET]: '0x2CEE890EAb75a672CDc443993DeAF329E0D24809',
}
export const PROJECT_SUSD: { [chainId in ChainId]?: string } = {
  [ChainId.MATIC_TESTNET]: '0xdfA2469CBFD7A0AFd74fae5b50c02255391B21EC',
  [ChainId.BSC_TESTNET]: '0x79FFbf404082F458432330aee16959C7FD05484c',
}
export const PROJECT_BUSD: { [chainId in ChainId]?: string } = {
  [ChainId.MATIC_TESTNET]: '0x761EaaE4CDF672da139aba3f9C32A987117C2142',
  [ChainId.BSC_TESTNET]: '0x75CC5922d9B577d23447a81F80767816115f5364',
}

export * from './routing'
export * from './tokens'
