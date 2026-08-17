import { redirect } from 'next/navigation'
import { Prisma } from '@/generated/prisma/client'
import { getPagination } from '@/lib/pagination'
import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/requireAuthRoles'
import NuqsPagination from '@/shared/ui/NuqsPagination'
import { SearchInput } from '@/shared/ui/SearchInput'
import UserCard from './ui/UserCard'

type Props = {
  searchParams: Promise<{ page?: string; search?: string }>
}

export default async function AllUsersPage({ searchParams }: Props) {
  await requireAdmin()

  const { page: pageParam, search: searchParam } = await searchParams

  const search = searchParam?.trim()

  const where: Prisma.UserWhereInput | undefined = search
    ? {
        email: {
          contains: search,
          mode: 'insensitive'
        }
      }
    : undefined

  const totalUsers = await prisma.user.count({ where })

  const { page, totalPages, skip, take } = getPagination({ pageParam, totalItems: totalUsers, pageSize: 5 })

  if (totalPages > 0 && page > totalPages) {
    const params = new URLSearchParams({
      page: String(totalPages)
    })

    if (search) {
      params.set('search', search)
    }

    redirect(`/admin/edit-users?${params.toString()}`)
  }

  const users = await prisma.user.findMany({
    where,
    include: {
      _count: {
        select: {
          orders: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    skip,
    take
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-semibold">Users</p>
        <p className="text-muted-foreground text-sm">View and manage users.</p>
      </div>

      <SearchInput placeholder="Search by email..." />

      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <NuqsPagination totalPages={totalPages} />
    </div>
  )
}
