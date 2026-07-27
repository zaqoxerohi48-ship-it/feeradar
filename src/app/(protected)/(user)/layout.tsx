import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { ProtectedUserFooter } from '@/widgets/protected-user-footer/ProtectedUserFooter'
import { ProtectedUserHeader } from '@/widgets/protected-user-header/ProtectedUserHeader'

export default async function UserLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (!session?.user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ProtectedUserHeader />
      <main className="flex-1">{children}</main>
      <ProtectedUserFooter />
    </div>
  )
}
