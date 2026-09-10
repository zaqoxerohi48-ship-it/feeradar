import Link from 'next/link'
import { getActiveCardCompanyLinks } from '@/features/card-companies/data/card-companies'
import { HeroGlobe } from './ui/HeroGlobe'

export async function HeroSection() {
  const cards = await getActiveCardCompanyLinks()

  return (
    <section className="overflow-hidden pt-10">
      <div className="container">
        <div className="grid items-center gap-12 xl:grid-cols-2 xl:gap-16">
          <div className="flex flex-col items-start gap-6">
            <div className="bg-card text-muted-foreground inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium shadow-xs">
              Compare crypto card fees in one place
            </div>

            <h1 className="text-foreground max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Find the best crypto card for your money
            </h1>

            <p className="text-muted-foreground max-w-xl text-lg leading-8">
              Compare fees, limits and conditions of popular crypto cards. Choose the best option before spending your crypto.
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/compare"
                className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-medium shadow-xs transition-colors focus-visible:ring-3 focus-visible:outline-none"
              >
                Compare cards
              </Link>

              <Link
                href="/how-it-works"
                className="bg-card text-foreground hover:bg-muted focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-lg border px-5 text-sm font-medium shadow-xs transition-colors focus-visible:ring-3 focus-visible:outline-none"
              >
                How it works
              </Link>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">Available comparisons</p>

              <div className="flex flex-wrap gap-2">
                {cards.map((card) => (
                  <Link
                    key={card.slug}
                    href={`/compare/${card.slug}`}
                    className="bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground focus-visible:ring-ring rounded-full border px-3 py-1.5 text-sm font-medium shadow-xs transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {card.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <HeroGlobe />
        </div>
      </div>
    </section>
  )
}
