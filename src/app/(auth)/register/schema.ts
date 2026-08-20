import z from 'zod'
import { dateOfBirthSchema } from '@/lib/date-of-birth'

export const registerSchema = z
  .object({
    username: z.string().min(1, { message: 'Username is required' }).max(32, { message: 'Username is too long' }),
    email: z.email().min(1, { message: 'Email is required' }).max(64, { message: 'Email is too long' }),
    date_of_birth: dateOfBirthSchema,
    password: z.string().min(8, { message: 'Password is required' }).max(32, { message: 'Password is too long' }),
    confirm_password: z.string().min(8, { message: 'Confirm password is required' }).max(32, { message: 'Password is too long' })
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password']
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
