import z from 'zod'

export const loginFormSchema = z.object({
  email: z.email().min(1, { message: 'Email is required' }).max(64, {
    message: 'Email is too long'
  }),
  password: z.string().min(8, { message: 'Password is required' }).max(32, {
    message: 'Password is too long'
  })
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
