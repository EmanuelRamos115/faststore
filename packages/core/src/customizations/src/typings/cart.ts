import type { CartItem } from 'src/sdk/cart/index'

export type CartItemOption = {
  id: string
  quantity: number
  skuName: string
  listPrice: number
  sellingPrice: number
  seller: string
  parentItemIndex: number | null
  parentAssemblyBinding: string | null
}

export type CartItemOptions = {
  options?: CartItemOption[]
}

export type CustomCartItem = CartItem & CartItemOptions
