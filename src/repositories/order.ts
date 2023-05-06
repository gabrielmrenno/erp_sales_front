import type { ICreateOrderDTO, IUpdateOrderDTO } from '@/dtos/order'
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

export async function createOrderRequest(data: ICreateOrderDTO) {
  const response = await useClient().post('/orders', data)
  return response
}

export async function getOrderDetails(code: number) {
  const response = await useClient().get(`/orders/Order/${code}`)
  return response.data
}

export async function editOrder(data: IUpdateOrderDTO) {
  const response = await useClient().put(`/orders/${data.orderId}`, data)
  return response.data
}

export async function deleteOrder(code: number) {
  const response = await useClient().delete(`/orders/order/${code}`)
  return response.data
}
