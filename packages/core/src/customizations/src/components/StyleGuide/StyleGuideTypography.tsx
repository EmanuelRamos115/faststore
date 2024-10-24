import { Link } from '@faststore/ui'

import StyleGuideSubSection from './StyleGuideSubSection'
import styles from './StyleGuide.module.scss'
import Heading from '../Heading/Heading'

const levels = [1, 2, 3, 4, 5, 6] as const

const StyleGuideTypography = () => {
  return (
    <>
      <StyleGuideSubSection heading="Heading Typeface">
        <div className={`${styles.card} ${styles.cardFlex}`}>
          <div className="heading heading--no-margin">
            <span>Aa Bb 123</span>
          </div>

          <div className="heading heading--no-margin">
            <span>Futura PT</span>
          </div>
        </div>
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="Body Typeface">
        <div className={`${styles.card} ${styles.cardFlex}`}>
          <span>Aa Bb 123</span>
          <span>Open Sans</span>
        </div>
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="Headings">
        {levels.map((level) => {
          return (
            <div key={level}>
              <div className={styles.card}>
                <Heading level={level} uiStyle={level}>
                  Heading {level}
                </Heading>

                <p className={styles.code}>
                  h{level}, level {level}, uiStyle {level}
                </p>
              </div>
            </div>
          )
        })}
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="Body Copy">
        <div className={styles.card}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="Links">
        <div className={`${styles.card} ${styles.cardFlex}`}>
          <Link href="#" variant="default" className={styles.underline}>
            Default
          </Link>

          <Link href="#" variant="display" className={styles.underline}>
            Display
          </Link>

          <Link href="#" variant="inline" className={styles.underline}>
            Inline
          </Link>

          <Link href="#" size="small" className={styles.underline}>
            Small
          </Link>
        </div>
      </StyleGuideSubSection>
    </>
  )
}

export default StyleGuideTypography
