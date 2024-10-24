import type { Filter_FacetsFragment } from '@generated/graphql'
import { FilterFacetRange } from '@faststore/ui'

import { useFormattedPrice } from '../../hooks/useFormattedPrice'
import type { OnFacetChange } from '../../typings/facets'
import FilterFacetBooleanList from './FilterFacetBooleanList'
import styles from './Filter.module.scss'

type FilterProps = {
  facet: Filter_FacetsFragment
  identifier: string
  onFacetChange: OnFacetChange
}

const Filter = ({ facet, identifier, onFacetChange }: FilterProps) => {
  const { __typename: type } = facet

  return (
    <div className={styles.filter}>
      <div className={styles.heading}>{facet.label}</div>

      <div className={styles.inputContainer}>
        {type === 'StoreFacetBoolean' && (
          <FilterFacetBooleanList
            identifier={identifier}
            facet={facet}
            onFacetChange={onFacetChange}
          />
        )}

        {type === 'StoreFacetRange' && (
          <FilterFacetRange
            facetKey={facet.key}
            min={facet.min}
            max={facet.max}
            formatter={useFormattedPrice}
            onFacetChange={onFacetChange}
          />
        )}
      </div>
    </div>
  )
}

export default Filter
