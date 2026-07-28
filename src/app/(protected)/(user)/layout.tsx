import { requireUser } from '@/lib/requireAuth'
import { ProtectedUserFooter } from '@/widgets/protected-user-footer/ProtectedUserFooter'
import { ProtectedUserHeader } from '@/widgets/protected-user-header/ProtectedUserHeader'

export default async function UserLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  await requireUser()

  return (
    <div className="flex min-h-screen flex-col">
      <ProtectedUserHeader />
      <main className="flex-1">{children}</main>
      <ProtectedUserFooter />
    </div>
  )
}
