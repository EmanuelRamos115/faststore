import type { ReactNode } from 'react'

import Heading from '../Heading/Heading'
import styles from './StyleGuideSubSection.module.scss'

type StyleGuideSubSectionProps = {
  children?: ReactNode
  heading: string
}

const StyleGuideSubSection = ({
  children,
  heading,
}: StyleGuideSubSectionProps) => {
  return (
    <section className={styles.subSection}>
      <Heading level={3} uiStyle={6} className={styles.heading}>
        {heading}
      </Heading>

      {children}
    </section>
  )
}

export default StyleGuideSubSection
