import { ArrowRight, BadgeCheck, CreditCard, Globe2, ShieldCheck, Smartphone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Prisma } from '@/generated/prisma/client'

type CardCompanyWithCountriesCount = Prisma.CardCompanyGetPayload<{
  include: {
    _count: {
      select: {
        countries: true
      }
    }
  }
}>

type CompareCardProps = {
  card: CardCompanyWithCountriesCount
}

export const CompareCard = ({ card }: CompareCardProps) => {
  const cardFormats = [card.virtualCard && 'Virtual', card.physicalCard && 'Physical'].filter(Boolean) as string[]
  const cardNetworks = [card.visaCard && 'Visa', card.masterCard && 'Mastercard'].filter(Boolean) as string[]
  const paymentMethods = [card.applePay && 'Apple Pay', card.googlePay && 'Google Pay'].filter(Boolean) as string[]

  return (
    <Link
      href={`/compare/${card.slug}`}
      className="group flex min-h-72 flex-col gap-5 rounded-2xl border border-white/10 bg-white/4 p-5 transition hover:border-cyan-400/40 hover:bg-white/7"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 p-2.5">
            <Image src={card.logoUrl} alt={`${card.name} logo`} width={44} height={44} className="h-full w-full object-contain" />
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
          <span className="line-clamp-1 text-white/75">{cardFormats.length > 0 ? cardFormats.join(', ') : 'Not specified'}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-cyan-300">
            <BadgeCheck className="size-4" />
          </span>
          <span className="w-20 shrink-0 text-xs font-medium text-white/40 uppercase">Networks</span>
          <span className="line-clamp-1 text-white/75">{cardNetworks.length > 0 ? cardNetworks.join(', ') : 'Not specified'}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-cyan-300">
            <Smartphone className="size-4" />
          </span>
          <span className="w-20 shrink-0 text-xs font-medium text-white/40 uppercase">Payments</span>
          <span className="line-clamp-1 text-white/75">{paymentMethods.length > 0 ? paymentMethods.join(', ') : 'Not supported'}</span>
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
