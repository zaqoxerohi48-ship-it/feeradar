'use server'

import ResetPasswordEmail from '@emails/ResetPasswordEmail'
import { createElement } from 'react'
import prisma from '@/lib/prisma'
import { limitForgotPasswordByIp } from '@/lib/rate-limit'
import { resend } from '@/lib/resend'
import { createVerificationToken } from '@/lib/verification-token'
import { forgotPasswordSchema } from './schema'

export async function forgotPassword(data: unknown) {
  const domainUrl = process.env.DOMAIN_URL
  const resendFromEmail = process.env.RESEND_FROM_EMAIL

  if (!resendFromEmail || !domainUrl) {
    throw new Error('RESEND_FROM_EMAIL or DOMAIN_URL is not defined')
  }

  const parsedData = forgotPasswordSchema.safeParse(data)

  if (!parsedData.success) {
    return {
      success: false,
      message: 'Please check the form fields and try again.'
    }
  }

  const limit = await limitForgotPasswordByIp()

  if (!limit.success) {
    return {
      success: false,
      message: 'Too many requests. Please try again later.'
    }
  }

  const email = parsedData.data.email.toLowerCase().trim()

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user || user.emailVerifiedAt === null) {
    return {
      success: true,
      message: 'If you have an account with us, we will send you an email to reset your password.'
    }
  }

  const { token, tokenHash, expiresAt } = createVerificationToken()

  await prisma.passwordResetToken.create({
    data: {
      tokenHash,
      expiresAt,
      userId: user.id
    }
  })

  const verificationUrl = `${domainUrl}/reset-password?token=${token}`

  const { error } = await resend.emails.send({
    from: resendFromEmail,
    to: email,
    subject: 'Reset your FeeWatch password',
    react: createElement(ResetPasswordEmail, {
      verificationUrl
    })
  })

  if (error) {
    await prisma.passwordResetToken.delete({
      where: {
        tokenHash
      }
    })

    return {
      success: false,
      message: 'If you have an account with us, we will send you an email to reset your password.'
    }
  }

  return {
    success: true,
    message: 'If you have an account with us, we will send you an email to reset your password.'
  }
}
