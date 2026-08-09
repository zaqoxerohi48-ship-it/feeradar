import Link from 'next/link'
import { getCurrentUser } from '@/lib/requireAuthRoles'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { NavLink } from './NavLink'
import { navigationLinks } from './mocks/mocks'

export async function PublicHeader() {
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 py-4 backdrop-blur-md">
      <div className="container flex items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <NavLink key={link.name} href={link.href} text={link.name} />
          ))}
        </nav>

        <MobileMenu isAuthenticated={Boolean(user)} />

        {user ? (
          <div className="hidden md:block">
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Dashboard
            </Link>
          </div>
        ) : (
          <Link
            href="/login"
            className="hidden h-9 items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 md:inline-flex"
          >
            Get Started
          </Link>
        )}
      </div>
    </header>
  )
}
