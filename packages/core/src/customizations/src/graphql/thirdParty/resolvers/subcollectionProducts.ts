import type { SubcollectionProducts } from '@generated/graphql'

import { getSubcollectionProductsById } from '../../clients/vtex/subcollectionProducts'
import { getCollectionProductsById } from '../../clients/vtex/collectionProducts'

const getSubcollectionId = {
  getSubcollectionId: async (
    _: unknown,
    { collectionId }: { collectionId: string }
  ): Promise<SubcollectionProducts> => {
    const collectionIdNumber = Number(collectionId)

    const collectionProducts =
      await getCollectionProductsById(collectionIdNumber)

    const collectionProductsFirstProduct = collectionProducts.Data[0]

    const subCollectionSkus = await getSubcollectionProductsById(
      collectionProductsFirstProduct.SubCollectionId,
      1
    )

    if (subCollectionSkus.TotalPage && subCollectionSkus.TotalPage > 1) {
      const promises = []

      for (
        let currentPage = 2;
        currentPage <= subCollectionSkus.TotalPage;
        currentPage++
      ) {
        promises.push(
          getSubcollectionProductsById(
            collectionProductsFirstProduct.SubCollectionId,
            currentPage
          )
        )
      }

      const results = await Promise.all(promises)

      subCollectionSkus.Data = results.reduce((acc, curr) => {
        if (acc && curr.Data) {
          return [...acc, ...curr.Data]
        }

        return acc
      }, subCollectionSkus.Data)
    }

    return subCollectionSkus
  },
}

export default getSubcollectionId
