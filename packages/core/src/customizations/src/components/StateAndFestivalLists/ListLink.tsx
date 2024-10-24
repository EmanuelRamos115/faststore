import Link from 'next/link'
import { gql } from '@generated/gql'
import { useQuery } from 'src/sdk/graphql/useQuery'
import type { GetCollectionDetailsQuery } from '@generated/graphql'

import { slugify } from '../../utils/slugify'
import styles from './StateAndFestivalLists.module.scss'

type Props = {
  text: string
  collectionID: number
}

const GET_COLLECTION_DETAILS = gql(`
  query getCollectionDetails($id: Int!) {
    collectionDetails(id: $id) {
      Name
    }
  }
`)

const ListLink = ({ text, collectionID }: Props) => {
  const { data } = useQuery<GetCollectionDetailsQuery>(GET_COLLECTION_DETAILS, {
    id: collectionID,
  })

  if (!data?.collectionDetails) {
    return null
  }

  return (
    <li key={collectionID}>
      <Link
        href={`/collection/${collectionID}/${slugify(data.collectionDetails.Name)}`}
        className={styles.link}
      >
        {text}
      </Link>
    </li>
  )
}

export default ListLink
