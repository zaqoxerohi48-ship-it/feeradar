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

export const CompareCard = ({ card }: CompareCardProps) => {
  return (
    <Link
      href={`/compare/${card.slug}`}
      className="group flex min-h-72 flex-col gap-5 rounded-2xl border border-white/10 bg-white/4 p-5 transition hover:border-cyan-400/40 hover:bg-white/7"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 p-2.5">
            <Image src={card.logoUrl} alt={`${card.name} logo`} width={44} height={44} className="h-full w-full rounded-xl object-contain" />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-white">{card.name}</h2>
            <span className="text-xs font-medium text-emerald-300">Active</span>
          </div>
        </div>

        <ArrowRight className="size-5 shrink-0 text-white/30 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
      </div>

      <div className="grid gap-3 text-sm text-white/70">
        <div className="flex items-center gap-3">
          <span className="text-cyan-300">
            <CreditCard className="size-4" />
          </span>
          <span className="w-20 shrink-0 text-xs font-medium text-white/40 uppercase">Formats</span>
          <span className="line-clamp-1 text-white/75">
            {card.virtualCard ? 'Virtual' : null}
            {card.virtualCard && card.physicalCard ? ', ' : null}
            {card.physicalCard ? 'Physical' : null}
            {!card.virtualCard && !card.physicalCard ? 'Not specified' : null}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-cyan-300">
            <BadgeCheck className="size-4" />
          </span>
          <span className="w-20 shrink-0 text-xs font-medium text-white/40 uppercase">Networks</span>
          <span className="line-clamp-1 text-white/75">
            {card.visaCard ? 'Visa' : null}
            {card.visaCard && card.masterCard ? ', ' : null}
            {card.masterCard ? 'Mastercard' : null}
            {!card.visaCard && !card.masterCard ? 'Not specified' : null}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-cyan-300">
            <Smartphone className="size-4" />
          </span>
          <span className="w-20 shrink-0 text-xs font-medium text-white/40 uppercase">Payments</span>
          <span className="line-clamp-1 text-white/75">
            {card.applePay ? 'Apple Pay' : null}
            {card.applePay && card.googlePay ? ', ' : null}
            {card.googlePay ? 'Google Pay' : null}
            {!card.applePay && !card.googlePay ? 'Not supported' : null}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-cyan-300">
            <ShieldCheck className="size-4" />
          </span>
          <span className="w-20 shrink-0 text-xs font-medium text-white/40 uppercase">KYC</span>
          <span className="line-clamp-1 text-white/75">
            {card.kycRequirement === 'REQUIRED' ? 'Required' : card.kycRequirement === 'NOT_REQUIRED' ? 'Not required' : 'Unknown'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-white/10 pt-4 text-sm text-white/60">
        <Globe2 className="size-4 text-cyan-300" />
        <span>{card._count.countries} supported countries</span>
      </div>
    </Link>
  )
}
