import { ArrowUpRight, UserRound } from 'lucide-react'
import Link from 'next/link'
import { dayjs } from '@/lib/dayjs'

type RecentUsersProps = {
  users: Array<{
    id: string
    email: string
    createdAt: Date
  }>
}

export function RecentUsers({ users }: RecentUsersProps) {
  return (
    <section className="bg-card overflow-hidden rounded-xl border shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-4 sm:px-5">
        <div>
          <h2 className="text-base font-semibold">New customers</h2>
          <p className="text-muted-foreground mt-0.5 text-xs">Most recently registered accounts</p>
        </div>
        <Link href="/admin/all-users" className="text-primary inline-flex items-center gap-1 text-xs font-medium hover:underline">
          View users <ArrowUpRight className="size-3" aria-hidden="true" />
        </Link>
      </div>

      {users.length ? (
        <div className="grid divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
          {users.map((user) => (
            <div key={user.id} className="flex min-w-0 items-center gap-3 px-4 py-3.5 sm:px-5">
              <span className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full">
                <UserRound className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{user.email}</p>
                <p className="text-muted-foreground mt-0.5 text-xs">Joined {dayjs(user.createdAt).format('MMM D, YYYY')}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-5 py-10 text-center">
          <p className="text-sm font-medium">No customers yet</p>
          <p className="text-muted-foreground mt-1 text-xs">New registrations will be listed here.</p>
        </div>
      )}
    </section>
  )
}
