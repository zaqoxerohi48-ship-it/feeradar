import Link from 'next/link'

export const Logo = () => {
  return (
    <Link className="text-foreground text-xl font-semibold tracking-tight" href="/">
      <span>Fee</span>
      <span className="text-primary">Watch</span>
    </Link>
  )
}
