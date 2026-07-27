import prisma from '@/lib/prisma'
import { hashVerificationToken } from '@/lib/verification-token'

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string
  }>
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams

  if (!token) {
    throw new Error('Token is missing')
  }

  const tokenHash = hashVerificationToken(token)

  const verificationToken = await prisma.passwordResetToken.findUnique({
    where: {
      tokenHash
    }
  })

  if (!verificationToken) {
    throw new Error('Token is invalid')
  }

  return (
    <div>
      <h1>Reset Password</h1>
    </div>
  )
}
