import type { Customer } from './customer'

interface Order {
  id: number
  deliveryDate: Date | null
  customerCode: number
  userId: string
  paymentStatus: string
  paymentDate: Date | null
  active: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface OrderedProducts {
  orderId: number
  productInfoCode: number
  amount: number
  productPrice: number
  productWeight: number
}

export interface UpdateOrderedProducts {
  amount: number
  productInfoCode: number
}

export interface OrderedProductsGetOrder {
  orderId: number
  productInfoCode: number
  amount: number
  productPrice: number
  productWeight: number
  Product: Product
}

export interface Product {
  amount: number
  createdAt: Date
  id: string
  productBatch: string
  productInfoCode: number
}

export interface ICompleteOrder extends Order {
  OrderedProducts: OrderedProducts[]
  customer: Customer
  totalOrderValue: number
  totalOrderWeight: number
}

interface CreateOrderedProducts {
  amount: number
  productInfoCode: number
}

export interface ICreateOrderDTO {
  items: CreateOrderedProducts[]
  customerCode: number
  userId: string
}

export interface IUpdateOrderDTO {
  orderId: number

  deliveryDate: Date | null
  customerCode: number
  userId: string
  paymentStatus: string
  paymentDate: Date | null

  items: UpdateOrderedProducts[]
}
