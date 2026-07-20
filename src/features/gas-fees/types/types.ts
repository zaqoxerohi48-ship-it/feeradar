import { z } from 'zod'

const feeLevelSchema = z.object({
  suggestedMaxPriorityFeePerGas: z.string(),
  suggestedMaxFeePerGas: z.string(),
  minWaitTimeEstimate: z.number(),
  maxWaitTimeEstimate: z.number()
})

const feeTrendSchema = z
  .string()
  .trim()
  .transform((value) => value.toLowerCase() || 'stable')
  .catch('stable')

export const gasFeesSchema = z.object({
  low: feeLevelSchema,
  medium: feeLevelSchema,
  high: feeLevelSchema,
  estimatedBaseFee: z.string(),
  networkCongestion: z.number(),
  latestPriorityFeeRange: z.tuple([z.string(), z.string()]),
  historicalPriorityFeeRange: z.tuple([z.string(), z.string()]),
  historicalBaseFeeRange: z.tuple([z.string(), z.string()]),
  priorityFeeTrend: feeTrendSchema,
  baseFeeTrend: feeTrendSchema,
  version: z.string().optional()
})

export type GasFees = z.infer<typeof gasFeesSchema>
export type FeeLevel = z.infer<typeof feeLevelSchema>
