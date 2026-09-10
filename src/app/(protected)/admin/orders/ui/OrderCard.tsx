import type { Prisma } from '@/generated/prisma/client'
import { dayjs } from '@/lib/dayjs'
import { OrderDetailsSheet } from './OrderDetailsSheet'
import { OrderStatusBadge } from './OrderStatusBadge'

type OrderWithRelations = Prisma.OrderGetPayload<{
  include: {
    user: { select: { email: true; username: true } }
    plan: { select: { name: true; code: true } }
  }
}>

type OrderCardProps = {
  order: OrderWithRelations
  variant: 'table' | 'mobile'
}

export default function OrderCard({ order, variant }: OrderCardProps) {
  if (variant === 'table') {
    return (
      <tr className="border-b last:border-0">
        <td className="px-5 py-4 align-middle">
          <p className="font-medium">#{order.id}</p>
          <p className="text-muted-foreground mt-1 text-xs">{dayjs(order.createdAt).format('MMM D, YYYY')}</p>
        </td>
        <td className="max-w-56 px-5 py-4 align-middle">
          <p className="truncate font-medium">{order.user.email}</p>
          <p className="text-muted-foreground mt-1 truncate font-mono text-xs">{order.userId}</p>
        </td>
        <td className="px-5 py-4 align-middle">
          <p className="font-medium">{order.plan.name}</p>
          <p className="text-muted-foreground mt-1 text-xs">{order.plan.code}</p>
        </td>
        <td className="px-5 py-4 align-middle font-semibold tabular-nums">{formatCurrency(order.amountCents, order.currency)}</td>
        <td className="px-5 py-4 align-middle">
          <OrderStatusBadge status={order.status} />
        </td>
        <td className="px-5 py-4 text-right align-middle">
          <OrderDetailsSheet order={order} />
        </td>
      </tr>
    )
  }

  return (
    <article className="bg-card rounded-xl border p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold">Order #{order.id}</p>
          <p className="text-muted-foreground mt-1 text-xs">{dayjs(order.createdAt).format('MMM D, YYYY · h:mm A')}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 border-y py-4">
        <OrderField label="Customer" value={order.user.email} />
        <OrderField label="Plan" value={order.plan.name} />
        <OrderField label="Amount" value={formatCurrency(order.amountCents, order.currency)} strong />
        <OrderField label="Payment date" value={order.paidAt ? dayjs(order.paidAt).format('MMM D, YYYY') : 'Not paid'} />
      </div>
      <div className="mt-3 flex justify-end">
        <OrderDetailsSheet order={order} />
      </div>
    </article>
  )
}

function OrderField({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className={`mt-1 truncate text-sm ${strong ? 'font-semibold tabular-nums' : 'font-medium'}`}>{value}</p>
    </div>
  )
}

function formatCurrency(amountCents: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format(amountCents / 100)
}
