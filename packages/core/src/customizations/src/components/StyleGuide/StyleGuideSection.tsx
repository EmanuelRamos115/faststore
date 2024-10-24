import type { ReactNode } from 'react'

import Heading from '../Heading/Heading'
import styles from './StyleGuideSection.module.scss'

type StyleGuideSectionProps = {
  children: ReactNode
  heading: string
}

const StyleGuideSection = ({ children, heading }: StyleGuideSectionProps) => {
  return (
    <section className={styles.section}>
      <Heading level={2} uiStyle={3} className={styles.heading}>
        {heading}
      </Heading>

      {children}
    </section>
  )
}

export default StyleGuideSection
