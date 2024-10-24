import classNames from 'classnames'
import {
  FilterFacetRange,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@faststore/ui'
import type { Filter_FacetsFragment } from '@generated/graphql'

import { useFormattedPrice } from '../../hooks/useFormattedPrice'
import { updatedFacetLabel } from '../../constants/facetLabels'
import type { OnFacetChange } from '../../typings/facets'
import ArrowDownIcon from '../Icons/General/ArrowDownIcon'
import ArrowUpIcon from '../Icons/General/ArrowUpIcon'
import FilterFacetBooleanList from './FilterFacetBooleanList'
import styles from './Filter.module.scss'

type FilterAccordionProps = {
  facet: Filter_FacetsFragment
  identifier: string
  onFacetChange: OnFacetChange
  index: number
}

const FilterAccordion = ({
  facet,
  identifier,
  onFacetChange,
  index,
}: FilterAccordionProps) => {
  const { __typename: type } = facet
  const buttonId = `${identifier}-filter-button--${index}`
  const panelId = `${identifier}-filter-panel--${index}`

  return (
    <AccordionItem
      key={`${facet.label}-${index}`}
      index={index}
      data-type={type}
      className={classNames(
        styles.filter,
        identifier === 'drawer' && styles.drawerFilter
      )}
    >
      <AccordionButton
        className={styles.accordionHeading}
        expandedIcon={<ArrowUpIcon />}
        collapsedIcon={<ArrowDownIcon />}
        id={buttonId}
        aria-controls={panelId}
      >
        {updatedFacetLabel[facet.label] ?? facet.label}
      </AccordionButton>

      <AccordionPanel id={panelId} aria-labelledby={buttonId}>
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
      </AccordionPanel>
    </AccordionItem>
  )
}

export default FilterAccordion
