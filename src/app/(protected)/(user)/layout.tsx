import { requireUser } from '@/lib/requireAuthRoles'

export default async function UserLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  await requireUser()

  return children
}
