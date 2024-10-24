import type {
  ClientManyProductsQueryQuery,
  ProductSummary_ProductFragment,
  ProductDetailsFragment_ProductFragment,
  ServerProductQueryQuery,
} from '@generated/graphql'

export type Product =
  | ServerProductQueryQuery['product']
  | ClientManyProductsQueryQueryProductEdges[0]['node']

export type ProductFullVariantList = Product['isVariantOf']['fullVariantList']

type Reviews = {
  description: string
}

type AddedCustomData = {
  festivals?: string[]
  sku?: string
  description?: string
  review?: {
    stars: number
    reviews: Reviews[]
  }
}

export type ProductSummary = {
  id: string
  slug: string
  name: string
  brand: string
  image: Array<{
    url: string
    alternateName: string
  }>
  description?: string
  prices: {
    lowPrice: number
    highPrice: number
  }
  isSheetMusic: boolean
  specifications: {
    subtitle?: string
    composer?: string
    composerCombined?: string
    arranger?: string
    artist?: string
    artistCombined?: string
    lyricist?: string
    pdpLayout: string
    supplierItemID?: string
    upc?: string
    isbn?: string
  }
  skuSpecifications: {
    copyrightYear?: string
    publishedLocation?: string
    imprintPublisher?: string
    copyrightCombined?: string
  }
  badges: {
    basicLibrary: boolean
    editorsChoice: boolean
    newProduct: boolean
    onSale: boolean
    notAvailable: boolean
    deliveryDelay: boolean
  }
  marketing?: ProductSpec[]
} & AddedCustomData

type ProductSummaryFragmentCustomizations = {
  releaseDate: string
  offers: {
    highPrice: number
  }
  additionalProperty: ProductSpec[]
  isVariantOf: {
    additionalProperty: ProductSpec[]
  }
}

type AdditionalProps = {
  releaseDate: string
  isVariantOf: {
    additionalProperty: ProductSpec[]
  }
}

export type ProductSummaryFragment = ProductSummary_ProductFragment &
  ProductSummaryFragmentCustomizations &
  AddedCustomData

export type ProductSummaryEdge = Array<{
  node: ProductSummaryFragment
}>

export type ProductSpec = {
  name: string
  value: string
  propertyID: string
  valueReference: string
}

export type ProductVariation = {
  alt: string
  label: string
  src: string
  value: string
}

export type ProductAvailableVariations = Partial<
  Record<string, ProductVariation[]>
>

export type ClientManyProductsQueryQueryProductEdges =
  ClientManyProductsQueryQuery['search']['products']['edges']

export type ProductLinkProps = {
  href: string
  onClick: () => void
  'data-testid': string
}

export type ProductDetails = ProductDetailsFragment_ProductFragment &
  AdditionalProps
