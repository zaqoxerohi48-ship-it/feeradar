import { Metadata } from 'next'
import { Suspense } from 'react'
import { buildMetadata } from '@/lib/metadata'
import { GasFeesSection } from './_sections/GasFeesSection'
import { HeroSection } from './_sections/HeroSection'
import { HowItWorksTeaser } from './_sections/HowItWorksTeaser'
import { WhyCompareSection } from './_sections/WhyCompareSection'
import { HeroSectionSkeleton } from './_sections/ui/HeroSectionSkeleton'

export const metadata: Metadata = buildMetadata({
  title: 'Crypto Fee Tracker & Card Fee Comparison',
  description: 'Track blockchain transaction fees and compare crypto card fee rates with FeeRadar.',
  path: '/'
})

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10 md:gap-20">
      <Suspense fallback={<HeroSectionSkeleton />}>
        <HeroSection />
      </Suspense>
      <GasFeesSection />
      <HowItWorksTeaser />
      <WhyCompareSection />
    </div>
  )
}
