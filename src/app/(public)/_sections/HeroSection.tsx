import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma'

export async function HeroSection() {
  const cards = await prisma.cardCompany.findMany({
    where: {
      isActive: true
    },
    select: {
      name: true,
      slug: true
    }
  })

  return (
    <section className="overflow-hidden py-16 md:py-20 lg:py-24">
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

          <div className="relative mx-auto w-full">
            <div className="bg-card relative overflow-hidden rounded-2xl border p-3 shadow-sm sm:p-4">
              <Image
                src="/images/hero-section-crypto.webp"
                alt="Crypto cards comparison dashboard"
                width={800}
                height={700}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
