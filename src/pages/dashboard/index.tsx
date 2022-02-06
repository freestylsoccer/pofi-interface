import { useActiveWeb3React } from '../../hooks'

import Container from '../../components/Container'
import Web3Connect from '../../components/Web3Connect'
import Head from 'next/head'
import React from 'react'
import { classNames } from '../../functions'
import { useProtocolDataWithRpc } from '../../features/farm/hooks'
import { useRouter } from 'next/router'
import Provider from '../../features/lending/context'
import DashboardList from '../../features/farm/DashboardList'
import Button from '../../components/Button'

export default function Dashboard(): JSX.Element {
  const { account } = useActiveWeb3React()

  const router = useRouter()
  const depositsType = router.query.filter == null ? 'deposits' : (router.query.filter as string)
  const borrowsType = router.query.filter == null ? 'borrows' : (router.query.filter as string)

  const { user: userReserves } = useProtocolDataWithRpc()
  // console.log(userReserves);
  // console.log(reservesData);
  // console.log(isUserHasDeposits);

  const FILTER = {
    all: (project) => project.project !== '0',
    deposits: (project) => project?.scaledPTokenBalance !== '0' || project.pTokenBalance !== '0',
    borrows: (project) => project?.principalStableDebt !== '0',
  }

  const deposits = userReserves?.filter((project) => {
    return depositsType in FILTER ? FILTER[depositsType](project) : true
  })
  const borrows = userReserves?.filter((project) => {
    return borrowsType in FILTER ? FILTER[borrowsType](project) : true
  })
  // console.log(deposits)
  // console.log(borrows)

  const term = ''

  return (
    <Container
      id="farm-page"
      className="grid h-full p-3 grid-cols-6 py-20 mx-auto md:py-24 lg:py-24 gap-9"
      maxWidth="7xl"
    >
      <Head>
        <title>Dashboard | Pofi</title>
        <meta key="description" name="description" content="Dashboard" />
      </Head>
      <>
        {!account && (
          <div className={classNames(`space-y-6 col-span-6`)}>
            {/* <div className="flex items-center text-lg font-bold text-high-emphesis whitespace-nowrap">
                Ready to Stake{' '}
                <div className="w-full h-0 ml-4 font-bold bg-transparent border border-b-0 border-transparent rounded text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20"></div>
              </div>
              <FarmList farms={filtered} term={term} /> */}
            <div className="flex items-center justify-center text-lg font-bold text-high-emphesis whitespace-nowrap">
              Please connect your wallet{' '}
            </div>
            <div className="flex items-center justify-center text-md text-high-emphesis text-center">
              To see your deposited / borrowed assets, you need to connect your wallet.{' '}
            </div>
            <div className="flex justify-center">
              <Web3Connect size="lg" color="gradient" className="md:w-1/6" />
            </div>
          </div>
        )}
        {account && deposits?.length === 0 && borrows?.length === 0 && (
          <div className={classNames(`space-y-6 col-span-4 lg:col-span-6 min-w-[768px]`)}>
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
          <div className={classNames(`space-y-6 col-span-6 min-w-[768px]`)}>
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
            <DashboardList projects={deposits} term={term} type="deposit" />
          </div>
        )}
        {account && borrows?.length > 0 && (
          <div className={classNames(`space-y-6 col-span-6 min-w-[768px]`)}>
            {/* <div className="flex items-center text-lg font-bold text-high-emphesis whitespace-nowrap">
                Ready to Stake{' '}
                <div className="w-full h-0 ml-4 font-bold bg-transparent border border-b-0 border-transparent rounded text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20"></div>
              </div>
              <FarmList farms={filtered} term={term} /> */}
            <div className="flex items-center text-lg font-bold text-high-emphesis whitespace-nowrap">
              Your borrows{' '}
              <div className="w-full h-0 ml-4 font-bold bg-transparent border border-b-0 border-transparent rounded text-high-emphesis md:border-gradient-r-blue-pink-dark-800 opacity-20"></div>
            </div>
            <DashboardList projects={borrows} term={term} type="borrow" />
          </div>
        )}
      </>
    </Container>
  )
}

Dashboard.Provider = Provider
