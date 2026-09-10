'use client'

import { Eye, ReceiptText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { dayjs } from '@/lib/dayjs'
import { OrderStatusBadge } from './OrderStatusBadge'

type OrderDetailsSheetProps = {
  order: {
    id: number
    status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
    amountCents: number
    currency: string
    userId: string
    planId: number
    stripeCheckoutSessionId: string | null
    stripePaymentIntentId: string | null
    createdAt: Date
    paidAt: Date | null
    user: { email: string; username: string | null }
    plan: { name: string; code: string }
  }
}

export function OrderDetailsSheet({ order }: OrderDetailsSheetProps) {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="ghost" size="sm" aria-label={`View details for order ${order.id}`} />}>
        <Eye className="size-3.5" aria-hidden="true" />
        Details
      </SheetTrigger>
      <SheetContent className="w-full gap-0 overflow-y-auto sm:max-w-md">
        <SheetHeader className="border-b pr-12">
          <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-lg">
            <ReceiptText className="size-4" aria-hidden="true" />
          </div>
          <SheetTitle className="mt-3">Order #{order.id}</SheetTitle>
          <SheetDescription>Payment and Stripe reference details.</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 p-4">
          <section className="bg-muted/30 rounded-xl border p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Amount</p>
                <p className="mt-1 text-xl font-semibold tabular-nums">{formatCurrency(order.amountCents, order.currency)}</p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
          </section>
          <DetailSection title="Customer">
            <DetailItem label="Email" value={order.user.email} />
            <DetailItem label="Username" value={order.user.username ?? '—'} />
            <DetailItem label="Customer ID" value={order.userId} mono />
          </DetailSection>
          <DetailSection title="Order">
            <DetailItem label="Plan" value={`${order.plan.name} (${order.plan.code})`} />
            <DetailItem label="Plan ID" value={String(order.planId)} />
            <DetailItem label="Created" value={formatDate(order.createdAt)} />
            <DetailItem label="Paid" value={order.paidAt ? formatDate(order.paidAt) : '—'} />
          </DetailSection>
          <DetailSection title="Stripe references">
            <DetailItem label="Checkout session" value={order.stripeCheckoutSessionId ?? '—'} mono />
            <DetailItem label="Payment intent" value={order.stripePaymentIntentId ?? '—'} mono />
          </DetailSection>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-sm font-semibold">{title}</h3>
      <dl className="mt-2 divide-y rounded-xl border">{children}</dl>
    </section>
  )
}

function DetailItem({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="grid gap-1 px-3 py-2.5">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className={mono ? 'font-mono text-xs leading-5 break-all' : 'text-sm break-words'}>{value}</dd>
    </div>
  )
}

function formatCurrency(amountCents: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format(amountCents / 100)
}

function formatDate(date: Date) {
  return dayjs(date).format('MMM D, YYYY · h:mm A')
}
