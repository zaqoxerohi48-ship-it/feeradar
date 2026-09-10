import { ArrowLeft, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPagination } from '@/lib/pagination'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/requireAuthRoles'
import NuqsPagination from '@/shared/ui/NuqsPagination'
import PaymentCard from './ui/PaymentCard'

type Props = {
  searchParams: Promise<{ page?: string }>
}

export const instant = false

export default async function BillingPage({ searchParams }: Props) {
  const user = await requireUser()
  const { page: pageParam } = await searchParams
  const where = { userId: user.id }
  const totalOrders = await prisma.order.count({ where })
  const { page, totalPages, skip, take } = getPagination({ pageParam, totalItems: totalOrders, pageSize: 5 })

  if (totalPages > 0 && page > totalPages) redirect(`/billing?page=${totalPages}`)

  const orders = await prisma.order.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take })

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div>
        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium">
          <ArrowLeft className="size-4" aria-hidden="true" /> Account settings
        </Link>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-primary text-sm font-medium">Billing</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Plan and payments</h1>
            <p className="text-muted-foreground mt-1 text-sm">Review your current plan, payment history, and available receipts.</p>
          </div>
          <p className="bg-card text-muted-foreground rounded-lg border px-3 py-2 text-sm">
            <span className="text-foreground font-semibold tabular-nums">{totalOrders}</span> {totalOrders === 1 ? 'payment' : 'payments'}
          </p>
        </div>
      </div>

      <section className="bg-card rounded-xl border p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
            <CreditCard className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-primary text-xs font-semibold tracking-wide uppercase">Current plan</p>
            <h2 className="mt-1 text-lg font-semibold">{user.plan.name}</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {formatPlanPrice(user.plan.priceCents)} · {user.plan.code} plan
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="payments-heading">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 id="payments-heading" className="text-lg font-semibold">
              Payment history
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">Receipts can be downloaded for paid payments.</p>
          </div>
        </div>
        {orders.length ? (
          <div className="grid gap-3">
            {orders.map((order) => (
              <PaymentCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl border px-5 py-14 text-center shadow-sm">
            <p className="text-base font-semibold">No payments yet</p>
            <p className="text-muted-foreground mx-auto mt-2 max-w-sm text-sm">
              Your payment history and downloadable receipts will appear here after a successful checkout.
            </p>
          </div>
        )}
      </section>

      {totalPages > 1 && <NuqsPagination totalPages={totalPages} />}
    </div>
  )
}

function formatPlanPrice(priceCents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceCents / 100)
}
