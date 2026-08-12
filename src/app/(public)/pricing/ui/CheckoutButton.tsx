'use client'

import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { createCheckout } from '../action'

type Props = {
  planId: number
  isAuth: boolean
}

export const CheckoutButton = ({ planId, isAuth }: Props) => {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    if (isAuth) {
      startTransition(async () => {
        try {
          const url = await createCheckout(planId)
          window.location.href = url
        } catch (error) {
          toast.error('Something went wrong. Please try again.')
          console.log(error)
        }
      })
    } else {
      toast.error('You need to be logged in to purchase.')
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium shadow-xs transition-colors focus-visible:ring-3 focus-visible:outline-none disabled:opacity-70"
    >
      {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
      {isPending ? 'Redirecting…' : 'Purchase'}
    </button>
  )
}
