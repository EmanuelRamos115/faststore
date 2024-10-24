import type { ClientManyProductsQueryQuery } from '@generated/graphql'

import type { ProductVariant, SkuItem } from '../../typings/wishlist'

export const getSkus = (
  productSkuQuery: ClientManyProductsQueryQuery | undefined,
  skuItemsQuery: SkuItem[]
): ProductVariant[] | undefined => {
  return productSkuQuery?.search.products.edges.flatMap((edge) => {
    const fullVariantList = edge.node.isVariantOf.fullVariantList || []

    const filteredVariants = fullVariantList.filter((variant) => {
      return skuItemsQuery.some((item) => item.skuId === variant.sku)
    })

    return filteredVariants.map((variant) => {
      const skuItem = skuItemsQuery.find((item) => item.skuId === variant.sku)
      const quantity = skuItem ? skuItem.quantity : 1 // Default to 1 if quantity not found

      return {
        ...variant,
        quantityProduct: quantity,
        isVariantOf: {
          ...edge.node.isVariantOf,
          fullVariantList,
        },
        department: edge.node.breadcrumbList.itemListElement?.[0]?.name ?? '',
      }
    })
  })
}
