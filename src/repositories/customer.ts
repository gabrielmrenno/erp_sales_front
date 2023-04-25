import type { ICreateCustomerDTO, IUpdateCustomerDTO } from '@/dtos/customer'
import { useClient } from './axiosClient'

export async function getCustomersList(filter?: string, filterType?: string) {
  if (!filter) {
    const response = await useClient().get('/customers/all')
    return response.data
  }

  if (filterType === 'Código') {
    const codeFilter = Number(filter)
    const response = await useClient().get(`/customers/all?numberQuery=${codeFilter}`)
    return response.data
  }

  const response = await useClient().get(`/customers/all?stringQuery=${filter}`)
  return response.data
}

export async function getInfoByCNPJRequest(doc: string) {
  const response = await useClient().get(`/customers/getInfo/${doc}`)
  return response.data
}

export async function createCustomerRequest(data: ICreateCustomerDTO) {
  const response = await useClient().post('/customers', data)
  return response
}

export async function getCustomerDetails(code: number) {
  const response = await useClient().get(`/customers/customer/${code}`)
  return response.data
}

export async function editCustomer(data: IUpdateCustomerDTO) {
  const response = await useClient().put(`/customers/${data.code}`, data)
  return response.data
}

export async function deleteCustomer(code: number) {
  const response = await useClient().delete(`/customers/${code}`)
  return response.data
}
