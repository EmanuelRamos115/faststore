import React from 'react'
import { Checkbox } from '@faststore/ui'
import type { Filter_FacetsFragment } from '@generated/graphql'

import type { FacetValue, OnFacetChange } from '../../typings/facets'
import styles from './FilterFacetBooleanItem.module.scss'

type FilterFacetBooleanItemProps = {
  item: FacetValue
  facet: Filter_FacetsFragment
  identifier: string
  onFacetChange: OnFacetChange
}

function FilterFacetBooleanItem({
  item,
  facet,
  identifier,
  onFacetChange,
}: FilterFacetBooleanItemProps) {
  const id = `fs-filter-${identifier}-${facet.label}-${item.label}`

  return (
    <div className={styles.option}>
      <Checkbox
        className={styles.checkbox}
        id={id}
        checked={item.selected}
        onChange={() => {
          onFacetChange({ key: facet.key, value: item.value }, 'BOOLEAN')
        }}
        data-testid={`fs-filter-checkbox`}
        data-value={item.value}
        data-quantity={item.quantity}
      />
      <label className={styles.label} htmlFor={id}>
        {item.label} ({item.quantity})
      </label>
    </div>
  )
}

export default FilterFacetBooleanItem
