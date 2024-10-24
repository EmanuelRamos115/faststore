import { useMemo, useCallback } from 'react'
import type {
  CurrencyCode,
  BeginCheckoutEvent,
  UnknownEvent,
} from '@faststore/sdk'
import { sendAnalyticsEvent } from '@faststore/sdk'
import type { CartItem } from 'src/sdk/cart'
import { useSession } from 'src/sdk/session'
import type { AnalyticsItem } from 'src/sdk/analytics/types'

export function useBeginCheckoutEvent() {
  const {
    currency: { code },
  } = useSession()

  const sendBeginCheckoutEvent = useCallback((items: CartItem[]) => {
    const value = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )

    const params: BeginCheckoutEvent<AnalyticsItem>['params'] = {
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
      sendAnalyticsEvent<BeginCheckoutEvent<AnalyticsItem>>({
        name: 'begin_checkout',
        params,
      }),
      sendAnalyticsEvent<UnknownEvent>({
        name: 'begin_checkout_enriched',
        params,
      }),
    ]
  }, [])

  return useMemo(() => ({ sendBeginCheckoutEvent }), [sendBeginCheckoutEvent])
}
