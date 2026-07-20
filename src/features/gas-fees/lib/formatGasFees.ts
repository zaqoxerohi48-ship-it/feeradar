import type { FeeLevel } from '../types/types'

export const formatGwei = (value: string) => {
  const number = Number(value)

  if (!Number.isFinite(number)) return '-'
  return number < 0.01 ? number.toFixed(4) : number.toFixed(2)
}

export const formatWaitTime = (feeLevel: FeeLevel) => {
  const minSeconds = Math.ceil(feeLevel.minWaitTimeEstimate / 1000)
  const maxSeconds = Math.ceil(feeLevel.maxWaitTimeEstimate / 1000)

  return `${minSeconds}-${maxSeconds} sec`
}
