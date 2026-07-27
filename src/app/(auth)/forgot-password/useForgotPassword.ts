import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { forgotPassword } from './actions'
import { ForgotPasswordFormValues, forgotPasswordSchema } from './schema'

export const useForgotPassword = () => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await forgotPassword(data)

    if (result.success) {
      toast.success(result.message)
      form.reset()
    } else {
      toast.error(result.message)
    }
  })

  const isSubmiting = form.formState.isSubmitting

  return {
    form,
    onSubmit,
    isSubmiting
  }
}
