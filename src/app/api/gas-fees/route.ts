import { gasFeesSchema } from '@/features/gas-fees/types/types'

export async function GET() {
  const feesUrl = process.env.INFURA_ETH_FEES_URL

  if (!feesUrl) {
    console.error('Fee provider is not set')
    return Response.json({ error: { message: 'Server configuration error' } }, { status: 500 })
  }

  try {
    const response = await fetch(feesUrl)

    if (!response.ok) {
      console.error(`Fee provider responded with ${response.status}`)
      return Response.json({ error: { message: 'Fee provider request failed' } }, { status: 502 })
    }

    const raw = await response.json()
    const parsed = gasFeesSchema.safeParse(raw)

    if (!parsed.success) {
      console.error('Unexpected fee provider response shape', parsed.error)
      return Response.json({ error: { message: `Invalid data from provider ${raw}` } }, { status: 502 })
    }

    return Response.json(parsed.data)
  } catch (error) {
    console.error('Fees request failed', error)
    return Response.json({ error: { message: 'Fee provider is unavailable' } }, { status: 502 })
  }
}
