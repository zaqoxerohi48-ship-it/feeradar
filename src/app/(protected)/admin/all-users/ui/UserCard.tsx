import type { Prisma } from '@/generated/prisma/client'
import { dayjs } from '@/lib/dayjs'

type UserWithOrdersCount = Prisma.UserGetPayload<{
  include: {
    _count: {
      select: {
        orders: true
      }
    }
  }
}>

type Props = {
  user: UserWithOrdersCount
}

export default function UserCard({ user }: Props) {
  const isVerified = Boolean(user.emailVerifiedAt)

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-col gap-1">
        <p className="truncate font-medium">{user.email}</p>

        <p className="text-muted-foreground text-sm">{isVerified ? 'Verified' : 'Not verified'}</p>
      </div>

      <div className="flex items-center justify-between gap-4 text-sm sm:justify-start sm:gap-6">
        <p className="shrink-0">
          Orders: <span className="font-medium">{user._count.orders}</span>
        </p>

        <p className="text-muted-foreground shrink-0">{dayjs(user.createdAt).format('DD-MM-YYYY')}</p>
      </div>
    </div>
  )
}
