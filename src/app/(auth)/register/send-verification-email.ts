import VerifyEmail from '@emails/VerifyEmail'
import { createElement } from 'react'
import { resend } from '@/lib/resend'
import { createVerificationToken } from '@/lib/verification-token'

type SendVerificationEmailParams = {
  email: string
  domainUrl: string
  resendFromEmail: string
}

export const sendVerificationEmail = async ({ email, domainUrl, resendFromEmail }: SendVerificationEmailParams) => {
  const { token, tokenHash, expiresAt } = createVerificationToken()

  const verificationUrl = `${domainUrl}/verify-email?token=${token}`

  const { error } = await resend.emails.send({
    from: resendFromEmail,
    to: email,
    subject: 'Verify your FeeRadar account',
    react: createElement(VerifyEmail, {
      verificationUrl
    })
  })

  return { tokenHash, expiresAt, error }
}
