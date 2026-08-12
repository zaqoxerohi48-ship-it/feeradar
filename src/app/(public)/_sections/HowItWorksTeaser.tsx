import { ArrowRight } from 'lucide-react'

const steps = [
  { number: '01', title: 'Browse available cards' },
  { number: '02', title: 'Compare fees and limits' },
  { number: '03', title: 'Apply on the official page' }
]

export function HowItWorksTeaser() {
  return (
    <section className="bg-card/70 border-t">
      <div className="container flex flex-col gap-10 py-15">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-primary text-sm font-medium tracking-wide uppercase">How it works</p>
            <h2 className="text-foreground text-3xl font-semibold tracking-tight">Three steps, no account needed</h2>
          </div>
          <a href="/how-it-works" className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm font-medium transition-colors">
            See full details
            <ArrowRight className="size-4" strokeWidth={2} />
          </a>
        </div>

        <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.number} className="bg-card flex items-center gap-4 rounded-2xl border p-5 shadow-sm">
              <span className="text-muted-foreground/45 text-2xl font-semibold">{step.number}</span>
              <span className="text-foreground text-base font-medium">{step.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
