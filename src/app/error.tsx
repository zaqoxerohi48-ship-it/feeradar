'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="container flex min-h-[60vh] items-center justify-center py-16">
      <div className="flex max-w-xl flex-col items-center gap-5 text-center">
        <span className="rounded-full border border-primary/15 bg-secondary px-3 py-1 text-xs font-medium text-primary">Something went wrong</span>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">We could not load this page</h1>
          <p className="text-sm leading-6 text-muted-foreground sm:text-base">Please try again. If the issue keeps happening, come back a little later.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <Link
            href="/"
            className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent bg-primary px-3 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-xs transition-all outline-none select-none hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
          >
            Go home
          </Link>
        </div>
      </div>
    </section>
  )
}
