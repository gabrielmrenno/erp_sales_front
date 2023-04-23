import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ISignInReturn } from './auth'

let backClient: AxiosInstance

export function setupClient(url: string) {
  backClient = axios.create({ baseURL: url })
}

export function setBearerAuthorization(token: string) {
  backClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function setLocalStorage(data: ISignInReturn) {
  localStorage.setItem('user', JSON.stringify(data))
}

export function getLocalStorage(): ISignInReturn {
  const localStorageData = JSON.parse(localStorage.getItem('user') || '{}')
  return localStorageData
}

export function useClient() {
  return backClient
}
