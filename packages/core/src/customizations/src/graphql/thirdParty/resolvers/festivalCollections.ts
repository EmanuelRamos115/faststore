import type { Collection } from '@generated/graphql'

import { getCollectionById } from '../../clients/vtex/collections'
import { slugify } from '../../../utils/slugify'

type SearchResultItem = {
  itemId: string

  isVariantOf: {
    productClusters: Array<{
      id: string
      name: string
    }>
  }
}

const festivalCollections = {
  festivalCollections: async (
    parent: SearchResultItem,
    _variables: unknown
  ): Promise<Collection[]> => {
    // This is going to have problems if there are a ton of collections
    // We might need to look into pagination if it gets out of hand
    const collections = await Promise.all(
      parent.isVariantOf.productClusters.map((collection) =>
        getCollectionById(Number(collection.id))
      )
    )

    return collections
      .filter((collection) => collection.Description?.match(/type:\s*sf/i))
      .map((collection) => ({
        id: collection.Id,
        name: collection.Name,
        slug: slugify(collection.Name),
        totalProducts: collection.TotalProducts,
      }))
  },
}

export default festivalCollections
