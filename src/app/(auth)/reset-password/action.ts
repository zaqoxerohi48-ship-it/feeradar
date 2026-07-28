'use server'

import { hashPassword } from '@/lib/password'
import prisma from '@/lib/prisma'
import { limitResetPasswordByIp } from '@/lib/rate-limit'
import { hashVerificationToken } from '@/lib/verification-token'
import { resetPasswordSchema } from './schema'

export const resetPassword = async (data: unknown, token: string) => {
  const parsedData = resetPasswordSchema.safeParse(data)

  if (!parsedData.success) {
    return {
      success: false,
      message: 'Please check the form fields and try again.'
    }
  }

  const limit = await limitResetPasswordByIp()

  if (!limit.success) {
    return {
      success: false,
      message: 'Too many requests. Please try again later.'
    }
  }

  const tokenHash = hashVerificationToken(token)

  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: {
      tokenHash
    }
  })

  if (!passwordResetToken) {
    return {
      success: false,
      message: 'Invalid reset token'
    }
  }

  if (passwordResetToken.usedAt) {
    return {
      success: false,
      message: 'Password reset token has been used'
    }
  }

  if (passwordResetToken.expiresAt < new Date()) {
    return {
      success: false,
      message: 'Password reset token has expired'
    }
  }

  const passwordHash = await hashPassword(parsedData.data.password)

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: passwordResetToken.userId
      },
      data: {
        passwordHash
      }
    }),

    prisma.passwordResetToken.update({
      where: {
        id: passwordResetToken.id
      },
      data: {
        usedAt: new Date()
      }
    })
  ])

  return {
    success: true,
    message: 'Password reset successfully, please login.'
  }
}
