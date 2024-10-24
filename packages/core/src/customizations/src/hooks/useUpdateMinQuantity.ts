import { useEffect, useCallback } from 'react'
import type { CartItem } from 'src/sdk/cart'
import { useCart, cartStore } from 'src/sdk/cart'
import { useUI } from '@faststore/ui'

import { useCartItemEvent } from './useCartItemEvent'
import { getSpec } from '../utils/productData'

export const useUpdateMinQuantity = () => {
  const { items } = useCart()
  const { sendCartItemEvent } = useCartItemEvent()
  const { pushToast } = useUI()

  const onQuantityChange = useCallback(
    (item: CartItem, qty: number) => {
      sendCartItemEvent(item, qty)
      cartStore.updateItemQuantity(item.id, qty)
    },
    [sendCartItemEvent]
  )

  useEffect(() => {
    const itemWithQuantityChange: string[] = []

    items.forEach((item: CartItem) => {
      const minimumQuantity = Number(
        getSpec(item.itemOffered.additionalProperty, 'Minimum Sell Quantity') ??
          1
      )

      if (item.quantity < minimumQuantity) {
        onQuantityChange(item, minimumQuantity)
        itemWithQuantityChange.push(item.itemOffered.name)
      }
    })

    if (itemWithQuantityChange.length > 0) {
      const itemNames = itemWithQuantityChange?.join(', ')

      pushToast({
        message: `Product quantities have been changed in ${itemNames} to meet the minimum required quantity.`,
        status: 'INFO',
      })
    }
  }, [items, onQuantityChange])
}
