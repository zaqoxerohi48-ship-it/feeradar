import Link from 'next/link'
import { getCurrentUser } from '@/lib/requireAuthRoles'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { NavLink } from './NavLink'
import { navigationLinks } from './mocks/mocks'

export async function PublicHeader() {
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-50 border-b py-5 backdrop-blur-sm">
      <div className="container flex items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-10 md:flex">
          {navigationLinks.map((link) => (
            <NavLink key={link.name} href={link.href} text={link.name} />
          ))}
        </nav>

        <MobileMenu isAuthenticated={Boolean(user)} />

        {user ? (
          <div className="hidden md:block">
            <Link href="/dashboard">Dashboard</Link>
          </div>
        ) : (
          <Link href="/login" className="hidden rounded-lg bg-green-400 px-6 py-2 font-semibold text-black transition-colors hover:bg-green-500 md:block">
            Get Started
          </Link>
        )}
      </div>
    </header>
  )
}
