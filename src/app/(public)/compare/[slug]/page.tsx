import { BadgeCheck, CircleDollarSign, CreditCard, Globe2, ShieldCheck, Smartphone } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { dayjs } from '@/lib/dayjs'
import prisma from '@/lib/prisma'
import { BreadCrumbs } from '@/shared/ui/BreadCrumbs'
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

  return (
    <div className="container flex flex-col gap-6 py-10">
      <BreadCrumbs items={[{ label: 'Home', href: '/' }, { label: 'Compare', href: '/compare' }, { label: card.name }]} />

      <section className="bg-card rounded-2xl border shadow-sm">
        <div className="grid gap-10 p-5 sm:p-6 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="bg-background flex size-20 shrink-0 items-center justify-center rounded-2xl border p-3">
                <Image src={card.logoUrl} alt={`${card.name} logo`} width={64} height={64} className="h-full w-full rounded-xl object-contain" />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                    Active
                  </span>

                  <span className="bg-background text-muted-foreground rounded-full border px-3 py-1 text-xs font-medium">
                    Last checked {card.lastVerifiedAt ? dayjs.utc(card.lastVerifiedAt).format('DD MMM YYYY') : 'Not specified'}
                  </span>
                </div>

                <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">{card.name} Card</h1>

                <p className="text-muted-foreground max-w-2xl text-sm leading-6 sm:text-base">
                  Cryptocurrency card features, supported countries and payment options.
                </p>
              </div>
            </div>

            {card.description ? (
              <div
                className="text-muted-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_li]:before:bg-primary space-y-8 [&_div]:space-y-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:text-xl [&_h3]:font-semibold [&_li]:relative [&_li]:pl-6 [&_li]:before:absolute [&_li]:before:top-2.25 [&_li]:before:left-0 [&_li]:before:size-2 [&_li]:before:rounded-full [&_p]:leading-7 [&_section>div]:mb-6 [&_ul]:space-y-3"
                dangerouslySetInnerHTML={{
                  __html: card.description
                }}
              />
            ) : (
              <p className="text-muted-foreground text-sm leading-6">No detailed description is available for this card yet.</p>
            )}
          </div>

          <aside className="flex h-fit flex-col gap-5 lg:sticky lg:top-8">
            <div className="bg-background/60 flex flex-col gap-5 rounded-xl border p-5">
              <h2 className="text-lg font-semibold">Card information</h2>

              <div className="flex flex-col gap-5">
                <InfoItem icon={<CreditCard className="size-5" />} label="Card formats" isEmpty={!card.virtualCard && !card.physicalCard}>
                  {card.virtualCard ? <span>Virtual card</span> : null}
                  {card.virtualCard && card.physicalCard ? <span className="text-muted-foreground">•</span> : null}
                  {card.physicalCard ? <span>Physical card</span> : null}
                </InfoItem>

                <InfoItem icon={<CircleDollarSign className="size-5" />} label="Card networks" isEmpty={!card.visaCard && !card.masterCard}>
                  {card.visaCard ? <span>Visa</span> : null}
                  {card.visaCard && card.masterCard ? <span className="text-muted-foreground">•</span> : null}
                  {card.masterCard ? <span>Mastercard</span> : null}
                </InfoItem>

                <InfoItem icon={<Smartphone className="size-5" />} label="Mobile payments" isEmpty={!card.applePay && !card.googlePay}>
                  {card.applePay ? <span>Apple Pay</span> : null}
                  {card.applePay && card.googlePay ? <span className="text-muted-foreground">•</span> : null}
                  {card.googlePay ? <span>Google Pay</span> : null}
                </InfoItem>

                <InfoItem icon={<ShieldCheck className="size-5" />} label="Verification">
                  {card.kycRequirement === 'REQUIRED' ? <span>KYC required</span> : null}
                  {card.kycRequirement === 'NOT_REQUIRED' ? <span>KYC not required</span> : null}
                  {card.kycRequirement === 'UNKNOWN' ? <span>KYC requirements unknown</span> : null}
                </InfoItem>
              </div>
            </div>

            <div className="bg-background/60 flex flex-col gap-4 rounded-xl border p-5">
              <div className="flex items-center gap-3">
                <Globe2 className="text-primary size-5" />

                <div>
                  <h2 className="font-semibold">Supported countries</h2>
                  <p className="text-muted-foreground text-xs">{card.countries.length} countries</p>
                </div>
              </div>

              <ScrollArea className="h-52">
                <div className="flex flex-wrap gap-2 pr-3">
                  {card.countries.length > 0 ? (
                    card.countries.map((country) => (
                      <div
                        key={country.code}
                        title={country.name}
                        className="bg-card text-muted-foreground rounded-lg border px-2.5 py-1.5 text-xs font-medium"
                      >
                        {country.code}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">Countries are not specified.</p>
                  )}
                </div>
              </ScrollArea>
            </div>

            <a
              href={card.referralUrl || card.websiteUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium shadow-xs transition"
            >
              <BadgeCheck className="size-5" />
              Get {card.name} Card
            </a>

            <a
              href={card.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card text-foreground hover:bg-muted flex w-full items-center justify-center rounded-lg border px-5 py-3 text-sm font-medium shadow-xs transition"
            >
              Visit official website
            </a>

            <p className="text-muted-foreground text-center text-xs leading-5">
              Card availability and conditions may differ depending on your country.
            </p>
          </aside>
        </div>
      </section>
    </div>
  )
}
