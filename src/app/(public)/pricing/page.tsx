import { Bell, Check, FileDown, Star } from 'lucide-react'
import Link from 'next/link'

const freeFeatures = ['Access to all card comparisons', 'Current fees, limits and KYC info', 'Search and filters']

const proFeatures = [
  'Everything in Free',
  'Alerts when a tracked card\u2019s fees, cashback or limits change',
  'Notified when a new card is added',
  'Save cards to a watchlist',
  'Export comparisons to CSV'
]
export default function PricingPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium tracking-wide text-teal-600 uppercase">Pricing</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Simple pricing, no surprises</h1>
        <p className="mt-4 text-lg text-slate-600">Compare cards for free. Upgrade if you want us to watch the fine print for you.</p>
      </div>

      <div className="mx-auto mt-16 grid max-w-3xl gap-8 sm:grid-cols-2">
        {/* Free plan */}
        <div className="flex flex-col rounded-lg border border-slate-200 p-8">
          <h2 className="text-lg font-semibold text-slate-900">Free</h2>
          <p className="mt-1 text-sm text-slate-500">For casually checking your options.</p>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-4xl font-semibold tracking-tight text-slate-900">$0</span>
            <span className="text-sm text-slate-500">/ month</span>
          </div>

          <ul className="mt-8 flex-1 space-y-3">
            {freeFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="mt-0.5 h-4 w-4 flex-none text-slate-400" strokeWidth={2} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/compare"
            className="mt-8 block rounded-md border border-slate-300 px-4 py-2.5 text-center text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
          >
            Get started
          </Link>
        </div>

        {/* Pro plan */}
        <div className="relative flex flex-col rounded-lg border-2 border-teal-600 p-8">
          <span className="absolute -top-3 left-8 rounded-full bg-teal-600 px-3 py-1 text-xs font-medium text-white">Most popular</span>
          <h2 className="text-lg font-semibold text-slate-900">Pro</h2>
          <p className="mt-1 text-sm text-slate-500">For staying ahead of fee changes.</p>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-4xl font-semibold tracking-tight text-slate-900">$5</span>
            <span className="text-sm text-slate-500">/ month</span>
          </div>

          <ul className="mt-8 flex-1 space-y-3">
            {proFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="mt-0.5 h-4 w-4 flex-none text-teal-600" strokeWidth={2} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <form action="/api/checkout" method="POST" className="mt-8">
            <button
              type="submit"
              className="w-full rounded-md bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* What Pro alerts look like */}
      <div className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-center text-xl font-semibold text-slate-900">What Pro alerts cover</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          <div>
            <Bell className="h-5 w-5 text-teal-600" strokeWidth={1.75} />
            <h3 className="mt-3 text-sm font-semibold text-slate-900">Terms change</h3>
            <p className="mt-1 text-sm text-slate-600">Cashback rate, fees or spending limits update on a card you follow.</p>
          </div>
          <div>
            <Star className="h-5 w-5 text-teal-600" strokeWidth={1.75} />
            <h3 className="mt-3 text-sm font-semibold text-slate-900">New cards</h3>
            <p className="mt-1 text-sm text-slate-600">A new card is added to the comparison so you don\u2019t have to keep checking back.</p>
          </div>
          <div>
            <FileDown className="h-5 w-5 text-teal-600" strokeWidth={1.75} />
            <h3 className="mt-3 text-sm font-semibold text-slate-900">Export anytime</h3>
            <p className="mt-1 text-sm text-slate-600">Download your watchlist as CSV whenever you need it offline.</p>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-16 max-w-xl text-center text-xs text-slate-500">
        Cancel anytime. This is a personal project used to test Stripe subscriptions \u2014 no card details are stored by us directly.
      </p>
    </section>
  )
}
