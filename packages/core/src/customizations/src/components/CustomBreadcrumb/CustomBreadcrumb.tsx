import Link from 'next/link'
import { Breadcrumb } from '@faststore/ui'
import type { BreadcrumbProps } from '@faststore/ui'

import styles from './CustomBreadcrumb.module.scss'

type CustomBreadcrumbProps = BreadcrumbProps & {
  showHomeLink?: boolean
}

const HomeLink = () => {
  return <Link href="/">Home</Link>
}

const CustomBreadcrumb = ({
  showHomeLink = true,
  ...props
}: CustomBreadcrumbProps) => {
  return (
    <div className={styles.customBreadcrumbWrapper}>
      <Breadcrumb
        {...props}
        homeLink={showHomeLink ? <HomeLink /> : undefined}
      />
    </div>
  )
}

export default CustomBreadcrumb
