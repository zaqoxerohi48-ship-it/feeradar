'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'

type Props = {
  href: string
  text: string
}

export const NavLink = (props: Props) => {
  return (
    <Suspense fallback={<NavLinkContent {...props} />}>
      <ActiveNavLink {...props} />
    </Suspense>
  )
}

const ActiveNavLink = ({ href, text }: Props) => {
  const pathname = usePathname()
  const isActive = href === '/' ? pathname === href : pathname.startsWith(href)

  return <NavLinkContent href={href} text={text} isActive={isActive} />
}

function NavLinkContent({ href, text, isActive = false }: Props & { isActive?: boolean }) {
  return (
    <Link
      href={href}
      className={isActive ? 'text-primary text-sm font-medium' : 'text-muted-foreground hover:text-foreground text-sm font-medium transition-colors'}
    >
      {text}
    </Link>
  )
}
