import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoginFormValues, loginFormSchema } from './schema'

export const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const submitLogin = form.handleSubmit(async (data) => {
    console.log(data)
  })

  return {
    form,
    submitLogin
  }
}
