'use server'

import { signOut } from '@/auth'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/requireAuthRoles'
import { deleteAccountSchema } from './schema'

export async function deleteAccount(data: unknown) {
  const user = await requireUser()
  const parsedData = deleteAccountSchema.safeParse(data)

  if (!parsedData.success) {
    return {
      success: false,
      message: 'Type confirm to delete your account.'
    }
  }

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      isDeleted: true,
      isActive: false
    }
  })

  await signOut({
    redirectTo: '/'
  })
}
