import { redirect } from 'next/navigation'
import { getPagination } from '@/lib/pagination'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/requireAuthRoles'
import NuqsPagination from '@/shared/ui/NuqsPagination'
import PaymentCard from './ui/PaymentCard'

type Props = {
  searchParams: Promise<{ page?: string }>
}

export default async function BillingPage({ searchParams }: Props) {
  const user = await requireUser()
  const { page: pageParam } = await searchParams

  const where = {
    userId: user.id
  }

  const totalOrders = await prisma.order.count({ where })
  const { page, totalPages, skip, take } = getPagination({ pageParam, totalItems: totalOrders, pageSize: 5 })

  if (totalPages > 0 && page > totalPages) {
    const params = new URLSearchParams({
      page: String(totalPages)
    })

    redirect(`/billing?${params.toString()}`)
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: {
      createdAt: 'desc'
    },
    skip,
    take
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-normal">Billing</h1>
        <p className="text-muted-foreground text-sm">Review your recent payments and download receipts when they are available.</p>
      </div>

      <div className="grid gap-3">
        {orders.map((order) => (
          <PaymentCard key={order.id} order={order} />
        ))}

        {orders.length === 0 && <div className="text-muted-foreground rounded-lg border bg-white p-10 text-center text-sm">No payments yet.</div>}
      </div>

      <NuqsPagination totalPages={totalPages} />
    </div>
  )
}
