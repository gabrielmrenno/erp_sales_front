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

interface OrderedProducts {
  orderId: number
  productInfoCode: number
  amount: number
  productPrice: number
  productWeight: number
}

export interface ICompleteOrder extends Order {
  OrderedProducts: OrderedProducts[]
  customer: Customer
  totalOrderValue: number
  totalOrderWeight: number
}
