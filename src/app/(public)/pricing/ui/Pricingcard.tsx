import { Check } from 'lucide-react'
import Link from 'next/link'
import { auth } from '@/auth'
import { Plan } from '@/generated/prisma/client'
import { CheckoutButton } from './CheckoutButton'

type Props = {
  plan: Plan
}

export async function PricingCard({ plan }: Props) {
  const isFree = plan.priceCents === 0
  const price = isFree ? '$0' : `$${plan.priceCents / 100}`

  const session = await auth()

  const isAuth = !!session?.user?.id

  return (
    <article className={`bg-card relative flex flex-col gap-6 rounded-2xl border p-8 shadow-sm ${plan.mostPopular ? 'border-primary/30' : ''}`}>
      {plan.mostPopular ? (
        <span className="border-primary/15 bg-secondary text-primary absolute -top-3 left-8 rounded-full border px-3 py-1 text-xs font-medium">
          Most valuable
        </span>
      ) : null}

      <div>
        <h2 className="text-foreground text-lg font-semibold">{plan.name}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{plan.description}</p>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-foreground text-4xl font-semibold tracking-tight">{price}</span>
      </div>

      <ul className="flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="text-foreground flex items-start gap-2 text-sm">
            <Check className="mt-0.5 size-4 flex-none text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {isFree && isAuth ? (
        <button
          type="button"
          disabled
          className="bg-muted text-muted-foreground w-full cursor-not-allowed rounded-lg border px-4 py-2.5 text-center text-sm font-medium opacity-80"
        >
          Current free plan
        </button>
      ) : isFree ? (
        <Link
          href="/login"
          className="bg-card text-foreground hover:bg-muted block rounded-lg border px-4 py-2.5 text-center text-sm font-medium shadow-xs transition-colors"
        >
          Sign in to start free
        </Link>
      ) : (
        <CheckoutButton planId={plan.id} isAuth={isAuth} />
      )}
    </article>
  )
}
