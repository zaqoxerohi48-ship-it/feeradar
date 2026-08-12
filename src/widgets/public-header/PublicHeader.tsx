import Link from 'next/link'
import { getCurrentUser } from '@/lib/requireAuthRoles'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { NavLink } from './NavLink'
import { navigationLinks } from './mocks/mocks'

export async function PublicHeader() {
  const user = await getCurrentUser()

  return (
    <header className="bg-background/85 sticky top-0 z-50 border-b py-4 backdrop-blur-md">
      <div className="container flex items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <NavLink key={link.name} href={link.href} text={link.name} />
          ))}
        </nav>

        <MobileMenu isAuthenticated={Boolean(user)} />

        {user?.role === 'USER' && (
          <div className="hidden md:block">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
              Dashboard
            </Link>
          </div>
        )}

        {user?.role === 'ADMIN' && (
          <Link href="/admin" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
            Dashboard
          </Link>
        )}

        {!user && (
          <Link
            href="/login"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hidden h-9 items-center rounded-lg px-4 py-2 text-sm font-medium shadow-xs transition-colors md:inline-flex"
          >
            Get Started
          </Link>
        )}
      </div>
    </header>
  )
}
