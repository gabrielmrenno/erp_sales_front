export interface User {
  id: string
  name: string
  username: string
  password: string
  role: string
  active: boolean
  isAdmin: boolean
  resetPassword: boolean
  createdAt: string
  updatedAt: Date
  deletedAt: Date | null
}
