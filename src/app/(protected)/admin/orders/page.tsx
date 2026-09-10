import { redirect } from 'next/navigation'
import { Prisma } from '@/generated/prisma/client'
import { getPagination } from '@/lib/pagination'
import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/requireAuthRoles'
import NuqsPagination from '@/shared/ui/NuqsPagination'
import { SearchInput } from '@/shared/ui/SearchInput'
import OrderCard from './ui/OrderCard'

type OrdersPageProps = {
  searchParams: Promise<{ page?: string; search?: string }>
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  await requireAdmin()

  const { page: pageParam, search: searchParam } = await searchParams
  const search = searchParam?.trim()
  const where: Prisma.OrderWhereInput | undefined = search ? { userId: { contains: search, mode: 'insensitive' } } : undefined

  const totalOrders = await prisma.order.count({ where })
  const { page, totalPages, skip, take } = getPagination({ pageParam, totalItems: totalOrders, pageSize: 5 })

  if (totalPages > 0 && page > totalPages) {
    const params = new URLSearchParams({ page: String(totalPages) })
    if (search) params.set('search', search)
    redirect(`/admin/orders?${params.toString()}`)
  }

  const orders = await prisma.order.findMany({
    where,
    include: {
      user: { select: { email: true, username: true } },
      plan: { select: { name: true, code: true } }
    },
    orderBy: { id: 'desc' },
    skip,
    take
  })

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-primary text-sm font-medium">Admin workspace</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Orders</h1>
          <p className="text-muted-foreground mt-1 text-sm">Review customer payments and order history.</p>
        </div>
        <p className="text-muted-foreground bg-card rounded-lg border px-3 py-2 text-sm">
          <span className="text-foreground font-semibold tabular-nums">{totalOrders}</span> {totalOrders === 1 ? 'order' : 'orders'}
        </p>
      </div>

      <div className="bg-card flex flex-col gap-3 rounded-xl border p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <SearchInput placeholder="Search by customer ID..." />
        <p className="text-muted-foreground text-xs">Stripe references are available in order details.</p>
      </div>

      {orders.length ? (
        <>
          <div className="bg-card hidden overflow-hidden rounded-xl border shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="bg-muted/50 text-muted-foreground text-xs tracking-wide uppercase">
                  <tr>
                    <th className="px-5 py-3 font-medium">Order</th>
                    <th className="px-5 py-3 font-medium">Customer</th>
                    <th className="px-5 py-3 font-medium">Plan</th>
                    <th className="px-5 py-3 font-medium">Amount</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 text-right font-medium">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <OrderCard key={order.id} order={order} variant="table" />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid gap-3 md:hidden">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} variant="mobile" />
            ))}
          </div>
        </>
      ) : (
        <div className="bg-card rounded-xl border px-5 py-14 text-center shadow-sm">
          <p className="text-base font-semibold">{search ? 'No matching orders' : 'No orders yet'}</p>
          <p className="text-muted-foreground mx-auto mt-2 max-w-sm text-sm">
            {search
              ? 'Try a different customer ID or clear the current search.'
              : 'Customer payments will appear here once checkout activity begins.'}
          </p>
        </div>
      )}

      {totalPages > 1 && <NuqsPagination totalPages={totalPages} />}
    </div>
  )
}
