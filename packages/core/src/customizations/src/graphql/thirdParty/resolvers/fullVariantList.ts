import type { StoreProductGroupRoot } from '@faststore/core/api'

import { masterDataSearch } from '../../clients/vtex/masterData'

const PRODUCT_ASSOCIATION_DATA_ENTITY = 'PA'

// FS type doesn't include specs, so augment them here
type SkuSpecs = {
  'Item Sequence'?: string[]
}

type Item = SkuSpecs & StoreProductGroupRoot['isVariantOf']['items'][number]

type EnhancedSku = Item & {
  isVariantOf: StoreProductGroupRoot['isVariantOf']
}

type Product = SkuSpecs & StoreProductGroupRoot['isVariantOf']

// Copied from faststore utils/enhanceSku.ts
export const enhanceSku = (item: Item, product: Product): EnhancedSku => {
  return {
    ...item,
    isVariantOf: product,
    'Item Sequence': item['Item Sequence'],
  }
}

// Partial implementation of the context type from Vtex
type Context = {
  loaders: {
    skuLoader: {
      load: (skuId: string) => Promise<EnhancedSku>
    }
  }
}

type ProductAssociation = {
  childId: string
}

const fullVariantList = {
  fullVariantList: async (
    parent: StoreProductGroupRoot,
    _variables: unknown,
    context: Context
  ) => {
    const data = await masterDataSearch<ProductAssociation[]>(
      PRODUCT_ASSOCIATION_DATA_ENTITY,
      'v1',
      {
        parentId: parent.isVariantOf.productId,
        _fields: 'childId',
      }
    )

    const relatedSkus: EnhancedSku[] = []

    const results = await Promise.allSettled(
      data.map((item) => context.loaders.skuLoader.load(item.childId))
    )

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        relatedSkus.push(result.value)
      } else {
        console.error('Error loading sku:', result.reason)
      }
    })

    return parent.isVariantOf.items
      .map((item) => enhanceSku(item, parent.isVariantOf as Product))
      .sort((skuA, skuB) => {
        const seqA = skuA['Item Sequence']
          ? Number(skuA['Item Sequence'][0])
          : 1000

        const seqB = skuB['Item Sequence']
          ? Number(skuB['Item Sequence'][0])
          : 1000

        return seqA - seqB
      })
      .concat(relatedSkus)
  },
}

export default fullVariantList
