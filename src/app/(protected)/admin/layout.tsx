import { requireAdmin } from '@/lib/requireAuth'

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  await requireAdmin()

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}
