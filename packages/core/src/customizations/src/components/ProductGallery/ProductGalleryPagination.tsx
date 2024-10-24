import { NextSeo } from 'next-seo'
import type { ChangeEvent } from 'react'
import { useSearch } from '@faststore/sdk'
import { useDelayedPagination } from 'src/sdk/search/useDelayedPagination'
import { useProductsPrefetch } from 'src/sdk/product/useProductsPrefetch'

import styles from './ProductGalleryPagination.module.scss'
import { useScroll } from '../../hooks/useScroll'
import Pagination from '../Pagination/Pagination'

type ProductGalleryPaginationProps = {
  totalCount: number
}

const ProductGalleryPagination = ({
  totalCount,
}: ProductGalleryPaginationProps) => {
  const { itemsPerPage, state, setState } = useSearch()

  const { scrollToTop } = useScroll()
  const totalPages = Math.ceil(totalCount / itemsPerPage)
  const { next, prev } = useDelayedPagination(totalCount)

  useProductsPrefetch(prev ? prev.cursor : null)
  useProductsPrefetch(next ? next.cursor : null)

  const handleChange = (e: ChangeEvent<unknown>, value: number) => {
    e.preventDefault()
    const newPageNumber = value - 1

    scrollToTop()

    setState({
      ...state,
      page: newPageNumber,
    })
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className={styles.section}>
      {!!prev && (
        <NextSeo additionalLinkTags={[{ rel: 'prev', href: prev.link }]} />
      )}
      {!!next && (
        <NextSeo additionalLinkTags={[{ rel: 'next', href: next.link }]} />
      )}
      <Pagination
        count={totalPages}
        page={state.page + 1}
        onChange={handleChange}
      />
    </div>
  )
}

export default ProductGalleryPagination
