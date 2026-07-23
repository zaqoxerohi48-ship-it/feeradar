import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { registerUser } from './actions'
import { RegisterFormValues, registerSchema } from './schema'

export const useRegisterForm = () => {
  const router = useRouter()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: ''
    }
  })

  const onSubmitRegister = form.handleSubmit(async (data) => {
    try {
      const result = await registerUser(data)

      if (result.success) {
        toast.success(result.message)
        form.reset()
        router.replace('/login')
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong. Please try again.')
    }
  })

  const isSubmitting = form.formState.isSubmitting

  return {
    form,
    onSubmitRegister,
    isSubmitting
  }
}
