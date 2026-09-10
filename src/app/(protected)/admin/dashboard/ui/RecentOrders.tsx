import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { dayjs } from '@/lib/dayjs'
import { OrderStatusBadge } from '../../orders/ui/OrderStatusBadge'

type RecentOrdersProps = {
  orders: Array<{
    id: number
    amountCents: number
    currency: string
    status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
    createdAt: Date
    user: { email: string }
    plan: { name: string }
  }>
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <section className="bg-card overflow-hidden rounded-xl border shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-4 sm:px-5">
        <div>
          <h2 className="text-base font-semibold">Recent payments</h2>
          <p className="text-muted-foreground mt-0.5 text-xs">Latest order activity</p>
        </div>
        <Link href="/admin/orders" className="text-primary inline-flex items-center gap-1 text-xs font-medium hover:underline">
          View all <ArrowUpRight className="size-3" aria-hidden="true" />
        </Link>
      </div>

      {orders.length ? (
        <div className="divide-y">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{order.user.email}</p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {order.plan.name} · {dayjs(order.createdAt).format('MMM D')}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <p className="text-sm font-semibold tabular-nums">{formatCurrency(order.amountCents, order.currency)}</p>
                <OrderStatusBadge status={order.status} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-5 py-10 text-center">
          <p className="text-sm font-medium">No payment activity yet</p>
          <p className="text-muted-foreground mt-1 text-xs">Orders will appear here once customers check out.</p>
        </div>
      )}
    </section>
  )
}

function formatCurrency(amountCents: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format(amountCents / 100)
}
