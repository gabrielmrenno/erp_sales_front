import { useClient } from './axiosClient'

interface ISignInParams {
  username: string
  password: string
}

export interface ISignInReturn {
  idUser: string
  role: string
  resetPassword: boolean
  token: string
}

export async function signIn({ username, password }: ISignInParams): Promise<ISignInReturn> {
  const response = await useClient().get('/auth/login', {
    auth: {
      username,
      password
    }
  })

  const returnedData: ISignInReturn = {
    idUser: response.data.idUser,
    resetPassword: response.data.resetPassword,
    role: response.data.role,
    token: response.data.token
  }

  return returnedData
}
