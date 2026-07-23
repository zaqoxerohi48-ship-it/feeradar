import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { loginUser } from './actions'
import { LoginFormValues, loginFormSchema } from './schema'

export const useLoginForm = () => {
  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const submitLogin = form.handleSubmit(async (data) => {
    const result = await loginUser(data)

    if (result.success) {
      toast.success(result.message)
      router.replace('/dashboard')
      router.refresh()
      return
    }

    toast.error(result.message)
  })

  const isSubmitting = form.formState.isSubmitting

  return {
    form,
    submitLogin,
    isSubmitting
  }
}
