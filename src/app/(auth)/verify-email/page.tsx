import Link from 'next/link'
import prisma from '@/lib/prisma'
import { hashVerificationToken } from '@/lib/verification-token'

type VerifyEmailPageProps = {
  searchParams: Promise<{
    token?: string
  }>
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const { token } = await searchParams

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-2xl font-semibold">Invalid verification link</h2>
            <p className="">The verification token is missing.</p>
            <Link href="/" className="w-fit rounded-md bg-green-400 px-6 py-2.5 font-medium text-black transition-colors hover:bg-green-500">
              Return home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const tokenHash = hashVerificationToken(token)

  const verificationToken = await prisma.emailVerificationToken.findUnique({
    where: {
      tokenHash
    }
  })

  if (!verificationToken) {
    return (
      <div className="4 flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-2xl font-semibold">Invalid verification link</h2>
            <p className="">The verification token is invalid.</p>
            <Link href="/" className="w-fit rounded-md bg-green-400 px-6 py-2.5 font-medium text-black transition-colors hover:bg-green-500">
              Return home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (verificationToken.usedAt) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-2xl font-semibold">Verification link already used</h2>
            <p className="">The verification token has already been used.</p>
            <Link href="/login" className="w-fit rounded-md bg-green-400 px-6 py-2.5 font-medium text-black transition-colors hover:bg-green-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (verificationToken.expiresAt < new Date()) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-2xl font-semibold">Verification link expired</h2>
            <p className="">The verification token has expired.</p>
            <Link href="/" className="w-fit rounded-md bg-green-400 px-6 py-2.5 font-medium text-black transition-colors hover:bg-green-500">
              Return home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const verifiedAt = new Date()

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: verificationToken.userId
      },
      data: {
        emailVerifiedAt: verifiedAt
      }
    }),

    prisma.emailVerificationToken.update({
      where: {
        id: verificationToken.id
      },
      data: {
        usedAt: verifiedAt
      }
    })
  ])

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-2xl font-semibold">Email verified</h2>
          <p className="">Your email address has been successfully verified.</p>
          <Link href="/login" className="w-fit rounded-md bg-green-400 px-6 py-2.5 font-medium text-black transition-colors hover:bg-green-500">
            Go to login
          </Link>
        </div>
      </div>
    </div>
  )
}
