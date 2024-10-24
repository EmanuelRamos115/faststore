import type { ClientManyProductsQueryQuery } from '@generated/graphql'

export type Wishlist = {
  id: string | null
  email: string | null
  wishlistType: string | null
  isPublic: boolean | null
  createdIn: string | null
  products: Array<WishlistProduct | null> | null
  fieldsConfig: {
    department: string | null
    description: string | null
  }
}

export type WishlistProduct = {
  ID?: number | null
  Image?: string | null
  linkProduct?: string | null
  nameProduct?: string | null
  quantityProduct?: number | null
  skuCodeReference?: string | null
  department?: string | null
  bundle?: number | null
  notes: string
}

export type ViewListsQueryResponse = {
  getWishlistsByEmail: Array<Wishlist | null> | null
}

export type CreateListMutationVariables = {
  wishlist: {
    wishlistType: string | null
    products: WishlistProduct[]
    isPublic: boolean
  }
}

export type ListByIdQueryResponse = {
  getWishlist: Wishlist | null
}

export type ListByIdQueryVariables = {
  id: string
}

export type CreateListMutationResponse = {
  createWishlist: {
    Id: string | null
  } | null
}

export type AddToListMutationResponse = {
  updateWishlist: {
    id: string | null
  } | null
}

export type UpdateListItemMutationResponse = {
  updateWishlist: {
    id: string | null
  } | null
}

export type UpdateListItemMutationVariables = {
  wishlist: {
    id: string | null
    products: Array<WishlistProduct | null> | null
    wishlistType: string | null
    isPublic: boolean | null
    fieldsConfig: {
      department: string | null
      description: string | null
    }
  }
}

export type FilteredVariants = {
  productID: string
  sku: string
  name: string
  gtin: string
  slug: string
  videos: string[]
  image: Array<{
    url: string
    alternateName: string
  }>
  additionalProperty: Array<{
    propertyID: string
    name: string
    value: unknown
    valueReference: unknown
  }>
  inventory: Array<{
    availableQuantity: number
    warehouse: {
      id: string
    }
  }>
  offers: {
    offers: Array<{
      availability: string
      price: number
      priceValidUntil: string
      priceCurrency: string
      listPrice: number
      seller: {
        identifier: string
      }
    }>
  }
}

export type SkuItem = {
  skuId: string
  quantity: number
}

export type Edge = {
  node: ProductVariant
}

export type SearchResult = {
  search: {
    products: {
      edges: Edge[]
    }
  }
}

type QueryProduct =
  ClientManyProductsQueryQuery['search']['products']['edges'][number]['node']

export type ProductVariant = {
  sku: QueryProduct['sku']
  gtin: QueryProduct['gtin']
  name: QueryProduct['name']
  image: QueryProduct['image']
  quantityProduct: number
  isVariantOf: {
    productGroupID: QueryProduct['isVariantOf']['productGroupID']
    name: QueryProduct['isVariantOf']['name']
    fullVariantList: FilteredVariants[]
  }
  department?: string
  offers: {
    offers: Array<{
      price: QueryProduct['offers']['offers'][number]['price']
      listPrice: QueryProduct['offers']['offers'][number]['listPrice']
      seller: QueryProduct['offers']['offers'][number]['seller']
    }>
  }
  slug: QueryProduct['slug']
}
