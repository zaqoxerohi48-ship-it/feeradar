import { RefreshCw, ShieldCheck, Wallet } from 'lucide-react'

const reasons = [
  {
    icon: ShieldCheck,
    title: 'No sponsored ranking',
    description: 'Cards are listed side by side with the same fields - we don\u2019t push a "top pick" for a commission.'
  },
  {
    icon: RefreshCw,
    title: 'Checked regularly',
    description: 'Every card page shows a "last checked" date, so you know how fresh the fees and limits are.'
  },
  {
    icon: Wallet,
    title: 'All the fine print, one place',
    description: 'Cashback, spending limits, KYC requirements and card network  no digging through separate terms pages.'
  }
]

export function WhyCompareSection() {
  return (
    <section className="border-t pt-10">
      <div className="container flex flex-col gap-10">
        <div className="flex max-w-xl flex-col gap-2">
          <p className="text-primary text-sm font-medium tracking-wide uppercase">Why compare here</p>
          <h2 className="text-foreground text-3xl font-semibold tracking-tight">Skip the marketing pages</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {reasons.map((reason) => (
            <article key={reason.title} className="bg-card flex flex-col gap-4 rounded-2xl border p-5 shadow-sm">
              <span className="bg-secondary text-primary flex size-9 items-center justify-center rounded-lg">
                <reason.icon className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="text-foreground text-base font-semibold">{reason.title}</h3>
              <p className="text-muted-foreground text-sm leading-6">{reason.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
