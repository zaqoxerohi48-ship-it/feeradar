import z from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.email().min(1, { message: 'Email is required' }).max(64, { message: 'Email is too long' })
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
