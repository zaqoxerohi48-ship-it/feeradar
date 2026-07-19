import { GasFees } from '../types/types'

export const getGasFees = async (): Promise<GasFees> => {
  const response = await fetch('/api/gas-fees')

  if (!response.ok) {
    throw new Error('Failed to fetch gas fees')
  }

  return response.json()
}
