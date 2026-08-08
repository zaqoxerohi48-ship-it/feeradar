'use client'

import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { navigationLinks } from './mocks/mocks'

type Props = {
  isAuthenticated: boolean
}

export function MobileMenu({ isAuthenticated }: Props) {
  const pathname = usePathname()

  const authLink = isAuthenticated
    ? { href: '/dashboard', name: 'Dashboard' }
    : { href: '/login', name: 'Get Started' }

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
            <MenuIcon />
          </Button>
        }
      />

      <SheetContent className="w-full max-w-80 gap-6">
        <SheetHeader className="border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-2 px-4">
          {navigationLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === link.href : pathname.startsWith(link.href)

            return (
              <SheetClose key={link.name} nativeButton={false} render={<Link href={link.href} />}>
                <span
                  className={cn(
                    'block rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-muted hover:text-foreground',
                    isActive && 'bg-green-400/10 text-green-400'
                  )}
                >
                  {link.name}
                </span>
              </SheetClose>
            )
          })}
        </nav>

        <SheetFooter className="border-t">
          <SheetClose nativeButton={false} render={<Link href={authLink.href} />}>
            <span
              className={cn(
                'flex h-10 items-center justify-center rounded-lg px-4 font-semibold transition-colors',
                isAuthenticated
                  ? 'border border-border hover:bg-muted'
                  : 'bg-green-400 text-black hover:bg-green-500'
              )}
            >
              {authLink.name}
            </span>
          </SheetClose>
          <div className="flex justify-center pt-2">
            <Logo />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
