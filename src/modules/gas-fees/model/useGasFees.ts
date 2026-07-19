import { useQuery } from '@tanstack/react-query'
import { getGasFees } from '../api/gas-fees.api'
import { GAS_FEES_QUERY_KEY } from '../constants/gas-fees.constants'

export const useGasFees = () => {
  const {
    data: fees,
    isPending: isFeesLoading,
    isFetching: isFeesRefreshing,
    isError: isFeesError
  } = useQuery({
    queryKey: [GAS_FEES_QUERY_KEY],
    queryFn: getGasFees,
    staleTime: 30_000,
    refetchInterval: 30_000
  })

  return {
    fees,
    isFeesLoading,
    isFeesRefreshing,
    isFeesError
  }
}
