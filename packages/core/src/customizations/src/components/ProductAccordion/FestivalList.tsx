import { Link } from '@faststore/ui'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { gql } from '@generated/gql'
import type { GetFestivalCollectionsQuery } from '@generated/graphql'

import AccordionItem from '../AccordionItem/AccordionItem'
import styles from './ProductAccordion.module.scss'

type FestivalListProps = {
  productSlug: string
  index: number
}

const GET_FESTIVAL_COLLECTIONS = gql(`
    query getFestivalCollections($locator: IStoreSelectedFacet!) {
      product(locator: [$locator]) {
        isVariantOf {
          festivalCollections {
            name
            slug
          }
        }
      }
    }
  `)

const FestivalList = ({ productSlug, index }: FestivalListProps) => {
  const { data, isLoading } = useQuery<GetFestivalCollectionsQuery>(
    GET_FESTIVAL_COLLECTIONS,
    {
      locator: {
        key: 'slug',
        value: productSlug,
      },
    }
  )

  if (isLoading || !data?.product.isVariantOf.festivalCollections.length) {
    return null
  }

  return (
    <AccordionItem
      title="Festivals"
      details={
        <div className={styles.linkList}>
          {data.product.isVariantOf.festivalCollections.map(
            (festival: { slug: string; name: string }) => (
              <Link href={`/${festival.slug}`} className={styles.link}>
                {festival.name}
              </Link>
            )
          )}
        </div>
      }
      index={index}
    />
  )
}

export default FestivalList
