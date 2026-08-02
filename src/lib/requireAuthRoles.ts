import { redirect } from 'next/navigation'
import 'server-only'
import { auth } from '@/auth'
import prisma from './prisma'

export async function getCurrentUser() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    },
    select: {
      id: true,
      role: true,
      plan: true
    }
  })

  return user
}

export type PublicUser = Awaited<ReturnType<typeof getCurrentUser>>

export async function requireAuth() {
  const user = await getCurrentUser()

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

  return user
}

export async function requireGuest() {
  const user = await getCurrentUser()

  if (!user) {
    return
  }

  if (user.role === 'ADMIN') {
    redirect('/admin')
  }

  redirect('/dashboard')
}
