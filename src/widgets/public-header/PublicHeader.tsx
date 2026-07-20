import Link from 'next/link'
import { Logo } from './Logo'

export const PublicHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b py-5 backdrop-blur-sm">
      <div className="container flex items-center justify-between">
        <Logo />
        <Link href="/login" className="rounded-lg bg-green-400 px-6 py-2 font-semibold text-black transition-colors hover:bg-green-500">
          Get Started
        </Link>
      </div>
    </header>
  )
}
