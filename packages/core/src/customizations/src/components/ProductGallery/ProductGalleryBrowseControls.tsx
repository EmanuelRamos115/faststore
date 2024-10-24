import { useState } from 'react'
import { useUI, Button } from '@faststore/ui'
import { useSearch } from '@faststore/sdk'
import type { SearchState } from '@faststore/sdk'
import type { Filter_FacetsFragment } from '@generated/graphql'

import { getAppliedFacets } from '../../utils/facets'
import ListBullets from '../Icons/General/ListBullets'
import SquareFour from '../Icons/General/SquaresFour'
import Select from '../Select/Select'
import { useDeviceInfo } from '../../hooks/useDeviceInfo'
import styles from './ProductGalleryBrowseControls.module.scss'

const sortOptions = {
  release_desc: 'Newest',
  orders_desc: 'Top Selling',
  name_asc: 'Title, A-Z',
  name_desc: 'Title, Z-A',
  score_desc: 'Relevance',
  price_desc: 'Price, High - Low',
  price_asc: 'Price, Low - High',
  discount_desc: '',
}

type Sort = {
  value: string
  text: string
}

type ProductGalleryBrowseControlsProps = {
  facets: Filter_FacetsFragment[]
  view?: string
  setView?: (view: string) => void
}

const ProductGalleryBrowseControls = ({
  facets,
  view,
  setView,
}: ProductGalleryBrowseControlsProps) => {
  const { openFilter } = useUI()
  const { state: searchState, setState: setSearchState } = useSearch()
  const { device } = useDeviceInfo()
  const [sort, setSort] = useState<Sort>({
    value: searchState.sort,
    text: sortOptions[searchState.sort],
  })

  const isMobile = device !== 'desktop'
  const appliedFilterCount = getAppliedFacets(facets).length

  const handleViewToggle = () => {
    if (setView) {
      setView(view === 'grid' ? 'list' : 'grid')
    }
  }

  const handleSortSelect = (value: string, text: string) => {
    setSort({ value, text })

    setSearchState({
      ...searchState,
      sort: value as SearchState['sort'],
      page: 0,
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.sort}>
        <Select
          items={sortOptions}
          label="Sort products"
          handleClick={handleSortSelect}
          selected={sort.value}
          width={isMobile ? '105px' : 'auto'}
          placeholder={isMobile ? 'Sort by' : `Sort by: ${sort.text}`}
        />
      </div>

      <Button
        className={styles.filterButton}
        type="button"
        variant="tertiary"
        onClick={openFilter}
      >
        <span className={styles.filterText}>
          <span className={styles.filterTextLabel}>Filter</span>
          {appliedFilterCount > 0 && (
            <span className={styles.filterTextCount}>{appliedFilterCount}</span>
          )}
        </span>
      </Button>

      {view && (
        <Button
          className={styles.viewButton}
          aria-label={
            view === 'grid' ? 'Change view to list' : 'Change view to grid'
          }
          type="button"
          variant="tertiary"
          icon={view === 'grid' ? <ListBullets /> : <SquareFour />}
          onClick={handleViewToggle}
        />
      )}
    </div>
  )
}

export default ProductGalleryBrowseControls
