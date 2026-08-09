import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container flex min-h-[60vh] items-center justify-center py-16">
      <div className="flex max-w-xl flex-col items-center gap-5 text-center">
        <span className="rounded-full border border-primary/15 bg-secondary px-3 py-1 text-xs font-medium text-primary">404</span>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Page not found</h1>
          <p className="text-sm leading-6 text-muted-foreground sm:text-base">The page you are looking for does not exist or was moved.</p>
        </div>

        <Link
          href="/"
          className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent bg-primary px-3 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-xs transition-all outline-none select-none hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          Go home
        </Link>
      </div>
    </section>
  )
}
