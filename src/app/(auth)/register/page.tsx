import Link from 'next/link'
import { requireGuest } from '@/lib/requireAuthRoles'
import { RegisterForm } from './RegisterForm'

export default async function RegisterPage() {
  await requireGuest()

  return (
    <div className="container flex justify-center px-4 py-10 md:pt-30">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <p className="text-3xl font-bold tracking-tight">Create your FeeWatch account</p>

          <p className="text-muted-foreground mt-2 text-sm">Save your favorite cards, compare fees, and receive important fee updates.</p>
        </div>

        <RegisterForm />

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
