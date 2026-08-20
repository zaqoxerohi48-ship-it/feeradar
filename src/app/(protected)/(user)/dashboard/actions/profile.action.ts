'use server'

import { ActionMessageResult } from '@/lib/action-result'
import { parseDateOfBirth } from '@/lib/date-of-birth'
import prisma from '@/lib/prisma'
import { requireUser } from '@/lib/requireAuthRoles'
import { profileSchema } from '../schema/profile'

export async function updateProfile(data: unknown): Promise<ActionMessageResult> {
  const user = await requireUser()

  const parsedData = profileSchema.safeParse(data)

  if (!parsedData.success) {
    return {
      success: false,
      message: 'Please check the form fields and try again.'
    }
  }

  const availableUsername = parsedData.data.username.trim().toLowerCase()
  const dateBirth = parseDateOfBirth(parsedData.data.date_of_birth)

  const usernameExists = await prisma.user.findUnique({
    where: {
      username: availableUsername
    }
  })

  if (usernameExists && usernameExists.id !== user.id) {
    return {
      success: false,
      message: 'Username already exists'
    }
  }

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      username: availableUsername,
      dateBirth
    }
  })

  return {
    success: true,
    message: 'Profile updated successfully'
  }
}
