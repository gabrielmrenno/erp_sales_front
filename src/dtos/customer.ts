export interface Customer {
  code?: number
  name: string

  fantasyName: string
  doc: string

  email: string
  phone: string
  contactName: string

  address: string
  city: string
  zipCode: string

  discount: number
  paymentTerm: number
  
  active: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export interface ICreateCustomerDTO {
  code?: number

  name: string
  fantasyName: string
  doc: string
  email: string
  address: string
  city: string
  zipCode: string

  phone: string
  contactName: string

  discount: number
  paymentTerm: number
}

export interface IUpdateCustomerDTO {
  code: number

  name: string
  fantasyName: string
  doc: string
  address: string
  city: string
  zipCode: string
  email: string

  phone: string
  contactName: string

  discount: number
  paymentTerm: number
}
