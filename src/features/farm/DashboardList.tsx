import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'

import Dots from '../../components/Dots'
import DashboardListItem from './DashboardListItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import React from 'react'
import { t } from '@lingui/macro'
import { useInfiniteScroll } from './hooks'
import { useLingui } from '@lingui/react'
import useSortableData from '../../hooks/useSortableData'

const DashboardList = ({ projects, type, term }) => {
  const { items, requestSort, sortConfig } = useSortableData(projects, { key: 'pTokenBalance' })
  const [numDisplayed, setNumDisplayed] = useInfiniteScroll(items)
  const { i18n } = useLingui()
  return items ? (
    <>
      <div className="grid grid-cols-6 text-base font-bold text-primary">
        <div
          className="flex items-center col-span-2 px-4 cursor-pointer md:col-span-2"
          onClick={() => requestSort('symbol')}
        >
          <div className="hover:text-high-emphesis">{i18n._(t`Project`)}</div>
          {sortConfig &&
            sortConfig.key === 'symbol' &&
            ((sortConfig.direction === 'ascending' && <ChevronUpIcon width={12} height={12} />) ||
              (sortConfig.direction === 'descending' && <ChevronDownIcon width={12} height={12} />))}
        </div>
        <div
          className="flex items-center justify-center cursor-pointer hover:text-high-emphesis"
          onClick={() => requestSort('pTokenBalance')}
        >
          {i18n._(t`Current balance`)}
          {sortConfig &&
            sortConfig.key === 'pTokenBalance' &&
            ((sortConfig.direction === 'ascending' && <ChevronUpIcon width={12} height={12} />) ||
              (sortConfig.direction === 'descending' && <ChevronDownIcon width={12} height={12} />))}
        </div>
        <div
          className="flex items-center justify-end px-4 cursor-pointer hover:text-high-emphesis"
          onClick={() => requestSort('roiPerYear')}
        >
          {i18n._(t`APR`)}
          {sortConfig &&
            sortConfig.key === 'roiPerYear' &&
            ((sortConfig.direction === 'ascending' && <ChevronUpIcon width={12} height={12} />) ||
              (sortConfig.direction === 'descending' && <ChevronDownIcon width={12} height={12} />))}
        </div>
      </div>
      <InfiniteScroll
        dataLength={numDisplayed}
        next={() => setNumDisplayed(numDisplayed + 5)}
        hasMore={true}
        loader={null}
      >
        <div className="space-y-4">
          {items.slice(0, numDisplayed).map((project, index) => (
            <DashboardListItem key={index} project={project} type={type} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  ) : (
    <div className="w-full py-6 text-center">{term ? <span>No Results.</span> : <Dots>Loading</Dots>}</div>
  )
}

export default DashboardList
