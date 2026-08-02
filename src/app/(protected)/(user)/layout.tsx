import { requireUser } from '@/lib/requireAuthRoles'
import { PublicFooter } from '@/widgets/public-footer/PublicFooter'
import { PublicHeader } from '@/widgets/public-header/PublicHeader'

export default async function UserLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  await requireUser()

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  )
}
