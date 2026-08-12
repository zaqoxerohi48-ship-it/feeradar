import type { Metadata } from 'next'
import z from 'zod'
import { Suspense } from 'react'
import { buildMetadata } from '@/lib/metadata'
import prisma from '@/lib/prisma'
import { BreadCrumbs } from '@/shared/ui/BreadCrumbs'
import { CompareCard } from './ui/CompareCard'
import { CompareCardSkeleton } from './ui/CompareCardSkeleton'
import { SearchInput } from './ui/SearchInput'

export const metadata: Metadata = buildMetadata({
  title: 'Compare Crypto Cards',
  description: 'Compare crypto cards by supported countries, card formats, card networks, mobile payments and KYC requirements.',
  path: '/compare'
})

type Props = {
  searchParams: Promise<{ search?: string }>
}

const searchSchema = z.object({
  search: z.string().max(32).optional()
})

export default async function ComparePage({ searchParams }: Props) {
  const { search } = await searchParams

  const searchValidation = searchSchema.safeParse({ search })

  if (!searchValidation.success) {
    return null
  }

  const cards = await prisma.cardCompany.findMany({
    where: {
      isActive: true,
      ...(search && { name: { contains: search, mode: 'insensitive' } })
    },
    orderBy: { name: 'asc' },
    include: {
      _count: { select: { countries: true } }
    }
  })

  return (
    <div className="container flex flex-col gap-8 py-10">
      <BreadCrumbs items={[{ label: 'Home', href: '/' }, { label: 'Compare' }]} />

      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="border-primary/15 bg-secondary text-primary rounded-full border px-3 py-1 text-xs font-medium">Crypto cards</span>
        </div>

        <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">Compare crypto cards</h1>

        <p className="text-muted-foreground max-w-2xl text-sm leading-6 sm:text-base">
          Browse active crypto card providers and open a detailed comparison page for supported countries, payment options and card availability.
        </p>

        <SearchInput />
      </section>

      <Suspense fallback={<CompareCardSkeleton />}>
        <div className="flex flex-col gap-4">
          <span className="bg-card text-muted-foreground w-fit rounded-full border px-3 py-1 text-xs font-medium">{cards.length} active cards</span>

          {cards.length > 0 ? (
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {cards.map((card) => (
                <CompareCard key={card.id} card={card} />
              ))}
            </section>
          ) : (
            <section className="bg-card rounded-2xl border p-6 shadow-sm">
              <p className="text-muted-foreground text-sm">No active crypto cards are available yet.</p>
            </section>
          )}
        </div>
      </Suspense>
    </div>
  )
}
