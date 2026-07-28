import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { resetPassword } from './action'
import { ResetPasswordFormValues, resetPasswordSchema } from './schema'

export const useResetPassword = (token: string) => {
  const router = useRouter()

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirm_password: ''
    }
  })

  const isSubmiting = form.formState.isSubmitting

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await resetPassword(data, token)

    if (result.success) {
      toast.success(result.message)
      form.reset()
      router.replace('/login')
    } else {
      toast.error(result.message)
    }
  })

  return {
    form,
    onSubmit,
    isSubmiting
  }
}
