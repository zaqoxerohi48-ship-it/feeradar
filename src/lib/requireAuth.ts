import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import prisma from './prisma'

export async function requireAuth() {
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

export async function requireUser() {
  const user = await requireAuth()

  if (user.role !== 'USER') {
    redirect('/')
  }

  return user
}

export async function requireAdmin() {
  const user = await requireAuth()

  if (user.role !== 'ADMIN') {
    redirect('/')
  }
}

export async function requireGuest() {
  const user = await requireAuth()

  if (!user) return

  if (user.role !== 'ADMIN') {
    redirect('/')
  }

  redirect('/dashboard')
}
