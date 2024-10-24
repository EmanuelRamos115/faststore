import Image from '../Image/Image'
import Action from '../Action/Action'
import Heading from '../Heading/Heading'
import { breakpoints } from '../../constants/breakpoints'
import styles from './TwoCards.module.scss'
import type { TwoCards as TwoCardsProps } from '../../@generated/cms/TwoCards'

const TwoCards = ({ cards, imageLoadingStrategy }: TwoCardsProps) => {
  return (
    <div className={styles.twoCards}>
      {cards.map((card) => {
        return (
          <div key={card.heading} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={card.image.src}
                alt={card.image.alt ?? ''}
                width={640}
                height={150}
                loading={imageLoadingStrategy}
                sizes={`(max-width: ${breakpoints.tablet}) calc(100vw - 2rem), (max-width: ${breakpoints.contentNarrow}) calc(50vw - 1.5rem), calc(40rem - 1.5rem)`}
              />
            </div>

            <div className={styles.contentWrapper}>
              <Heading level={2} uiStyle={6}>
                {card.heading}
              </Heading>

              <p>{card.copy}</p>

              <Action
                as="a"
                color={card.cta.color}
                href={card.cta.url}
                size={card.cta.size}
              >
                {card.cta.text}
              </Action>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TwoCards
