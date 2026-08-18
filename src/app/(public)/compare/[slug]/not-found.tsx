import Link from 'next/link'

export default function CompareCardNotFound() {
  return (
    <section className="container flex min-h-[60vh] items-center justify-center py-16">
      <div className="flex max-w-xl flex-col items-center gap-5 text-center">
        <span className="border-primary/15 bg-secondary text-primary rounded-full border px-3 py-1 text-xs font-medium">Card not found</span>

        <div className="flex flex-col gap-3">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">This crypto card is not available</h1>
          <p className="text-muted-foreground text-sm leading-6 sm:text-base">It may be inactive, renamed, or not added to FeeWatch yet.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/compare"
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-ring/40 inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent px-3 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none select-none focus-visible:ring-3"
          >
            Browse cards
          </Link>
          <Link
            href="/"
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-ring/40 inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent px-3 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none select-none focus-visible:ring-3"
          >
            Go home
          </Link>
        </div>
      </div>
    </section>
  )
}
