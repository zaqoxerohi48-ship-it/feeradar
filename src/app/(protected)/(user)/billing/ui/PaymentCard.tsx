import { ReceiptText } from 'lucide-react'
import { Order } from '@/generated/prisma/client'
import { dayjs } from '@/lib/dayjs'
import DownloadReceiptButton from './DownloadReceiptButton'
import { PaymentStatusBadge } from './PaymentStatusBadge'

type PaymentCardProps = {
  order: Order
}

export default function PaymentCard({ order }: PaymentCardProps) {
  const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: order.currency.toUpperCase() }).format(
    order.amountCents / 100
  )

  return (
    <article className="bg-card rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
            <ReceiptText className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="font-semibold">Payment #{order.id}</p>
            <p className="text-muted-foreground mt-1 text-sm">Placed {dayjs(order.createdAt).format('MMM D, YYYY')}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <div className="text-right">
            <p className="font-semibold tabular-nums">{formattedAmount}</p>
            <p className="text-muted-foreground mt-1 text-xs uppercase">{order.currency}</p>
          </div>
          <PaymentStatusBadge status={order.status} />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-xs">
          {order.status === 'PAID'
            ? `Paid ${order.paidAt ? dayjs(order.paidAt).format('MMM D, YYYY') : ''}`
            : 'Receipts are available for paid payments.'}
        </p>
        <DownloadReceiptButton orderId={order.id} disabled={order.status !== 'PAID'} />
      </div>
    </article>
  )
}
