import classNames from 'classnames'
import type { HTMLAttributes, ReactNode } from 'react'

import styles from './Heading.module.scss'

type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6
type UILevels = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  allCaps?: boolean
  bold?: boolean
  children: ReactNode
  divider?: boolean
  level: HeadingLevels
  uiStyle: UILevels
  className?: string
}

const Heading = ({
  allCaps,
  bold,
  children,
  divider,
  level,
  uiStyle,
  className,
  ...props
}: HeadingProps) => {
  const HeadingTag = `h${level}` as const

  return (
    <HeadingTag
      {...props}
      className={classNames(
        styles.heading,
        styles[`headingLevel${uiStyle}`],
        allCaps && styles.headingAllCaps,
        bold && styles.headingBold,
        divider && styles.headingDivider,
        className
      )}
    >
      {divider ? <span className={styles.headingDividerLine} /> : null}
      {children}
      {divider ? <span className={styles.headingDividerLine} /> : null}
    </HeadingTag>
  )
}

export default Heading
