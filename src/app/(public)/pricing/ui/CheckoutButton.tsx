'use client'

import { Loader2 } from 'lucide-react'
import { useCreatePayment } from '../useCreatePayment'

type Props = {
  planId: number
}

export const CheckoutButton = ({ planId }: Props) => {
  const { createPayment, isPending } = useCreatePayment()

  return (
    <button
      onClick={() => createPayment(planId)}
      disabled={isPending}
      className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium shadow-xs transition-colors focus-visible:ring-3 focus-visible:outline-none disabled:opacity-70"
    >
      {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
      {isPending ? 'Redirecting…' : 'Purchase'}
    </button>
  )
}
