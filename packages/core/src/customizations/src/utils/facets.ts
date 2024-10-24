import type { Filter_FacetsFragment } from '@generated/graphql'

import type { AppliedFacet, FacetValue } from '../typings/facets'

export const getAppliedFacets = (
  facets: Filter_FacetsFragment[]
): AppliedFacet[] => {
  return facets.reduce(
    (acc: AppliedFacet[], facet: Filter_FacetsFragment): AppliedFacet[] => {
      if (facet.__typename === 'StoreFacetRange') {
        return acc
      }

      const selectedValues = facet.values.filter(
        (value: FacetValue) => value.selected
      )

      if (selectedValues?.length > 0) {
        for (const selectedValue of selectedValues) {
          acc.push({
            key: facet.key,
            value: selectedValue.value,
            label: selectedValue.label,
          })
        }
      }

      return acc
    },
    []
  )
}

export const sortByQuantity = (a: FacetValue, b: FacetValue): number => {
  return b.quantity - a.quantity
}
