import { CreditCard, LayoutDashboard, Shield, ShoppingCart, Trash2, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type SidebarLink = {
  name: string
  href: string
  icon: LucideIcon
}

export const userSidebarLinks: SidebarLink[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Billing',
    href: '/billing',
    icon: CreditCard
  },

  {
    name: 'Delete account',
    href: '/delete',
    icon: Trash2
  }
]

export const adminSidebarLinks: SidebarLink[] = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: Shield
  },
  {
    name: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart
  },
  {
    name: 'All users',
    href: '/admin/all-users',
    icon: Users
  }
]
