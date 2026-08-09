import { ArrowRight, BadgeCheck, CreditCard, Globe2, ShieldCheck, Smartphone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type CompareCardItem = {
  id: number
  name: string
  slug: string
  logoUrl: string
  kycRequirement: 'REQUIRED' | 'NOT_REQUIRED' | 'UNKNOWN'
  virtualCard: boolean
  physicalCard: boolean
  applePay: boolean
  googlePay: boolean
  visaCard: boolean
  masterCard: boolean
  _count: {
    countries: number
  }
}

type CompareCardProps = {
  card: CompareCardItem
}

export async function CompareCard({ card }: CompareCardProps) {
  return (
    <Link
      href={`/compare/${card.slug}`}
      className="group bg-card hover:border-primary/30 hover:bg-card flex min-h-72 flex-col gap-5 rounded-2xl border p-5 shadow-sm transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-background flex size-14 shrink-0 items-center justify-center rounded-xl border p-2.5">
            <Image src={card.logoUrl} alt={`${card.name} logo`} width={44} height={44} className="h-full w-full rounded-xl object-contain" />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-foreground text-lg font-semibold">{card.name}</h2>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Active</span>
          </div>
        </div>

        <ArrowRight className="text-muted-foreground group-hover:text-primary size-5 shrink-0 transition group-hover:translate-x-1" />
      </div>

      <div className="text-muted-foreground grid gap-3 text-sm">
        <div className="flex items-center gap-3">
          <span className="text-primary">
            <CreditCard className="size-4" />
          </span>
          <span className="text-muted-foreground w-20 shrink-0 text-xs font-medium uppercase">Formats</span>
          <span className="text-foreground line-clamp-1">
            {card.virtualCard ? 'Virtual' : null}
            {card.virtualCard && card.physicalCard ? ', ' : null}
            {card.physicalCard ? 'Physical' : null}
            {!card.virtualCard && !card.physicalCard ? 'Not specified' : null}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-primary">
            <BadgeCheck className="size-4" />
          </span>
          <span className="text-muted-foreground w-20 shrink-0 text-xs font-medium uppercase">Networks</span>
          <span className="text-foreground line-clamp-1">
            {card.visaCard ? 'Visa' : null}
            {card.visaCard && card.masterCard ? ', ' : null}
            {card.masterCard ? 'Mastercard' : null}
            {!card.visaCard && !card.masterCard ? 'Not specified' : null}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-primary">
            <Smartphone className="size-4" />
          </span>
          <span className="text-muted-foreground w-20 shrink-0 text-xs font-medium uppercase">Payments</span>
          <span className="text-foreground line-clamp-1">
            {card.applePay ? 'Apple Pay' : null}
            {card.applePay && card.googlePay ? ', ' : null}
            {card.googlePay ? 'Google Pay' : null}
            {!card.applePay && !card.googlePay ? 'Not supported' : null}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-primary">
            <ShieldCheck className="size-4" />
          </span>
          <span className="text-muted-foreground w-20 shrink-0 text-xs font-medium uppercase">KYC</span>
          <span className="text-foreground line-clamp-1">
            {card.kycRequirement === 'REQUIRED' ? 'Required' : card.kycRequirement === 'NOT_REQUIRED' ? 'Not required' : 'Unknown'}
          </span>
        </div>
      </div>

      <div className="text-muted-foreground flex items-center gap-2 border-t pt-4 text-sm">
        <Globe2 className="text-primary size-4" />
        <span>{card._count.countries} supported countries</span>
      </div>
    </Link>
  )
}
