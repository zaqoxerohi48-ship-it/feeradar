'use client'

import { toast } from 'sonner'
import { useTransition } from 'react'
import { createCheckout } from './action'

export const useCreatePayment = () => {
  const [isPending, startTransition] = useTransition()

  const createPayment = (planId: number) => {
    startTransition(async () => {
      try {
        const result = await createCheckout(planId)

        if (result.success) {
          window.location.href = result.data.url
          return
        }

        toast.error(result.message)
      } catch (error) {
        toast.error('Something went wrong. Please try again.')
        console.log(error)
      }
    })
  }

  return {
    createPayment,
    isPending
  }
}
