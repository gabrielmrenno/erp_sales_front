import { getLocalStorage } from '@/repositories/axiosClient'

export function hasPermission(permissions: string[]) {
  const { role } = getLocalStorage()
  return permissions.includes(role)
}
