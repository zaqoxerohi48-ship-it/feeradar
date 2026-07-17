import Link from 'next/link'

export const Logo = () => {
  return (
    <Link className="text-2xl font-medium" href="/">
      <span>Fee</span>
      <span className="text-green-400">Radar</span>
    </Link>
  )
}
