import z from 'zod'

export const registerSchema = z
  .object({
    email: z.email().min(1, { message: 'Email is required' }).max(64, { message: 'Email is too long' }),
    password: z.string().min(8, { message: 'Password is required' }).max(32, { message: 'Password is too long' }),
    confirm_password: z.string().min(8, { message: 'Confirm password is required' }).max(32, { message: 'Password is too long' })
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password']
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
