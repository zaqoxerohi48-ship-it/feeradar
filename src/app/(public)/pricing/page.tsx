import { Bell, FileDown, Star } from 'lucide-react'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { PricingCard } from './ui/Pricingcard'

export default async function PricingPage() {
  const session = await auth()
  const [plans, currentUser] = await Promise.all([
    prisma.plan.findMany({
      orderBy: { priceCents: 'asc' }
    }),
    session?.user?.id
      ? prisma.user.findUnique({
          where: { id: session.user.id },
          select: { planId: true }
        })
      : null
  ])

  return (
    <section className="container flex flex-col gap-10 py-10 sm:py-16">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
        <p className="text-primary text-sm font-medium tracking-wide uppercase">Pricing</p>
        <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">Simple pricing, no surprises</h1>
        <p className="text-muted-foreground text-lg leading-8">Compare cards for free. Upgrade if you want us to watch the fine print for you.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} currentPlanId={currentUser?.planId} isAuth={!!session?.user?.id} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-foreground text-center text-xl font-semibold">What Pro alerts cover</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card flex flex-col gap-3 rounded-2xl border p-5 shadow-sm">
            <span className="bg-secondary text-primary flex size-9 items-center justify-center rounded-lg">
              <Bell className="size-5" strokeWidth={1.75} />
            </span>
            <h3 className="text-foreground text-sm font-semibold">Terms change</h3>
            <p className="text-muted-foreground text-sm leading-6">Cashback rate, fees or spending limits update on a card you follow.</p>
          </div>
          <div className="bg-card flex flex-col gap-3 rounded-2xl border p-5 shadow-sm">
            <span className="bg-secondary text-primary flex size-9 items-center justify-center rounded-lg">
              <Star className="size-5" strokeWidth={1.75} />
            </span>
            <h3 className="text-foreground text-sm font-semibold">New cards</h3>
            <p className="text-muted-foreground text-sm leading-6">
              A new card is added to the comparison so you don&#39;t have to keep checking back.
            </p>
          </div>
          <div className="bg-card flex flex-col gap-3 rounded-2xl border p-5 shadow-sm">
            <span className="bg-secondary text-primary flex size-9 items-center justify-center rounded-lg">
              <FileDown className="size-5" strokeWidth={1.75} />
            </span>
            <h3 className="text-foreground text-sm font-semibold">Export anytime</h3>
            <p className="text-muted-foreground text-sm leading-6">Download your watchlist as CSV whenever you need it offline.</p>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground text-center text-xs leading-6">
        This is a personal project used to test Stripe subscriptions - no card details are stored by us directly.
      </p>
    </section>
  )
}
