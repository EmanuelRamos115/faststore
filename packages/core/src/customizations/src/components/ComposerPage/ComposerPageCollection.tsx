import { gql } from '@generated/gql'
import { useQuery } from 'src/sdk/graphql/useQuery'
import type { GetCollectionDetailsQuery } from '@generated/graphql'

import styles from './ComposerPage.module.scss'
import type { Composer } from '../../api/jwp/myScore/types'
import { slugify } from '../../utils/slugify'
import ComposerPageProductList from './ComposerPageProductList'

const GET_COLLECTION_DETAILS = gql(`
  query getCollectionDetails($id: Int!) {
    collectionDetails(id: $id) {
      Name
    }
  }
`)

type ComposerPageCollectionProps = {
  collection: Composer['collections'][0]
}

const ComposerPageCollection = ({
  collection,
}: ComposerPageCollectionProps) => {
  const { data } = useQuery<GetCollectionDetailsQuery>(GET_COLLECTION_DETAILS, {
    id: collection.vtexCollectionId,
  })

  if (!data?.collectionDetails) {
    return null
  }

  return (
    <div className={styles.collection}>
      <ComposerPageProductList
        heading={collection.displayName}
        cta={{
          url: `/${slugify(data.collectionDetails.Name)}`,
          text: 'View All',
          color: 'neutralLight',
        }}
        productQuery={{
          first: 5,
          sort: 'score_desc',
          selectedFacets: {
            key: 'productClusterIds',
            value: String(collection.vtexCollectionId),
          },
        }}
      />
    </div>
  )
}

export default ComposerPageCollection
