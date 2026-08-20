import { Order } from '@/generated/prisma/client'
import DownloadReceiptButton from './DownloadReceiptButton'

type PaymentCardProps = {
  order: Order
}

export default function PaymentCard({ order }: PaymentCardProps) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: order.currency.toUpperCase()
  }).format(order.amountCents / 100)

  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="grid gap-4 sm:grid-cols-3 sm:items-center">
        <div>
          <p className="text-muted-foreground text-xs">Date</p>
          <p className="mt-1 text-sm font-medium">{order.createdAt.toLocaleDateString()}</p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs">Amount</p>
          <p className="mt-1 text-sm font-medium">{formattedAmount}</p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs">Currency</p>
          <p className="mt-1 text-sm font-medium uppercase">{order.currency}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <span className="rounded-full border px-3 py-1 text-xs font-medium">{order.status}</span>

        <DownloadReceiptButton orderId={order.id} disabled={order.status !== 'PAID'} />
      </div>
    </div>
  )
}
