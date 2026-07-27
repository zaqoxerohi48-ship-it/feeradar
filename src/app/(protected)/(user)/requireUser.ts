import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function requireUser() {
  const session = await auth()

  if (!session?.user.id) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    },
    select: {
      id: true,
      role: true
    }
  })

  if (!user) {
    redirect('/login')
  }

  return user
}
