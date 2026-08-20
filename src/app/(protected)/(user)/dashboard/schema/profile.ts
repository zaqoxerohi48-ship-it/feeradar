import z from 'zod'
import { dateOfBirthSchema } from '@/lib/date-of-birth'

export const profileSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }).max(32, { message: 'Username is too long' }),
  email: z.email().min(1, { message: 'Email is required' }).max(64, { message: 'Email is too long' }),
  date_of_birth: dateOfBirthSchema
})

export type ProfileFormValues = z.infer<typeof profileSchema>
