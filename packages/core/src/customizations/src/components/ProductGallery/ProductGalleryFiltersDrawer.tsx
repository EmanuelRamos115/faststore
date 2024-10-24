import {
  Accordion,
  SlideOver,
  SlideOverHeader,
  useFadeEffect,
  useUI,
} from '@faststore/ui'
import { useSearch } from '@faststore/sdk'
import type { Filter_FacetsFragment } from '@generated/graphql'
import type { useFilter_unstable as useFilter } from '@faststore/core/experimental'

import Action from '../Action/Action'
import AppliedFacets from '../Filter/AppliedFacets'
import FilterAccordion from '../Filter/FilterAccordion'
import Heading from '../Heading/Heading'
import styles from './ProductGalleryFiltersDrawer.module.scss'
import type { OnFacetChangeItem, OnFacetChangeType } from '../../typings/facets'
import { getAppliedFacets } from '../../utils/facets'

type ProductGalleryFiltersDrawerProps = ReturnType<typeof useFilter> & {
  facets: Filter_FacetsFragment[]
  hideAppliedFacets?: boolean
}

function ProductGalleryFiltersDrawer({
  facets,
  dispatch,
  expanded,
  selected,
  hideAppliedFacets,
}: ProductGalleryFiltersDrawerProps) {
  const { setState: setSearchState, state: searchState } = useSearch()
  const { fade, fadeOut } = useFadeEffect()
  const { closeFilter } = useUI()

  const appliedFilterCount = getAppliedFacets(facets).length

  const handleSlideOverClose = () => {
    dispatch({
      type: 'selectFacets',
      payload: searchState.selectedFacets,
    })
    fadeOut()
  }

  const handleAccordionChange = (index: number) => {
    dispatch({
      type: 'toggleExpanded',
      payload: index,
    })
  }

  const handleFacetChange = (
    facet: OnFacetChangeItem,
    type: OnFacetChangeType
  ) => {
    if (type === 'BOOLEAN') {
      dispatch({
        type: 'toggleFacet',
        payload: facet,
      })
    } else {
      dispatch({
        type: 'setFacet',
        payload: { facet, unique: true },
      })
    }
  }

  const handleApplyFacets = () => {
    setSearchState({
      ...searchState,
      selectedFacets: selected,
      page: 0,
    })
    fadeOut()
  }

  const handleClearFacet = (facet: OnFacetChangeItem) => {
    dispatch({
      type: 'toggleFacet',
      payload: facet,
    })
  }

  const handleClearAllFacets = () => {
    dispatch({ type: 'selectFacets', payload: [] })
    expanded.forEach((index: number) => {
      dispatch({ type: 'toggleExpanded', payload: index })
    })
  }

  return (
    <SlideOver
      isOpen
      fade={fade}
      onDismiss={handleSlideOverClose}
      size="full"
      direction="rightSide"
      onTransitionEnd={() => fade === 'out' && closeFilter()}
    >
      <div className={styles.content}>
        <SlideOverHeader onClose={handleSlideOverClose}>
          <Heading level={2} uiStyle={2}>
            Filters {appliedFilterCount > 0 && `(${appliedFilterCount})`}
          </Heading>
        </SlideOverHeader>

        <AppliedFacets
          facets={facets}
          handleClear={handleClearFacet}
          handleClearAll={handleClearAllFacets}
          hideAppliedFacets={hideAppliedFacets}
        />

        <Accordion indices={expanded} onChange={handleAccordionChange}>
          {facets.map((facet: Filter_FacetsFragment, index: number) => (
            <div className={styles.filter}>
              <FilterAccordion
                key={`fs-filter-${facet.label}`}
                facet={facet}
                index={index}
                identifier="drawer"
                onFacetChange={handleFacetChange}
              />
            </div>
          ))}
        </Accordion>
      </div>

      <footer className={styles.footer}>
        <Action
          as="button"
          color="default"
          size="medium"
          className={styles.viewButton}
          onClick={handleApplyFacets}
          type="button"
        >
          View Items
        </Action>
      </footer>
    </SlideOver>
  )
}

export default ProductGalleryFiltersDrawer
