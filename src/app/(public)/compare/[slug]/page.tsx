import { BadgeCheck, CircleDollarSign, CreditCard, Globe2, ShieldCheck, Smartphone } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { dayjs } from '@/lib/dayjs'
import prisma from '@/lib/prisma'
import { InfoItem } from './ui/InfoItem'

export { generateCompareSlugMetadata as generateMetadata } from './metadata'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 3600

export async function generateStaticParams() {
  const cards = await prisma.cardCompany.findMany({
    where: {
      isActive: true
    },
    select: {
      slug: true
    }
  })

  return cards.map((card) => ({ slug: card.slug }))
}

export default async function CompareSlugPage({ params }: Props) {
  const { slug } = await params

  const card = await prisma.cardCompany.findUnique({
    where: {
      slug,
      isActive: true
    },
    include: {
      countries: {
        orderBy: {
          name: 'asc'
        }
      }
    }
  })

  if (!card) {
    notFound()
  }

  const paymentMethods = [card.applePay && 'Apple Pay', card.googlePay && 'Google Pay'].filter(Boolean) as string[]

  const cardNetworks = [card.visaCard && 'Visa', card.masterCard && 'Mastercard'].filter(Boolean) as string[]

  const cardFormats = [card.virtualCard && 'Virtual card', card.physicalCard && 'Physical card'].filter(Boolean) as string[]

  return (
    <div className="container py-10">
      <section className="rounded-3xl border border-white/10 bg-linear-to-br from-[#1e1b3c] to-[#121020]">
        <div className="grid gap-10 p-4 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-white/10 p-3">
                <Image src={card.logoUrl} alt={`${card.name} logo`} width={64} height={64} className="h-full w-full object-contain" />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Active
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
                    Last checked {card.lastVerifiedAt ? dayjs.utc(card.lastVerifiedAt).format('DD MMM YYYY') : 'Not specified'}
                  </span>
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{card.name} Card</h1>

                <p className="max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
                  Cryptocurrency card features, supported countries and payment options.
                </p>
              </div>
            </div>

            {card.description ? (
              <div
                className="space-y-8 text-white/70 [&_div]:space-y-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-white [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_li]:relative [&_li]:pl-6 [&_li]:before:absolute [&_li]:before:top-2.25 [&_li]:before:left-0 [&_li]:before:size-2 [&_li]:before:rounded-full [&_li]:before:bg-cyan-400 [&_p]:leading-7 [&_section>div]:mb-6 [&_ul]:space-y-3"
                dangerouslySetInnerHTML={{
                  __html: card.description
                }}
              />
            ) : (
              <p className="text-sm leading-6 text-white/60">No detailed description is available for this card yet.</p>
            )}
          </div>

          <aside className="flex h-fit flex-col gap-5 lg:sticky lg:top-8">
            <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/4 p-5">
              <h2 className="text-lg font-semibold">Card information</h2>

              <div className="flex flex-col gap-5">
                <InfoItem icon={<CreditCard className="size-5" />} label="Card formats" values={cardFormats} />

                <InfoItem icon={<CircleDollarSign className="size-5" />} label="Card networks" values={cardNetworks} />

                <InfoItem icon={<Smartphone className="size-5" />} label="Mobile payments" values={paymentMethods} />

                <InfoItem
                  icon={<ShieldCheck className="size-5" />}
                  label="Verification"
                  values={[
                    card.kycRequirement === 'REQUIRED'
                      ? 'KYC required'
                      : card.kycRequirement === 'NOT_REQUIRED'
                        ? 'KYC not required'
                        : 'KYC requirements unknown'
                  ]}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/4 p-5">
              <div className="flex items-center gap-3">
                <Globe2 className="size-5 text-cyan-400" />

                <div>
                  <h2 className="font-semibold">Supported countries</h2>
                  <p className="text-xs text-white/50">{card.countries.length} countries</p>
                </div>
              </div>

              <ScrollArea className="h-52">
                <div className="flex flex-wrap gap-2 pr-3">
                  {card.countries.length > 0 ? (
                    card.countries.map((country) => (
                      <div
                        key={country.code}
                        title={country.name}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/70"
                      >
                        {country.code}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-white/50">Countries are not specified.</p>
                  )}
                </div>
              </ScrollArea>
            </div>

            <a
              href={card.referralUrl || card.websiteUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#00b8db] to-[#ad46ff] px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <BadgeCheck className="size-5" />
              Get {card.name} Card
            </a>

            <a
              href={card.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              Visit official website
            </a>

            <p className="text-center text-xs leading-5 text-white/40">Card availability and conditions may differ depending on your country.</p>
          </aside>
        </div>
      </section>
    </div>
  )
}
