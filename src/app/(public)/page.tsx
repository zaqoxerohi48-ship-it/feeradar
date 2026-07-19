import { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { GasFeesSection } from './_sections/GasFeesSection'
import { HeroSection } from './_sections/HeroSection'

export const metadata: Metadata = buildMetadata({
  title: 'Crypto Fee Tracker & Card Fee Comparison',
  description: 'Track blockchain transaction fees and compare crypto card fee rates with FeeRadar.',
  path: '/'
})

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GasFeesSection />
    </>
  )
}
