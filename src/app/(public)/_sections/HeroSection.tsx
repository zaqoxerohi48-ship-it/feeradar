import Image from 'next/image'
import Link from 'next/link'

const cryptoCards = ['Bybit', 'Kolo', 'RedotPay', 'YPT']

export const HeroSection = () => {
  return (
    <section className="overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start">
            <div className="bg-muted/50 text-muted-foreground mb-6 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium">
              Compare crypto card fees in one place
            </div>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Find the best crypto card for your money</h1>

            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-8">
              Compare fees, limits and conditions of popular crypto cards. Choose the best option before spending your crypto.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/comparison"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded-md px-6 text-sm font-medium transition-colors"
              >
                Compare cards
              </Link>

              <Link
                href="#how-it-works"
                className="bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-11 items-center justify-center rounded-md border px-6 text-sm font-medium transition-colors"
              >
                How it works
              </Link>
            </div>

            <div className="mt-8">
              <p className="text-muted-foreground mb-3 text-sm">Available comparisons</p>

              <div className="flex flex-wrap gap-2">
                {cryptoCards.map((card) => (
                  <span key={card} className="bg-background rounded-full border px-3 py-1.5 text-sm font-medium shadow-sm">
                    {card}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="bg-primary/10 absolute -inset-6 -z-10 rounded-full blur-3xl" />

            <div className="bg-muted/30 relative overflow-hidden rounded-3xl border p-4 shadow-2xl sm:p-6">
              <Image
                src="/images/hero-section-crypto.webp"
                alt="Crypto cards comparison dashboard"
                width={800}
                height={700}
                priority
                className="h-auto w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
