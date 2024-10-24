import { setFacet, toggleFacet, useSearch } from '@faststore/sdk'
import { Accordion } from '@faststore/ui'
import type { Filter_FacetsFragment } from '@generated/graphql'
import type { useFilter_unstable as useFilter } from '@faststore/core/experimental'

import { updatedFacetLabel } from '../../constants/facetLabels'
import type { OnFacetChangeItem, OnFacetChangeType } from '../../typings/facets'
import AppliedFacets from '../Filter/AppliedFacets'
import Filter from '../Filter/Filter'
import FilterAccordion from '../Filter/FilterAccordion'

const ACCORDION_THRESHOLD = 5

type FilterDesktopProps = ReturnType<typeof useFilter> & {
  hideAppliedFacets?: boolean
}

function FilterDesktop({
  facets,
  dispatch,
  expanded,
  hideAppliedFacets,
}: FilterDesktopProps) {
  const { state: searchState, setState: setSearchState } = useSearch()
  const standardFilters = facets.slice(0, ACCORDION_THRESHOLD)
  const accordionFilters = facets.slice(ACCORDION_THRESHOLD)

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
    setSearchState({
      ...searchState,
      selectedFacets:
        type === 'BOOLEAN'
          ? toggleFacet(searchState.selectedFacets, facet)
          : setFacet(searchState.selectedFacets, facet, true),
      page: 0,
    })
  }

  const handleClearFacet = (facet: OnFacetChangeItem) => {
    setSearchState({
      ...searchState,
      selectedFacets: toggleFacet(searchState.selectedFacets, facet),
      page: 0,
    })
  }

  const handleClearAllFacets = () => {
    setSearchState({
      ...searchState,
      selectedFacets: [],
      page: 0,
    })
  }

  return (
    <div>
      <div>
        <AppliedFacets
          facets={facets}
          handleClear={handleClearFacet}
          handleClearAll={handleClearAllFacets}
          hideAppliedFacets={hideAppliedFacets}
        />
      </div>

      {standardFilters.map((facet: Filter_FacetsFragment) => {
        const updatedFacet = {
          ...facet,
          label: updatedFacetLabel[facet.label] ?? facet.label,
        }

        return (
          <Filter
            key={`fs-filter-${facet.label}`}
            facet={updatedFacet}
            identifier="desktop"
            onFacetChange={handleFacetChange}
          />
        )
      })}

      {accordionFilters.length > 0 && (
        <Accordion indices={expanded} onChange={handleAccordionChange}>
          {accordionFilters.map(
            (facet: Filter_FacetsFragment, index: number) => (
              <FilterAccordion
                key={`fs-filter-${facet.label}`}
                identifier="desktop"
                facet={facet}
                index={index}
                onFacetChange={handleFacetChange}
              />
            )
          )}
        </Accordion>
      )}
    </div>
  )
}

export default FilterDesktop
