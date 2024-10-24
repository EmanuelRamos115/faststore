import { useMemo, useCallback } from 'react'
import type {
  CurrencyCode,
  AddToWishlistEvent,
  UnknownEvent,
} from '@faststore/sdk'
import { sendAnalyticsEvent } from '@faststore/sdk'
import { useSession } from 'src/sdk/session'
import type { CartItem } from 'src/sdk/cart'

type Item = {
  itemOffered: {
    isVariantOf: {
      productGroupID: CartItem['itemOffered']['isVariantOf']['productGroupID']
      name: CartItem['itemOffered']['isVariantOf']['name']
    }
    brand: {
      name: CartItem['itemOffered']['brand']['name']
    }
    sku: CartItem['itemOffered']['sku']
    name: CartItem['itemOffered']['name']
    gtin: CartItem['itemOffered']['gtin']
  }
  quantity: CartItem['quantity']
  price: CartItem['price']
  listPrice: CartItem['listPrice']
}

export function useAddToWishlistEvent() {
  const {
    currency: { code },
  } = useSession()

  const sendAddToWishlistEvent = useCallback((items: Item[]) => {
    const value = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )

    const params: AddToWishlistEvent['params'] = {
      currency: code as CurrencyCode,
      value,
      items: items.map((item) => ({
        item_id: item.itemOffered.isVariantOf.productGroupID,
        item_name: item.itemOffered.isVariantOf.name,
        item_brand: item.itemOffered.brand.name,
        item_variant: item.itemOffered.sku,
        quantity: item.quantity,
        price: item.price,
        discount: item.listPrice - item.price,
        currency: code as CurrencyCode,
        item_variant_name: item.itemOffered.name,
        product_reference_id: item.itemOffered.gtin,
      })),
    }

    return [
      sendAnalyticsEvent<AddToWishlistEvent>({
        name: 'add_to_wishlist',
        params,
      }),
      sendAnalyticsEvent<UnknownEvent>({
        name: 'add_to_wishlist_enriched',
        params,
      }),
    ]
  }, [])

  return useMemo(() => ({ sendAddToWishlistEvent }), [sendAddToWishlistEvent])
}
