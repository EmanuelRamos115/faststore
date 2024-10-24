import { memo } from 'react'

import type {
  BreadcrumbManualEntry as BreadcrumbManualEntryProps,
  Link as LinkProps,
} from '../../@generated/cms/BreadcrumbManualEntry'
import styles from './BreadcrumbManualEntry.module.scss'
import CustomBreadcrumb from '../CustomBreadcrumb/CustomBreadcrumb'

type BreadcrumbListItem = LinkProps & { position: number }

function BreadcrumbManualEntry({
  links,
  showHomeLink,
}: BreadcrumbManualEntryProps) {
  const breadcrumbList = links?.map(
    (link, index: number): BreadcrumbListItem => {
      return { ...link, position: index + 1 }
    }
  )

  if (!breadcrumbList) {
    return null
  }

  return (
    <section className={`${styles.section} section-breadcrumb`}>
      <CustomBreadcrumb
        breadcrumbList={breadcrumbList}
        showHomeLink={showHomeLink}
      />
    </section>
  )
}

export default memo(BreadcrumbManualEntry)
