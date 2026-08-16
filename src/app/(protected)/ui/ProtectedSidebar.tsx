'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { adminSidebarLinks, userSidebarLinks } from '../mocks/sidebar-links'

type ProtectedSidebarProps = {
  userEmail: string
  role: 'ADMIN' | 'USER'
}

export function ProtectedSidebar({ role, userEmail }: ProtectedSidebarProps) {
  const pathname = usePathname()
  const links = role === 'ADMIN' ? adminSidebarLinks : userSidebarLinks

  const handleLogout = async () => {
    toast.success('Logged out successfully.')
    await signOut({ callbackUrl: '/' })
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <Link href="/" className="flex h-10 items-center gap-2 px-2">
          <span className="truncate text-sm font-semibold">FeeRadar</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{userEmail}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href

                return (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton
                      tooltip={link.name}
                      isActive={isActive}
                      render={
                        <Link href={link.href}>
                          <Icon />
                          <span>{link.name}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Log out" onClick={handleLogout}>
              <LogOut />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
