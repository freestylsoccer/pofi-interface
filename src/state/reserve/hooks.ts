import { useSingleContractMultipleData } from '../multicall/hooks'
import { useMemo } from 'react'
import { useDataProviderContract } from '../../hooks/useContract'

/**
 *
 * @param project
 * @param address
 * @returns
 */
export function useReserveData(project?: string): [{ [reserveData: string]: Object | undefined }, boolean] {
  const dataProviderContract = useDataProviderContract()

  const reserveData = useSingleContractMultipleData(
    dataProviderContract,
    'getReserveData',
    [[project]],
    undefined,
    100_000
  )

  const anyLoading: boolean = useMemo(() => reserveData.some((callState) => callState.loading), [reserveData])
  return [{ reserveData }, anyLoading]
}
