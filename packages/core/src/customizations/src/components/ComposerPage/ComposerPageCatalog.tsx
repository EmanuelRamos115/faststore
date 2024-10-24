import { gql } from '@generated/gql'
import { useQuery } from 'src/sdk/graphql/useQuery'
import type { GetBrandQuery } from '@generated/graphql'

import styles from './ComposerPage.module.scss'
import { slugify } from '../../utils/slugify'
import ComposerPageProductList from './ComposerPageProductList'

const GET_BRAND = gql(`
  query getBrand($id: Int!) {
    brand(id: $id) {
      name
    }
  }
`)

type ComposerPageCatalogProps = {
  brandId: number
}

const ComposerPageCatalog = ({ brandId }: ComposerPageCatalogProps) => {
  const { data } = useQuery<GetBrandQuery>(GET_BRAND, {
    id: brandId,
  })

  if (!data?.brand) {
    return null
  }

  return (
    <div className={styles.sectionDark}>
      <div className={styles.contentWrapper}>
        <ComposerPageProductList
          heading="Full Catalog"
          cta={{
            url: `/${slugify(data.brand.name)}`,
            text: 'View All',
            color: 'neutralLight',
          }}
          productQuery={{
            first: 10,
            sort: 'score_desc',
            selectedFacets: {
              key: 'brand',
              value: data.brand.name,
            },
          }}
        />
      </div>
    </div>
  )
}

export default ComposerPageCatalog
