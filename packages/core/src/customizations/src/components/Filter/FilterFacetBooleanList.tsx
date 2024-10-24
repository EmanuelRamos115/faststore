import { useState } from 'react'
import type { Filter_FacetsFragment } from '@generated/graphql'

import FilterFacetBooleanItem from './FilterFacetBooleanItem'
import ArrowDownIcon from '../Icons/General/ArrowDownIcon'
import ArrowUpIcon from '../Icons/General/ArrowUpIcon'
import type { FacetValue, OnFacetChange } from '../../typings/facets'
import { sortByQuantity } from '../../utils/facets'
import styles from './FilterFacetBooleanList.module.scss'

const SHOW_ALL_THRESHOLD = 3

type FilterFacetsStoreFacetBooleanFragment = Extract<
  Filter_FacetsFragment,
  { __typename: 'StoreFacetBoolean' }
>

type FilterFacetBooleanListProps = {
  facet: FilterFacetsStoreFacetBooleanFragment
  identifier: string
  onFacetChange: OnFacetChange
}

const FilterFacetBooleanList = ({
  facet,
  identifier,
  onFacetChange,
}: FilterFacetBooleanListProps) => {
  const { values } = facet
  const [showAll, setShowAll] = useState(false)
  const sortedValues = values.toSorted(sortByQuantity)
  const defaultValues = sortedValues.slice(0, SHOW_ALL_THRESHOLD)
  const hiddenValues = sortedValues.slice(SHOW_ALL_THRESHOLD)

  return (
    <>
      <ul className={`list-reset ${styles.list}`}>
        {defaultValues.map((item: FacetValue) => (
          <li
            key={`fs-filter-${identifier}-${facet.label}-${item.label}`}
            className={styles.item}
          >
            <FilterFacetBooleanItem
              facet={facet}
              item={item}
              identifier={identifier}
              onFacetChange={onFacetChange}
            />
          </li>
        ))}
      </ul>

      {hiddenValues.length > 0 && (
        <>
          {!showAll ? (
            <button
              className={styles.showAllButton}
              onClick={() => setShowAll(true)}
              aria-expanded={false}
            >
              <span>See All</span>
              <ArrowDownIcon />
            </button>
          ) : (
            <>
              <ul className={`list-reset ${styles.list} ${styles.listHidden}`}>
                {hiddenValues.map((item: FacetValue) => (
                  <li
                    key={`fs-filter-${identifier}-${facet.label}-${item.label}`}
                    className={styles.item}
                  >
                    <FilterFacetBooleanItem
                      facet={facet}
                      item={item}
                      identifier={identifier}
                      onFacetChange={onFacetChange}
                    />
                  </li>
                ))}
              </ul>

              <button
                className={styles.showAllButton}
                onClick={() => setShowAll(false)}
                aria-expanded={true}
              >
                <span>See Less</span>
                <ArrowUpIcon />
              </button>
            </>
          )}
        </>
      )}
    </>
  )
}

export default FilterFacetBooleanList
