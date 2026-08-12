import { Check, ShieldCheck } from 'lucide-react'
import { comparedFeatures, howItWorksSteps } from './mocks/mocks'

export default function HowItWorksPage() {
  return (
    <>
      <section className="container py-10 text-center">
        <p className="text-primary text-sm font-medium tracking-wide uppercase">How it works</p>
        <h1 className="text-foreground mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Find your crypto card in three steps</h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg leading-8">
          We compare fees, limits and conditions of popular crypto cards, so you can pick the right one before you spend a cent of crypto.
        </p>
      </section>

      <section className="container max-w-5xl pb-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {howItWorksSteps.map((step) => (
            <article key={step.number} className="bg-card rounded-2xl border p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground text-sm font-semibold">{step.number}</span>
              </div>
              <h3 className="text-foreground mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-6">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-card/70 border-y">
        <div className="container max-w-5xl py-16">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">What we compare</h2>
          <p className="text-muted-foreground mt-2 max-w-xl">Every card page follows the same structure, so comparisons stay apples-to-apples.</p>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {comparedFeatures.map((item) => (
              <li key={item} className="text-foreground flex items-start gap-2">
                <Check className="mt-0.5 size-4 flex-none text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container max-w-5xl py-16">
        <div className="bg-card flex flex-col gap-4 rounded-2xl border p-6 shadow-sm sm:flex-row sm:items-start">
          <ShieldCheck className="text-primary size-6 flex-none" strokeWidth={1.75} />
          <div>
            <h3 className="text-foreground font-semibold">Most cards require identity verification (KYC)</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              To comply with financial regulations, most providers ask for a photo ID and a selfie before you can top up or spend. Some offer a
              limited unverified tier with lower limits. Requirements, supported countries and processing times vary by provider - check the
              card&#39;s own page for details before applying.
            </p>
          </div>
        </div>
      </section>

      <section className="container max-w-5xl">
        <p className="text-muted-foreground text-xs leading-6">
          We are not affiliated with the card issuers and do not process payments or hold funds ourselves. Fees, limits, cashback rates and
          availability change periodically and can vary by country - always confirm current terms on the provider&#39;s official page before applying.
          Card information on this site is kept up to date on a best-effort basis; see the &#34;Last checked&#34; date on each card page.
        </p>
      </section>
    </>
  )
}
