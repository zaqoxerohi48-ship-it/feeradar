import Link from 'next/link'

export const Logo = () => {
  return (
    <Link className="text-xl font-semibold tracking-tight text-foreground" href="/">
      <span>Fee</span>
      <span className="text-primary">Watch</span>
    </Link>
  )
}
