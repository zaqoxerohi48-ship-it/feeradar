import { ArrowUpRight, BadgeCheck, CreditCard, ShieldCheck, TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import { dayjs } from '@/lib/dayjs'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/requireAuthRoles'
import AvatarForm from './ui/AvatarForm'
import ProfileForm from './ui/ProfileForm'

export default async function DashboardPage() {
  const user = await requireUser()
  const userProfile = await prisma.user.findUniqueOrThrow({
    where: { id: user.id },
    select: {
      username: true,
      email: true,
      dateBirth: true,
      avatarUrl: true,
      emailVerifiedAt: true,
      createdAt: true
    }
  })

  const profile = {
    username: userProfile.username ?? '',
    email: userProfile.email,
    date_of_birth: userProfile.dateBirth ? dayjs(userProfile.dateBirth).format('DD/MM/YYYY') : '',
    avatarUrl: userProfile.avatarUrl
  }
  const accountName = userProfile.username || userProfile.email

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-primary text-sm font-medium">Account</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your profile, account security, billing, and account access.</p>
      </div>

      <section aria-labelledby="profile-heading" className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div className="bg-card rounded-xl border p-5 shadow-sm sm:p-6">
          <AvatarForm avatarUrl={profile.avatarUrl} displayName={accountName} email={profile.email} />
        </div>
        <div className="bg-card rounded-xl border shadow-sm">
          <div className="border-b px-5 py-5 sm:px-6">
            <p className="text-primary text-xs font-semibold tracking-wide uppercase">Profile</p>
            <h2 id="profile-heading" className="mt-1 text-lg font-semibold">
              Personal information
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">Keep your profile details accurate and recognizable.</p>
          </div>
          <div className="p-5 sm:p-6">
            <ProfileForm profile={profile} isEmailVerified={Boolean(userProfile.emailVerifiedAt)} />
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <SettingsCard
          eyebrow="Security"
          title="Sign-in security"
          description="Your account email is verified and used for sign-in and important account messages."
          icon={ShieldCheck}
        >
          <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
            <BadgeCheck className="size-4" aria-hidden="true" />
            <span className="font-medium">Verified email</span>
          </div>
        </SettingsCard>
        <SettingsCard
          eyebrow="Billing"
          title={user.plan.name}
          description={`${formatPlanPrice(user.plan.priceCents)} · ${user.plan.code} plan`}
          icon={CreditCard}
        >
          <Link href="/billing" className="text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:underline">
            View billing and receipts <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </SettingsCard>
      </div>

      <section aria-labelledby="account-heading" className="bg-card border-destructive/25 rounded-xl border shadow-sm">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex gap-3">
            <span className="bg-destructive/10 text-destructive flex size-10 shrink-0 items-center justify-center rounded-lg">
              <TriangleAlert className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-destructive text-xs font-semibold tracking-wide uppercase">Account</p>
              <h2 id="account-heading" className="mt-1 text-base font-semibold">
                Delete this account
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Member since {dayjs(userProfile.createdAt).format('MMMM YYYY')}. Account deletion permanently disables sign-in.
              </p>
            </div>
          </div>
          <Link href="/delete" className="text-destructive shrink-0 text-sm font-medium hover:underline">
            Manage deletion
          </Link>
        </div>
      </section>
    </div>
  )
}

function SettingsCard({
  eyebrow,
  title,
  description,
  icon: Icon,
  children
}: {
  eyebrow: string
  title: string
  description: string
  icon: typeof ShieldCheck
  children: React.ReactNode
}) {
  return (
    <section className="bg-card rounded-xl border p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-primary text-xs font-semibold tracking-wide uppercase">{eyebrow}</p>
          <h2 className="mt-1 text-base font-semibold">{title}</h2>
          <p className="text-muted-foreground mt-1 text-sm leading-6">{description}</p>
          {children}
        </div>
      </div>
    </section>
  )
}

function formatPlanPrice(priceCents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceCents / 100)
}
