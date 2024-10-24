import Link from 'next/link'

import type { TwoCards as TwoCardsProps } from '../../@generated/cms/DepartmentLandingPage'
import styles from './TwoCardsSection.module.scss'
import { breakpoints } from '../../constants/breakpoints'
import Heading from '../Heading/Heading'
import Image from '../Image/Image'
import ArrowAltIcon from '../Icons/General/ArrowAltIcon'

type TwoCardsSectionProps = {
  section: TwoCardsProps
}

const TwoCardsSection = ({ section }: TwoCardsSectionProps) => {
  return (
    <div className={styles.grid}>
      {section.map((card) => (
        <div key={card.heading} className={styles.card}>
          <Link href={card.url} className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src={card.image.src}
              alt={card.image.alt}
              width={640}
              height={150}
              loading="lazy"
              sizes={`(max-width: ${breakpoints.tablet}) calc(100vw - 2rem), (max-width: ${breakpoints.contentNarrow}) calc(50vw - 1.5rem), calc(40rem - 1.5rem)`}
            />
          </Link>

          <div className={styles.contentWrapper}>
            <Heading className={styles.title} level={2} uiStyle={6}>
              <Link className={styles.titleLink} href={card.url}>
                {card.heading} <ArrowAltIcon />
              </Link>
            </Heading>

            <p>{card.copy}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TwoCardsSection
