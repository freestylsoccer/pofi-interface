import { Chef, PairType } from '../../features/farm/enum'
import { useActiveWeb3React, useFuse } from '../../hooks'

import Container from '../../components/Container'
import Web3Connect from '../../components/Web3Connect'
import FarmList from '../../features/farm/FarmList'
import Head from 'next/head'
import Menu from '../../features/farm/FarmMenu'
import React from 'react'
import Search from '../../components/Search'
import { classNames } from '../../functions'
import useFarmRewards from '../../hooks/useFarmRewards'
import { useProtocolDataWithRpc } from '../../features/farm/hooks'
import { useRouter } from 'next/router'
import Provider from '../../features/lending/context'
import DashboardList from '../../features/farm/DashboardList'
import Button from '../../components/Button'

export default function Dashboard(): JSX.Element {
  const { account, chainId } = useActiveWeb3React()

  const router = useRouter()
  const type = router.query.filter == null ? 'all' : (router.query.filter as string)
  const depositsType = router.query.filter == null ? 'deposits' : (router.query.filter as string)
  const borrowsType = router.query.filter == null ? 'borrows' : (router.query.filter as string)

  const { loading, isUserHasDeposits, reserves: reservesData, user: userReserves } = useProtocolDataWithRpc()
  // console.log(userReserves);
  // console.log(reservesData);
  // console.log(isUserHasDeposits);

  const FILTER2 = {
    all: (project) => project.project !== '0',
    deposits: (project) => project?.scaledPTokenBalance !== '0' || project.pTokenBalance !== '0',
    borrows: (project) => project?.principalStableDebt !== '0',
  }

  const deposits = userReserves?.filter((project) => {
    return depositsType in FILTER2 ? FILTER2[depositsType](project) : true
  })
  const borrows = userReserves?.filter((project) => {
    return borrowsType in FILTER2 ? FILTER2[borrowsType](project) : true
  })
  // console.log(deposits)
  // console.log(borrows)

  const FILTER = {
    all: (farm) => farm.symbol !== '0',
    portfolio: (farm) => farm?.amount && !farm.amount.isZero(),
    sushi: (farm) => farm.pair.type === PairType.SWAP && farm.allocPoint !== '0',
    kashi: (farm) => farm.pair.type === PairType.KASHI && farm.allocPoint !== '0',
    '2x': (farm) =>
      (farm.chef === Chef.MASTERCHEF_V2 || farm.chef === Chef.MINICHEF) &&
      farm.rewards.length > 1 &&
      farm.allocPoint !== '0',
  }

  const data = useFarmRewards().filter((farm) => {
    return type in FILTER ? FILTER[type](farm) : true
  })
  // console.log(data);

  const options = {
    keys: ['pair.id', 'pair.token0.symbol', 'pair.token1.symbol'],
    threshold: 0.4,
  }

  const { result, term, search } = useFuse({
    data,
    options,
  })
  // console.log(result);
  // console.log(term);
  /* DATA
  allocPoint: "7"
  balance: 0.3303215535650148
  chef: 1
  feeApyPerDay: 0.000055943592279040905
  feeApyPerHour: 2.0629199652896333e-7
  feeApyPerMonth: 0.001678307768371227
  feeApyPerYear: 0.020139693220454724
  id: "9"
  masterChef: {id: '0xef0881ec094552b2e128cf945ef17a6752b4ec5d', totalAllocPoint: undefined}
  owner: {id: '0xef0881ec094552b2e128cf945ef17a6752b4ec5d', totalAllocPoint: undefined}
  pair: {id: '0x17890deb188f2de6c3e966e053da1c9a111ed4a5', reserve0: '510550.827724', reserve1: '1316730.154456061635426613', reserveETH: '393.2829149522858683891596677348078', reserveUSD: '1021692.646140015849981063068344492', …}
  rewardAprPerDay: NaN
  rewardAprPerHour: NaN
  rewardAprPerMonth: NaN
  rewardAprPerYear: NaN
  rewardToken: {decimals: '18', derivedETH: '0.0001493407413893206484893360964768904', id: '0xd417144312dbf50465b1c641d016962017ef6240', liquidity: '1317673.00084706318396987', name: 'Covalent Query Token', …}
  rewarder: {id: '0x4dba3b002319067f03bf2c99218b9af149c2ddb6', rewardPerSecond: '10000000000000000', rewardToken: '0xd417144312dbf50465b1c641d016962017ef6240'}
  rewards: (2) [{…}, {…}]
  roiPerBlock: NaN
  roiPerDay: NaN
  roiPerHour: NaN
  roiPerMonth: NaN
  roiPerYear: NaN
  slpBalance: "330321553565014767"
  tvl: 453263.46670509013
  */

  /* result
  allocPoint: "7"
  balance: 0.3303215535650148
  chef: 1
  feeApyPerDay: 0
  feeApyPerHour: 0
  feeApyPerMonth: 0
  feeApyPerYear: 0
  id: "9"
  masterChef: {id: '0xef0881ec094552b2e128cf945ef17a6752b4ec5d', totalAllocPoint: undefined}
  owner: {id: '0xef0881ec094552b2e128cf945ef17a6752b4ec5d', totalAllocPoint: undefined}
  pair: {id: '0x17890deb188f2de6c3e966e053da1c9a111ed4a5', reserve0: '510550.827724', reserve1: '1316730.154456061635426613', reserveETH: '393.2829149522858683891596677348078', reserveUSD: '1021692.646140015849981063068344492', …}
  rewardAprPerDay: NaN
  rewardAprPerHour: NaN
  rewardAprPerMonth: NaN
  rewardAprPerYear: NaN
  rewardToken: {decimals: '18', derivedETH: '0.0001493407413893206484893360964768904', id: '0xd417144312dbf50465b1c641d016962017ef6240', liquidity: '1317673.00084706318396987', name: 'Covalent Query Token', …}
  rewarder: {id: '0x4dba3b002319067f03bf2c99218b9af149c2ddb6', rewardPerSecond: '10000000000000000', rewardToken: '0xd417144312dbf50465b1c641d016962017ef6240'}
  rewards: (2) [{…}, {…}]
  roiPerBlock: NaN
  roiPerDay: NaN
  roiPerHour: NaN
  roiPerMonth: NaN
  roiPerYear: NaN
  slpBalance: "330321553565014767"
  tvl: 453263.46670509013
  */
  return (
    <Container id="farm-page" className="grid h-full grid-cols-4 py-20 mx-auto md:py-24 lg:py-24 gap-9" maxWidth="7xl">
      <Head>
        <title>Dashboard | Sushi</title>
        <meta key="description" name="description" content="Farm SUSHI" />
      </Head>
      <>
        {!account && (
          <div className={classNames(`space-y-6 col-span-4 lg:col-span-4`)}>
            {/* <div className="flex items-center text-lg font-bold text-high-emphesis whitespace-nowrap">
                Ready to Stake{' '}
                <div className="w-full h-0 ml-4 font-bold bg-transparent border border-b-0 border-transparent rounded text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20"></div>
              </div>
              <FarmList farms={filtered} term={term} /> */}
            <div className="flex items-center justify-center text-lg font-bold text-high-emphesis whitespace-nowrap">
              Please connect your wallet{' '}
            </div>
            <div className="flex items-center justify-center text-md text-high-emphesis whitespace-nowrap">
              To see your deposited / borrowed assets, you need to connect your wallet.{' '}
            </div>
            <div className="flex justify-center">
              <Web3Connect size="lg" color="gradient" className="w-1/6" />
            </div>
          </div>
        )}
        {account && deposits?.length === 0 && borrows?.length === 0 && (
          <div className={classNames(`space-y-6 col-span-4 lg:col-span-4`)}>
            {/* <div className="flex items-center text-lg font-bold text-high-emphesis whitespace-nowrap">
                Ready to Stake{' '}
                <div className="w-full h-0 ml-4 font-bold bg-transparent border border-b-0 border-transparent rounded text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20"></div>
              </div>
              <FarmList farms={filtered} term={term} /> */}
            <div className="flex items-center justify-center text-lg font-bold text-high-emphesis whitespace-nowrap">
              No deposits found for your address{' '}
            </div>
            <div className="flex items-center justify-center text-md text-high-emphesis whitespace-nowrap">
              We could not detect a deposit from your address. Make sure you’re in the correct network or make a first
              time deposit{' '}
            </div>
            <div className="flex items-center justify-center text-md text-high-emphesis whitespace-nowrap">
              Or deposit your assets now{' '}
            </div>
            <div className="flex justify-center">
              <Button
                size="sm"
                color="gallery"
                onClick={() => {
                  router.push(`/invest`)
                }}
              >
                View open opportunities
              </Button>
            </div>
          </div>
        )}
        {account && deposits?.length > 0 && (
          <div
            className={classNames(`space-y-6 col-span-4 ${borrows?.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3'}`)}
          >
            {/* <div className="flex items-center text-lg font-bold text-high-emphesis whitespace-nowrap">
                Ready to Stake{' '}
                <div className="w-full h-0 ml-4 font-bold bg-transparent border border-b-0 border-transparent rounded text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20"></div>
              </div>
              <FarmList farms={filtered} term={term} /> */}
            <div className="flex items-center text-lg font-bold text-high-emphesis whitespace-nowrap">
              Your deposits{' '}
              <div className="w-full h-0 ml-4 font-bold bg-transparent border border-b-0 border-transparent rounded text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20"></div>
            </div>
            {/*<FarmList farms={result} term={term} />*/}
            <DashboardList projects={deposits} term={term} />
          </div>
        )}
        {account && borrows?.length > 0 && (
          <div
            className={classNames(`space-y-6 col-span-4 ${deposits?.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3'}}`)}
          >
            {/* <div className="flex items-center text-lg font-bold text-high-emphesis whitespace-nowrap">
                Ready to Stake{' '}
                <div className="w-full h-0 ml-4 font-bold bg-transparent border border-b-0 border-transparent rounded text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20"></div>
              </div>
              <FarmList farms={filtered} term={term} /> */}
            <div className="flex items-center text-lg font-bold text-high-emphesis whitespace-nowrap">
              Your borrows{' '}
              <div className="w-full h-0 ml-4 font-bold bg-transparent border border-b-0 border-transparent rounded text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20"></div>
            </div>
            <DashboardList projects={deposits} term={term} />
          </div>
        )}
      </>
    </Container>
  )
}

Dashboard.Provider = Provider
