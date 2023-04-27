export interface ProductInfo {
  code: number
  name: string
  description: string
  group: string
  unit: 'SC' | 'FD'
  price: number
  weight: number
  active: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface ICreateProductInfo {
  code?: number
  name: string
  description: string
  group: string
  unit: 'FD' | 'SC'
  price: number
  weight: number
}

export interface IUpdateProductInfoDTO {
  name?: string
  group?: string
  price?: number
  weight?: number
  description?: string
  unit?: 'FD' | 'SC'
}
