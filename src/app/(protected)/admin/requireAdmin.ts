import { redirect } from 'next/navigation'
import { requireUser } from '../(user)/requireUser'

export async function requireAdmin() {
  const user = await requireUser()

  if (user.role !== 'ADMIN') {
    redirect('/')
  }

  return user
}
