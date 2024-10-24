import { sendAnalyticsEvent } from '@faststore/sdk'
import type { CurrencyCode, AddToCartEvent, UnknownEvent } from '@faststore/sdk'
import type { AnalyticsItem } from 'src/sdk/analytics/types'
import type { CartItem } from 'src/sdk/cart'
import { cartStore } from 'src/sdk/cart'

import type { Product, ProductFullVariantList } from '../typings/product'

export type AddToCart = {
  sku: Product | ProductFullVariantList[0]
  isVariantOf: Product['isVariantOf']
  brand: Product['brand']
  quantity: number
  timestamp: number
  currency?: CurrencyCode
}

export const addToCart = ({
  sku,
  isVariantOf,
  brand,
  quantity = 1,
  timestamp,
  currency = 'USD',
}: AddToCart) => {
  const {
    sku: skuID,
    gtin,
    name,
    image,
    additionalProperty,

    offers: {
      offers: [{ price, listPrice, seller }],
    },
  } = sku

  const item: Omit<CartItem, 'id'> = {
    price,
    listPrice,
    seller,
    quantity,
    priceWithTaxes: price,
    listPriceWithTaxes: listPrice,
    itemOffered: {
      sku: skuID,
      name,
      gtin,
      image,
      brand,
      isVariantOf,
      additionalProperty,
      unitMultiplier: null,
    },
  }

  cartStore.addItem(item)

  const params: AddToCartEvent<AnalyticsItem>['params'] = {
    currency,
    value: item.price * item.quantity,
    items: [
      {
        item_id: item.itemOffered.isVariantOf.productGroupID,
        item_name: item.itemOffered.isVariantOf.name,
        item_brand: item.itemOffered.brand.name,
        item_variant: item.itemOffered.sku,
        quantity: item.quantity,
        price: item.price,
        discount: item.listPrice - item.price,
        currency,
        item_variant_name: item.itemOffered.name,
        product_reference_id: item.itemOffered.gtin,
      },
    ],
  }

  sendAnalyticsEvent<AddToCartEvent<AnalyticsItem>>({
    name: 'add_to_cart',
    params,
  })

  sendAnalyticsEvent<UnknownEvent>({
    name: 'add_to_cart_enriched',
    params,
  })
}
