import type { CollectionNameResponse } from '@generated/graphql'

import { getCollectionById } from '../../utils/vtexApiRequest'

const getCollectionName = {
  getCollectionName: async (
    _: unknown,
    { collectionId }: { collectionId: string }
  ): Promise<CollectionNameResponse> => {
    const collectionIdNumber = Number(collectionId)

    const collection = await getCollectionById(collectionIdNumber)

    return collection
  },
}

export default getCollectionName
