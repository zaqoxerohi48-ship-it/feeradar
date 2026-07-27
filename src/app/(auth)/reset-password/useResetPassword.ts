import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ResetPasswordFormValues, resetPasswordSchema } from './schema'

export const useResetPassword = () => {
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirm_password: ''
    }
  })

  const isSubmiting = form.formState.isSubmitting

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data)
  })

  return {
    form,
    onSubmit,
    isSubmiting
  }
}
