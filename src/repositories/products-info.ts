import { useClient } from './axiosClient'
import type { ProductInfo } from '@/dtos/products-info'

export async function getProductsInfoList(): Promise<ProductInfo[]> {
  const response = await useClient().get(`/products-info/all`)

  return response.data
}
