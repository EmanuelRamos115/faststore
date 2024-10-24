/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {
  ClientProductQueryQuery,
  ServerProductQueryQuery,
} from '@generated/graphql'
import type { CartItem } from 'src/sdk/cart/index'

import { parseJson } from './parseJson'
import type {
  ProductSpec,
  Product,
  ProductFullVariantList,
  ClientManyProductsQueryQueryProductEdges,
} from '../typings/product'
import type { Availability } from '../typings/sku'
import type { CustomCartItem } from '../typings/cart'

type ConcatComposer = {
  composer?: string
  arranger?: string
}

type ConcatArtist = {
  artist?: string
  lyricist?: string
}

type ConcatCopyrightYear = {
  copyrightYear?: string
  publishedLocation?: string
  imprintPublisher?: string
}

type ConcatSKU = {
  sku: string
  supplierID?: string
}

type ConcatUPC = {
  upc?: string
  isbn?: string
}

export const getSpec = (
  specs: ProductSpec[],
  specName: string
): string | undefined => {
  return specs.find((spec) => spec.name === specName)?.value
}

export const concatComposer = ({
  composer,
  arranger,
}: ConcatComposer): string | undefined => {
  if (composer && arranger) {
    return `${composer}/arr. ${arranger}`
  }

  if (arranger) {
    return `Arr. ${arranger}`
  }

  return composer
}

export const concatArtist = ({
  artist,
  lyricist,
}: ConcatArtist): string | undefined => {
  if (artist && lyricist) {
    return `Artist: ${artist}, Lyricist: ${lyricist}`
  }

  if (artist) {
    return `Artist: ${artist}`
  }

  if (lyricist) {
    return `Lyricist: ${lyricist}`
  }

  return undefined
}

export const concatSKU = ({ sku, supplierID }: ConcatSKU): string => {
  if (supplierID) {
    return `${sku}, Supplier ID: ${supplierID}`
  }

  return sku
}

export const concatUPC = ({ upc, isbn }: ConcatUPC): string | undefined => {
  if (upc && isbn) {
    return `UPC: ${upc}, ISBN: ${isbn}`
  }

  if (upc) {
    return `UPC: ${upc}`
  }

  if (isbn) {
    return `ISBN: ${isbn}`
  }

  return undefined
}

export const concatCopyright = ({
  copyrightYear,
  publishedLocation,
  imprintPublisher,
}: ConcatCopyrightYear): string | undefined => {
  let combinedString = [copyrightYear, imprintPublisher].join(' ').trim()

  if (publishedLocation) {
    combinedString +=
      copyrightYear || imprintPublisher
        ? `, ${publishedLocation}`
        : publishedLocation
  }

  return combinedString === '' ? undefined : `©${combinedString}`
}

export const isNewProduct = (releaseDate: string) => {
  const currentDate = new Date().getTime()

  const timeDifference = currentDate - Number(releaseDate)

  const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000

  return timeDifference <= oneYearInMilliseconds
}

export const isSkuOnSale = (
  sku: Product | ProductFullVariantList[0]
): boolean => {
  const {
    offers: [{ price, listPrice }],
  } = sku.offers

  return price < listPrice
}

export const isProductOnSale = (product: Product): boolean => {
  let onSale = false
  const variants = product.isVariantOf.fullVariantList

  for (const variant of variants) {
    const {
      offers: {
        offers: [{ price, listPrice }],
      },
    } = variant

    if (price < listPrice) {
      onSale = true
      break
    }
  }

  return onSale
}

export const isSheetMusic = (
  product: Product | ClientProductQueryQuery['product']
): boolean => {
  const {
    isVariantOf: { additionalProperty: productSpecs },
  } = product

  const pdpLayout = getSpec(productSpecs, 'PDP Layout')

  return pdpLayout === 'Sheet Music'
}

export const getFolderImprintingAssemblyOptions = (
  product:
    | ServerProductQueryQuery['product']
    | ClientProductQueryQuery['product']
):
  | ServerProductQueryQuery['product']['assemblyOptions'][0]
  | ClientProductQueryQuery['product']['assemblyOptions'][0]
  | undefined => {
  return product.assemblyOptions.find((option) =>
    option.name.toLowerCase().includes('folderimprinting')
  )
}

export type FolderImprintingIds = {
  middleSection?: string
  upperSection?: string
  lowerSection?: string
}

export const getFolderImprintingSkuIds = (
  product:
    | ServerProductQueryQuery['product']
    | ClientProductQueryQuery['product']
): FolderImprintingIds | undefined => {
  const options = getFolderImprintingAssemblyOptions(product)

  return options?.composition?.items.reduce((acc, item) => {
    return {
      ...acc,
      ...(item.gtin.includes('FIM') && { middleSection: item.id }),
      ...(item.gtin.includes('FIU') && { upperSection: item.id }),
      ...(item.gtin.includes('FIL') && { lowerSection: item.id }),
    }
  }, {})
}

export const isImprintable = (
  product: ServerProductQueryQuery['product']
): boolean => {
  const imprintingSpec =
    getSpec(product.additionalProperty, 'Customization Type') ===
    'Imprinting Available'

  const folderImprintingAssemblyOptions =
    getFolderImprintingAssemblyOptions(product)

  return imprintingSpec && !!folderImprintingAssemblyOptions
}

const availableAtAnyWarehouse = (
  product: Product | ProductFullVariantList[0]
): boolean =>
  product.inventory.some((warehouse) => warehouse.availableQuantity > 0)

export const getSkuNotInStock = (
  product: Product | ProductFullVariantList[0]
): boolean => !availableAtAnyWarehouse(product)

export const getProductNotInStock = (product: Product): boolean => {
  const variants = product.isVariantOf.fullVariantList

  return !variants.some(availableAtAnyWarehouse)
}

export const getSpecs = (
  specsArray:
    | Product['additionalProperty']
    | CartItem['itemOffered']['additionalProperty']
): Partial<Record<string, string>> => {
  return Object.fromEntries(specsArray.map((spec) => [spec.name, spec.value]))
}

export const getBadges = (
  product: Product
): Partial<Record<string, boolean>> => {
  const {
    releaseDate,
    isVariantOf: { additionalProperty: productSpecs },
  } = product

  return {
    basicLibrary: getSpec(productSpecs, 'Promotions') === 'Basic Library',
    editorsChoice: getSpec(productSpecs, 'Editors Choice') === 'Yes',
    newProduct: isNewProduct(releaseDate),
  }
}

export const formattedMediaImages = (product: Product) => {
  return product?.image?.map(
    (image: { alternateName: string; url: string }, index: number) => {
      const slicedString = image.url.split('/')

      slicedString.splice(6, 0, '-100-100')
      const formattedUrl = slicedString.join('/')

      return {
        original: image.url,
        originalAlt: image.alternateName,
        thumbnail: formattedUrl,
        thumbnailAlt: `thumbnail-${image.alternateName}`,
        loading: index === 0 ? 'eager' : 'lazy',
      }
    }
  )
}

export const getSkuAvailability = (
  product:
    | ServerProductQueryQuery['product']
    | ClientManyProductsQueryQueryProductEdges[0]['node']
    | ClientProductQueryQuery['product'],
  skuRefId: string
) => {
  const availabilitySpec = getSpec(
    product.isVariantOf.additionalProperty,
    'Availability'
  )

  return parseJson<Record<string, Availability>>(availabilitySpec)?.[skuRefId]
}

export const getTraditionalExtraParts = (product: Product) =>
  product.isVariantOf.fullVariantList.filter(
    (item) => getSpec(item.additionalProperty, 'Parts') === 'Traditional'
  )

export const getEprintExtraParts = (product: Product) =>
  product.isVariantOf.fullVariantList.filter(
    (item) => getSpec(item.additionalProperty, 'Parts') === 'ePrint'
  )

export const hasTraditionalExtraParts = (product: Product, gtin: string) => {
  if (gtin.endsWith('E')) {
    return false
  }

  const parts = getTraditionalExtraParts(product)

  return !!parts.find((item) => item.gtin.includes(gtin))
}

export const hasEPrintExtraParts = (product: Product, gtin: string) => {
  if (!gtin.endsWith('E')) {
    return false
  }

  const parts = getEprintExtraParts(product)

  return !!parts.find((item) => item.gtin.includes(gtin))
}

export const removeExtraParts = (product: Product) =>
  product.isVariantOf.fullVariantList.filter(
    (item) => !getSpec(item.additionalProperty, 'Parts')
  )

export const isJson = (str?: string) => {
  let value = typeof str !== 'string' ? JSON.stringify(str) : str

  try {
    value = JSON.parse(value)
  } catch (e) {
    return false
  }

  return typeof value === 'object' && value !== null
}

export const removeCurrentProduct = (
  productGroupID: string,
  productEdges: ClientManyProductsQueryQueryProductEdges
): ClientManyProductsQueryQueryProductEdges => {
  const otherProducts = productEdges.filter(
    (product) => product.node.isVariantOf.productGroupID !== productGroupID
  )

  if (otherProducts.length < productEdges.length) {
    return otherProducts
  }

  return productEdges.slice(0, -1)
}

export const getLatestItems = (items: CartItem[]) => {
  const customCartItems = items as Array<
    CustomCartItem & {
      timestamp: number
    }
  >

  if (customCartItems.length === 0) {
    return []
  }

  const latestTimestamp = customCartItems.reduce((prev, current) =>
    prev.timestamp > current.timestamp ? prev : current
  ).timestamp

  return customCartItems.filter((item) => item.timestamp === latestTimestamp)
}
