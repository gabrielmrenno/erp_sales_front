import type { ICreateCustomerDTO, IUpdateCustomerDTO } from '@/dtos/customer'
import { useClient } from './axiosClient'
import qs from 'qs'

interface GetOrdersListRequest {
  code?: number
  page?: number
  initialInterval?: string // yyyy-mm-dd
  finalInterval?: string
}

export async function getOrdersList(queryParams: GetOrdersListRequest) {
  const queryString = qs.stringify(queryParams, { encode: false })
  console.log(queryString)
  const response = await useClient().get(`/orders/all?${queryString}`)
  return response.data.orders
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
