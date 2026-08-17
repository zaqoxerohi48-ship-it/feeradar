import { redirect } from 'next/navigation'
import { Prisma } from '@/generated/prisma/client'
import { getPagination } from '@/lib/pagination'
import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/requireAuthRoles'
import NuqsPagination from '@/shared/ui/NuqsPagination'
import { SearchInput } from '@/shared/ui/SearchInput'
import OrderCard from './ui/OrderCard'

type OrdersPageProps = {
  searchParams: Promise<{
    page?: string
    search?: string
  }>
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  await requireAdmin()

  const { page: pageParam, search: searchParam } = await searchParams
  const search = searchParam?.trim()

  const where: Prisma.OrderWhereInput | undefined = search
    ? {
        userId: {
          contains: search,
          mode: 'insensitive'
        }
      }
    : undefined

  const totalOrders = await prisma.order.count({ where })

  const { page, totalPages, skip, take } = getPagination({ pageParam, totalItems: totalOrders, pageSize: 5 })

  if (totalPages > 0 && page > totalPages) {
    const params = new URLSearchParams({ page: String(totalPages) })

    if (search) {
      params.set('search', search)
    }

    redirect(`/admin/orders?${params.toString()}`)
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: {
      id: 'desc'
    },
    skip,
    take
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-semibold">Orders</p>
        <p className="text-muted-foreground text-sm">View and manage customer orders.</p>
      </div>

      <SearchInput placeholder="Search orders by user ID..." />

      <div className="grid gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}

        {orders.length === 0 && (
          <div className="text-muted-foreground rounded-xl border p-10 text-center text-sm">
            {search ? 'No orders match your search.' : 'No orders yet.'}
          </div>
        )}
      </div>

      <NuqsPagination totalPages={totalPages} />
    </div>
  )
}
