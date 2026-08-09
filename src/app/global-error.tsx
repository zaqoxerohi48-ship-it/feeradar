'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import './globals.css'

type GlobalErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16 text-foreground">
          <section className="flex max-w-xl flex-col items-center gap-5 text-center">
            <span className="rounded-full border border-destructive/15 bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">Application error</span>
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">FeeRadar crashed</h1>
              <p className="text-sm leading-6 text-muted-foreground sm:text-base">Please reload the application and try again.</p>
            </div>
            <Button type="button" onClick={reset}>
              Reload
            </Button>
          </section>
        </main>
      </body>
    </html>
  )
}
