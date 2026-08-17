import { Order } from '@/generated/prisma/client'

type Props = {
  order: Order
}

export default function OrderCard({ order }: Props) {
  return (
    <div className="rounded-xl border p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold">Order #{order.id}</p>

          <p className="text-muted-foreground mt-1 text-sm">{order.createdAt.toLocaleString()}</p>
        </div>

        <span className={`rounded-full px-3 py-1 text-xs font-medium`}>{order.status}</span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-muted-foreground text-xs">Amount</p>

          <p className="mt-1 font-medium">
            {(order.amountCents / 100).toFixed(2)} {order.currency.toUpperCase()}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs">User</p>

          <p className="mt-1 font-medium">{order.userId}</p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs">Plan</p>

          <p className="mt-1 font-medium">#{order.planId}</p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs">Paid at</p>

          <p className="mt-1 font-medium">{order.paidAt ? order.paidAt.toLocaleString() : '—'}</p>
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="grid gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Checkout session: </span>

            <span className="break-all">{order.stripeCheckoutSessionId ?? '—'}</span>
          </div>

          <div>
            <span className="text-muted-foreground">Payment intent: </span>

            <span className="break-all">{order.stripePaymentIntentId ?? '—'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
