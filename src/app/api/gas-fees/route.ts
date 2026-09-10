import { cacheLife, cacheTag } from 'next/cache'
import { connection } from 'next/server'
import { gasFeesSchema } from '@/features/gas-fees/types/types'
import { CACHE_TAGS } from '@/lib/cache-tags'

class GasFeesProviderError extends Error {
  constructor(
    message: string,
    readonly kind: 'response' | 'shape'
  ) {
    super(message)
  }
}

async function getGasFeesFromProvider(feesUrl: string) {
  'use cache'
  cacheLife({
    stale: 30,
    revalidate: 30,
    expire: 90
  })
  cacheTag(CACHE_TAGS.gasFees)

  const response = await fetch(feesUrl)

  if (!response.ok) {
    throw new GasFeesProviderError(`Fee provider responded with ${response.status}`, 'response')
  }

  const raw: unknown = await response.json()
  const parsed = gasFeesSchema.safeParse(raw)

  if (!parsed.success) {
    throw new GasFeesProviderError(`Unexpected fee provider response shape: ${parsed.error.message}`, 'shape')
  }

  return parsed.data
}

export async function GET() {
  await connection()

  const feesUrl = process.env.INFURA_ETH_FEES_URL

  if (!feesUrl) {
    console.error('Fee provider is not set')
    return Response.json({ error: { message: 'Server configuration error' } }, { status: 500 })
  }

  try {
    const fees = await getGasFeesFromProvider(feesUrl)

    return Response.json(fees)
  } catch (error) {
    if (error instanceof GasFeesProviderError) {
      console.error(error.message)

      return Response.json(
        { error: { message: error.kind === 'response' ? 'Fee provider request failed' : 'Invalid data from provider' } },
        { status: 502 }
      )
    }

    console.error('Fees request failed', error)
    return Response.json({ error: { message: 'Fee provider is unavailable' } }, { status: 502 })
  }
}
