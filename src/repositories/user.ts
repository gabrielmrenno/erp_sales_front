import type { User, ICreateUser, IUpdateUser } from '@/dtos/user'
import { useClient } from './axiosClient'

interface IChangePasswordParams {
  password: string
}

export async function changePassword({ password }: IChangePasswordParams) {
  const response = await useClient().patch(`/users/user/update-password`, {
    password
  })

  return response.data
}

export async function getUserList(filter: 'active' | 'disabled'): Promise<User[]> {
  const active = filter === 'active' ? true : false
  const response = await useClient().get(`/users?active=${active}`)

  return response.data
}

export async function createUser({ name, role, username }: ICreateUser): Promise<User[]> {
  const response = await useClient().post(`/users`, { name, username, role })

  return response.data
}

export async function getUser(id: string): Promise<User> {
  const response = await useClient().get(`/users/user/${id}`)

  return response.data
}

export async function updateUser({ id, name, role }: IUpdateUser): Promise<User> {
  const response = await useClient().put(`/users/user/${id}`, { name, role })

  return response.data
}

export async function deleteUser(id: string) {
  const response = await useClient().delete(`/users/user/${id}`)

  return response
}

export async function resetUserPassword(id: string) {
  const response = await useClient().patch(`/users/user/${id}/reset-password`)

  return response
}
