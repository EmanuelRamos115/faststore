import type {
  CollectionDetails,
  QueryCollectionDetailsArgs,
} from '@generated/graphql'

import { vtexApiRequest } from '../../utils/vtexApiRequest'

const collectionDetailsResolver = {
  collectionDetails: async (
    _: unknown,
    { id }: QueryCollectionDetailsArgs
  ): Promise<CollectionDetails | undefined> => {
    return vtexApiRequest<CollectionDetails>(
      `/api/catalog/pvt/collection/${id}`,
      true
    )
  },
}

export default collectionDetailsResolver
