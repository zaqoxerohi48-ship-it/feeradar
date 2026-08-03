import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import prisma from '@/lib/prisma'
import { CompareCard } from './ui/CompareCard'

export const metadata: Metadata = buildMetadata({
  title: 'Compare Crypto Cards',
  description: 'Compare crypto cards by supported countries, card formats, card networks, mobile payments and KYC requirements.',
  path: '/compare'
})

export const revalidate = 3600

export default async function ComparePage() {
  const cards = await prisma.cardCompany.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      name: 'asc'
    },
    include: {
      _count: {
        select: {
          countries: true
        }
      }
    }
  })

  return (
    <div className="container flex flex-col gap-8 py-10">
      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
            Crypto cards
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
            {cards.length} active cards
          </span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">Compare crypto cards</h1>

        <p className="max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
          Browse active crypto card providers and open a detailed comparison page for supported countries, payment options and card
          availability.
        </p>
      </section>

      {cards.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <CompareCard key={card.id} card={card} />
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-white/10 bg-white/4 p-6">
          <p className="text-sm text-white/60">No active crypto cards are available yet.</p>
        </section>
      )}
    </div>
  )
}
