import z from 'zod'

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, { message: 'Password is required' }).max(32, { message: 'Password is too long' }),
    confirm_password: z.string().min(8, { message: 'Confirm password is required' }).max(32, { message: 'Password is too long' })
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password']
  })

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
