import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { requireAuth } from '@/lib/requireAuthRoles'
import { ProtectedSidebar } from './ui/ProtectedSidebar'

export default async function ProtectedLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await requireAuth()

  return (
    <SidebarProvider>
      <ProtectedSidebar role={user.role} userEmail={user.email} />

      <SidebarInset>
        <header className="flex h-14 items-center border-b px-4">
          <SidebarTrigger />
        </header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
