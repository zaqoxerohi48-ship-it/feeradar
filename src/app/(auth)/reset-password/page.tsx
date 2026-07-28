import Link from 'next/link'
import prisma from '@/lib/prisma'
import { requireGuest } from '@/lib/requireAuth'
import { hashVerificationToken } from '@/lib/verification-token'
import { ResetPasswordForm } from './ResetPasswordForm'

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string
  }>
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams
  await requireGuest()

  if (!token) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div>
            <p className="text-3xl font-bold tracking-tight">Invalid reset link</p>

            <p className="text-muted-foreground mt-2 text-sm">This password reset link is invalid. Please request a new one.</p>
          </div>

          <Link
            href="/forgot-password"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    )
  }

  const tokenHash = hashVerificationToken(token)

  const verificationToken = await prisma.passwordResetToken.findUnique({
    where: {
      tokenHash
    }
  })

  if (!verificationToken) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div>
            <p className="text-3xl font-bold tracking-tight">Invalid reset link</p>

            <p className="text-muted-foreground mt-2 text-sm">This password reset link is invalid. Please request a new one.</p>
          </div>

          <Link
            href="/forgot-password"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    )
  }

  if (verificationToken.usedAt) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div>
            <p className="text-3xl font-bold tracking-tight">Reset link already used</p>

            <p className="text-muted-foreground mt-2 text-sm">This password reset link has already been used. Please request a new one.</p>
          </div>

          <Link
            href="/forgot-password"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    )
  }

  if (verificationToken.expiresAt < new Date()) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div>
            <p className="text-3xl font-bold tracking-tight">Reset link expired</p>

            <p className="text-muted-foreground mt-2 text-sm">This password reset link has expired. Please request a new one.</p>
          </div>

          <Link
            href="/forgot-password"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <p className="text-3xl font-bold tracking-tight">Reset Password</p>

          <p className="text-muted-foreground mt-2 text-sm">Enter your new password below.</p>
        </div>

        <ResetPasswordForm token={token} />
      </div>
    </div>
  )
}
