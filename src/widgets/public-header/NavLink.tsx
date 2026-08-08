'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  href: string
  text: string
}

export const NavLink = ({ href, text }: Props) => {
  const pathname = usePathname()
  const isActive = href === '/' ? pathname === href : pathname.startsWith(href)

  return (
    <Link href={href} className={isActive ? 'text-green-400' : ''}>
      {text}
    </Link>
  )
}
