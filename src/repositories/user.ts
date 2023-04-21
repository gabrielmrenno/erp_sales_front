import type { User } from '@/dtos/user'
import { useClient } from './axiosClient'

interface IChangePasswordParams {
  id: string
  password: string
}

export async function changePassword({ password, id }: IChangePasswordParams) {
  const response = await useClient().patch(`/users/user/${id}/update-password`, {
    password
  })

  return response.data
}

export async function getUserList(filter: 'active' | 'disabled'): Promise<User[]> {
  const active = filter === 'active' ? true : false
  const response = await useClient().get(`/users?active=${active}`)

  return response.data
}
