import { dayjs } from '@/lib/dayjs'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/requireAuthRoles'
import AvatarForm from './ui/AvatarForm'
import ProfileForm from './ui/ProfileForm'

export default async function DashboardPage() {
  const user = await requireUser()

  const userProfile = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id
    },
    select: {
      username: true,
      email: true,
      dateBirth: true,
      avatarUrl: true
    }
  })

  const profile = {
    username: userProfile.username,
    email: userProfile.email,
    date_of_birth: dayjs(userProfile.dateBirth).format('DD/MM/YYYY'),
    avatarUrl: userProfile.avatarUrl
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="max-w-3xl space-y-2">
        <p className="text-3xl font-semibold tracking-normal">Profile settings</p>
        <p className="text-muted-foreground text-sm leading-6">
          Keep your account details up to date. Your email is used for sign in and account notifications.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="rounded-lg border bg-white p-6">
          <AvatarForm avatarUrl={profile.avatarUrl} />
        </div>

        <div className="rounded-lg border bg-white p-6">
          <div className="mb-6 space-y-1">
            <p className="text-lg font-medium">Personal information</p>
            <p className="text-muted-foreground text-sm">These details help us personalize your FeeWatch account.</p>
          </div>

          <ProfileForm profile={profile} />
        </div>
      </div>
    </div>
  )
}
