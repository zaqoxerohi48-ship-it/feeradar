import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { updateProfile } from '../actions/profile.action'
import { ProfileFormValues, profileSchema } from '../schema/profile'

export const useProfileForm = (profile: ProfileFormValues) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile
  })

  const isSubmitting = form.formState.isSubmitting
  const isDirty = form.formState.isDirty

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await updateProfile(data)

    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  })

  return {
    form,
    onSubmit,
    isSubmitting,
    isDirty
  }
}
