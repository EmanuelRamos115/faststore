import { useMemo, useCallback } from 'react'
import type { ViewCartEvent, UnknownEvent, CurrencyCode } from '@faststore/sdk'
import { sendAnalyticsEvent } from '@faststore/sdk'
import { useCart } from 'src/sdk/cart'
import { useSession } from 'src/sdk/session'

export function useViewCartEvent() {
  const {
    currency: { code },
  } = useSession()

  const { items, gifts, total } = useCart()

  const sendViewCartEvent = useCallback(() => {
    const params: ViewCartEvent['params'] = {
      currency: code as CurrencyCode,
      value: total,
      items: items.concat(gifts).map((item) => ({
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
      sendAnalyticsEvent<ViewCartEvent>({
        name: 'view_cart',
        params,
      }),
      sendAnalyticsEvent<UnknownEvent>({
        name: 'view_cart_enriched',
        params,
      }),
    ]
  }, [code, gifts, items, total])

  return useMemo(() => ({ sendViewCartEvent }), [sendViewCartEvent])
}
