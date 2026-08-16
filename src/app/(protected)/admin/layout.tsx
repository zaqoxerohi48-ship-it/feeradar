import { requireAdmin } from '@/lib/requireAuthRoles'

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  await requireAdmin()

  return children
}
