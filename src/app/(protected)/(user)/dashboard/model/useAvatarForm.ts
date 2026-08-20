import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { updateAvatar } from '../actions/avatar.action'
import { AvatarFormValues, avatarSchema } from '../schema/avatar'

export const useAvatarForm = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const form = useForm<AvatarFormValues>({
    resolver: zodResolver(avatarSchema)
  })

  const isSubmitting = form.formState.isSubmitting
  const isDirty = form.formState.isDirty

  const avatar = useWatch({
    control: form.control,
    name: 'avatar'
  })

  const setAvatar = (file: File) => {
    form.setValue('avatar', file, {
      shouldValidate: true,
      shouldDirty: true
    })

    setPreviewUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current)
      }

      return URL.createObjectURL(file)
    })
  }

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData()

    formData.append('avatar', data.avatar)

    const result = await updateAvatar(formData)

    if (result.success) {
      form.reset()
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  })

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return {
    form,
    onSubmit,
    isSubmitting,
    hasSelectedAvatar: Boolean(avatar),
    previewUrl,
    setAvatar,
    isDirty
  }
}
