'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/auth'
import { limitLoginByIp } from '@/lib/rate-limit'
import { loginFormSchema } from './schema'

const getAuthErrorCode = (error: AuthError) => {
  const errorWithCode = error as AuthError & { code?: string; cause?: { err?: { code?: string } } }
  return errorWithCode.code ?? errorWithCode.cause?.err?.code
}

export const loginUser = async (data: unknown) => {
  const parsedData = loginFormSchema.safeParse(data)

  if (!parsedData.success) {
    return {
      success: false,
      message: 'Please check the form fields and try again.'
    }
  }

  const limit = await limitLoginByIp()

  if (!limit.success) {
    return {
      success: false,
      message: 'Too many requests. Please try again later.'
    }
  }

  try {
    await signIn('credentials', {
      email: parsedData.data.email,
      password: parsedData.data.password,
      redirect: false
    })

    return {
      success: true,
      message: 'Logged in successfully.'
    }
  } catch (error) {
    if (error instanceof AuthError) {
      const code = getAuthErrorCode(error)

      if (code === 'email-not-verified') {
        return {
          success: false,
          message: 'Please verify your email before signing in.'
        }
      }

      return {
        success: false,
        message: 'Invalid email or password.'
      }
    }

    throw error
  }
}
