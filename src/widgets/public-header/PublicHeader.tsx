import Link from 'next/link'
import { getCurrentUser } from '@/lib/requireAuthRoles'
import { Logo } from './Logo'

export async function PublicHeader() {
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-50 border-b py-5 backdrop-blur-sm">
      <div className="container flex items-center justify-between">
        <Logo />
        {user ? (
          <div>
            <Link href="/dashboard">Dashboard</Link>
          </div>
        ) : (
          <Link href="/login" className="rounded-lg bg-green-400 px-6 py-2 font-semibold text-black transition-colors hover:bg-green-500">
            Get Started
          </Link>
        )}
      </div>
    </header>
  )
}
