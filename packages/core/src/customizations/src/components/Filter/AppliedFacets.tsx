import type { Filter_FacetsFragment } from '@generated/graphql'

import CircledXIcon from '../Icons/General/CircledXIcon'
import Heading from '../Heading/Heading'
import styles from './AppliedFacets.module.scss'
import type { OnFacetChangeItem, AppliedFacet } from '../../typings/facets'
import { getAppliedFacets } from '../../utils/facets'

type AppliedFacetsProps = {
  facets: Filter_FacetsFragment[]
  handleClear: (arg0: OnFacetChangeItem) => void
  handleClearAll: () => void
  hideAppliedFacets?: boolean
}

const AppliedFacets = ({
  facets,
  handleClear,
  handleClearAll,
  hideAppliedFacets = false,
}: AppliedFacetsProps) => {
  const appliedFacets = getAppliedFacets(facets)

  if (hideAppliedFacets) {
    return null
  }

  return appliedFacets.length > 0 ? (
    <>
      <div className={styles.container}>
        <Heading level={2} uiStyle={6} className={styles.heading}>
          Filters ({appliedFacets.length})
        </Heading>

        <ul className={`list-reset ${styles.list}`}>
          {appliedFacets.map((facet: AppliedFacet) => (
            <li className={styles.item} key={facet.value}>
              <button
                aria-label={`Remove ${facet.label}`}
                className={styles.clearButton}
                type="button"
                onClick={() =>
                  handleClear({
                    key: facet.key,
                    value: facet.value,
                  })
                }
              >
                <CircledXIcon className={styles.icon} />
                <span className={styles.label}>{facet.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {appliedFacets.length > 1 && (
          <button className={styles.clearAllButton} onClick={handleClearAll}>
            Clear all
          </button>
        )}
      </div>
    </>
  ) : (
    <Heading level={2} uiStyle={6} className="visually-hidden">
      Filters
    </Heading>
  )
}

export default AppliedFacets
