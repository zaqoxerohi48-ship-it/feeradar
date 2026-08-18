import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { cookies } from 'next/headers'
import { Toaster } from 'sonner'
import { rootMetadata } from '@/lib/metadata'
import { CookieModal } from '@/widgets/cookie-modal/CookieModal'
import { AnalyticsGate } from '@/widgets/cookie-modal/analytics-gate'
import { COOKIE_CONSENT_KEY, type CookieConsent } from '@/widgets/cookie-modal/constants'
import './globals.css'
import { Providers } from './providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

export const metadata: Metadata = rootMetadata

function getCookieConsent(value?: string): CookieConsent | undefined {
  if (value === 'accepted' || value === 'rejected') {
    return value
  }

  return undefined
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const consent = getCookieConsent(cookieStore.get(COOKIE_CONSENT_KEY)?.value)

  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
        <CookieModal consent={consent} />
        <AnalyticsGate consent={consent} />
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
