'use client'

import { useGasFees } from '../model/useGasFees'
import { GasFeesContent } from './GasFeesContent'
import { GasFeesStateCard } from './GasFeesStateCard'

export const GasFeesCard = () => {
  const { fees, isFeesLoading, isFeesRefreshing, isFeesError } = useGasFees()

  if (isFeesLoading) {
    return <GasFeesStateCard />
  }

  if (isFeesError || !fees) {
    return <GasFeesStateCard message="Unable to load Ethereum gas fees." />
  }

  return <GasFeesContent fees={fees} isRefreshing={isFeesRefreshing} />
}
