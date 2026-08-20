'use server'

import { parseDateOfBirth } from '@/lib/date-of-birth'
import { hashPassword } from '@/lib/password'
import prisma from '@/lib/prisma'
import { limitRegisterByIp } from '@/lib/rate-limit'
import { registerSchema } from './schema'
import { sendVerificationEmail } from './send-verification-email'

export const registerUser = async (data: unknown) => {
  const domainUrl = process.env.DOMAIN_URL
  const resendFromEmail = process.env.RESEND_FROM_EMAIL

  if (!resendFromEmail || !domainUrl) {
    throw new Error('RESEND_FROM_EMAIL or DOMAIN_URL is not defined')
  }

  const limit = await limitRegisterByIp()

  if (!limit.success) {
    return {
      success: false,
      message: 'Too many requests. Please try again later.'
    }
  }

  const parsedData = registerSchema.safeParse(data)

  if (!parsedData.success) {
    return {
      success: false,
      message: 'Please check the form fields and try again.'
    }
  }

  const email = parsedData.data.email.toLowerCase().trim()
  const passwordHash = await hashPassword(parsedData.data.password)
  const dateBirth = parseDateOfBirth(parsedData.data.date_of_birth)

  const existingUsername = await prisma.user.findUnique({
    where: {
      username: parsedData.data.username
    }
  })

  if (existingUsername) {
    return {
      success: false,
      message: 'An account with this username already exists.'
    }
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (existingUser) {
    if (existingUser.isDeleted) {
      return {
        success: false,
        message: 'If this email can be used, you’ll receive further instructions shortly.'
      }
    }

    if (existingUser.emailVerifiedAt) {
      return {
        success: false,
        message: 'If this email can be used, you’ll receive further instructions shortly.'
      }
    }

    const { tokenHash, expiresAt, error } = await sendVerificationEmail({ email, domainUrl, resendFromEmail })

    if (error) {
      console.error('Failed to send verification email:', error)

      return {
        success: false,
        message: 'Could not send verification email. Please try again.'
      }
    }

    await prisma.$transaction([
      prisma.emailVerificationToken.deleteMany({
        where: {
          userId: existingUser.id,
          usedAt: null
        }
      }),

      prisma.user.update({
        where: {
          id: existingUser.id
        },
        data: {
          passwordHash,
          verificationTokens: {
            create: {
              tokenHash,
              expiresAt
            }
          }
        }
      })
    ])

    return {
      success: true,
      message: 'Please check your email to verify your account.'
    }
  }

  const { tokenHash, expiresAt, error } = await sendVerificationEmail({ email, domainUrl, resendFromEmail })

  if (error) {
    console.error('Failed to send verification email:', error)

    return {
      success: false,
      message: 'Account created, but the verification email could not be sent.'
    }
  }

  await prisma.user.create({
    data: {
      username: parsedData.data.username,
      email,
      dateBirth,
      passwordHash,

      plan: {
        connect: {
          code: 'FREE'
        }
      },
      verificationTokens: {
        create: {
          tokenHash,
          expiresAt
        }
      }
    }
  })

  return {
    success: true,
    message: 'Please check your email to verify your account.'
  }
}
