import { z } from 'zod'

export const deleteAccountSchema = z.object({
  confirmation: z.string().refine((value): boolean => value === 'confirm', {
    message: 'Type confirm to delete your account.'
  })
})

export type DeleteAccountFormValues = z.infer<typeof deleteAccountSchema>
