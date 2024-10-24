import type { Inventory } from '@generated/graphql'

import type { ProductSpec } from './product'

export type DeliveryMethod = 'Ships' | 'ePrint' | 'New' | 'Digital Download'

export type SkuDetails = {
  isbn?: string
  sku?: string
  supplierId?: string
  upc?: string
}

export type SkuDetailsFormatted = {
  refId: string
  skuName: string
  supplierId?: string
}

export type SkuPreviews = {
  audio: boolean
  range: boolean
  score: boolean
  video: boolean
}

export type SkuQuantity = {
  extraPartsAvailable?: boolean
  flag?: string
  minimum?: string
}

export type SkuOffer = {
  availability: string
  price: number
  priceCurrency: string
  priceValidUntil: string
  seller: {
    identifier: string
  }
}

export type SkuDelivery = {
  flag?: string
  method: DeliveryMethod[] | string[]
}

export type SkuFormatted = {
  delivery: SkuDelivery
  description: string
  details: SkuDetails
  isSelected?: boolean
  level?: string
  msrp?: number
  previews: SkuPreviews
  price: number
  quantity?: SkuQuantity
  releaseDate?: string
}

export type SkuImage = {
  alternateName: string
  url: string
}

export type SkuData = {
  additionalProperty: ProductSpec[]
  gtin: string
  image: SkuImage[]
  name: string
  offers: {
    lowPrice?: number
    offers: SkuOffer[]
  }
  productID: string
  inventory: Inventory[]
}

export type Availability = {
  availability_message: string
  short_message: string
}

export type PreviewModalProps = {
  productTitle: string
  skuDetails: SkuDetailsFormatted
}
