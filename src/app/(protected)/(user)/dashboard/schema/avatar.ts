import z from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const avatarSchema = z.object({
  avatar: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: 'Image must be smaller than 5 MB'
    })
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      message: 'Only JPG, PNG and WebP images are allowed'
    })
})

export type AvatarFormValues = z.infer<typeof avatarSchema>
