import Link from 'next/link'
import { ForgotPasswordForm } from './ForgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <div className="container flex justify-center px-4 py-10 md:pt-30">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <p className="text-3xl font-bold tracking-tight">Forgot your password?</p>

          <p className="text-muted-foreground mt-2 text-sm">Enter your email address and we&apos;ll send you a link to reset your password.</p>
        </div>

        <ForgotPasswordForm />

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Remember your password?{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
