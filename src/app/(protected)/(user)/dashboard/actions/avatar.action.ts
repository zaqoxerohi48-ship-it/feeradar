'use server'

import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { revalidatePath } from 'next/cache'
import { ActionMessageResult } from '@/lib/action-result'
import prisma from '@/lib/prisma'
import { R2_BUCKET_NAME, R2_PUBLIC_URL, r2 } from '@/lib/r2'
import { requireUser } from '@/lib/requireAuthRoles'
import { avatarSchema } from '../schema/avatar'

export async function updateAvatar(formData: FormData): Promise<ActionMessageResult> {
  const user = await requireUser()

  const parsedData = avatarSchema.safeParse({
    avatar: formData.get('avatar')
  })

  if (!parsedData.success) {
    return {
      success: false,
      message: 'Please check the form fields and try again.'
    }
  }

  const avatar = parsedData.data.avatar

  const currentUser = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id
    },
    select: {
      avatarUrl: true
    }
  })

  const extensions: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
  }

  const extension = extensions[avatar.type]

  const key = `avatars/${user.id}/${crypto.randomUUID()}.${extension}`

  const buffer = Buffer.from(await avatar.arrayBuffer())

  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: avatar.type
    })
  )

  const avatarUrl = `${R2_PUBLIC_URL}/${key}`

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      avatarUrl
    }
  })

  if (currentUser.avatarUrl?.startsWith(R2_PUBLIC_URL)) {
    const oldKey = currentUser.avatarUrl.slice(R2_PUBLIC_URL.length).replace(/^\//, '')

    await r2.send(
      new DeleteObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: oldKey
      })
    )
  }

  revalidatePath('/dashboard')

  return {
    success: true,
    message: 'Avatar updated'
  }
}
