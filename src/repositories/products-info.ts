import { useClient } from './axiosClient'
import type { ICreateProductInfo, IUpdateProductInfoDTO, ProductInfo } from '@/dtos/products-info'

export async function getProductsInfoList(): Promise<ProductInfo[]> {
  const response = await useClient().get(`/products-info/all`)

  return response.data
}

export async function createProductInfo(data: ICreateProductInfo): Promise<ProductInfo[]> {
  const response = await useClient().post(`/products-info`, data)

  return response.data
}

export async function getProductInfoDetails(id: number): Promise<ProductInfo> {
  const response = await useClient().get(`/products-info/${id}`)

  return response.data
}

export async function updateProductInfo(data: IUpdateProductInfoDTO): Promise<ProductInfo> {
  const response = await useClient().put(`/products-info/${data.code}`, data)

  return response.data
}

export async function deleteProductInfo(id: number): Promise<ProductInfo> {
  const response = await useClient().delete(`/products-info/${id}`)

  return response.data
}
