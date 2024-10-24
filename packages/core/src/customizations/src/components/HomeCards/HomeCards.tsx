import classNames from 'classnames'
import Link from 'next/link'

import Image from '../Image/Image'
import Action from '../Action/Action'
import Heading from '../Heading/Heading'
import richTextToHtml from '../../utils/richTextToHtml'
import ArrowAltIcon from '../Icons/General/ArrowAltIcon'
import { breakpoints } from '../../constants/breakpoints'
import type { HomeCards as HomeCardsProps } from '../../@generated/cms/HomeCards'
import styles from './HomeCards.module.scss'

const HomeCards = ({
  cards,
  header,
  showImagesOnMobile,
  imageLoadingStrategy,
}: HomeCardsProps) => {
  return (
    <div className={styles.homeCardsWrapper}>
      <div className={styles.headerWrapper}>
        {header.cta.text && header.cta.url ? (
          <>
            <Heading level={2} uiStyle={8} allCaps bold divider>
              {header.headingText}
            </Heading>

            <Action
              as="a"
              color={header.cta.color}
              href={header.cta.url}
              size={header.cta.size}
            >
              {header.cta.text}
            </Action>
          </>
        ) : (
          <Heading level={2} uiStyle={3}>
            {header.headingText}
          </Heading>
        )}
      </div>

      <div
        className={classNames(
          styles.cardsRow,
          cards.length === 3 ? styles.threeCardsRow : styles.fourCardsRow
        )}
        data-show-images-on-mobile={showImagesOnMobile}
      >
        {cards.map((card) => {
          return (
            <div className={styles.card} key={card.heading}>
              {card.image.src && (
                <div className={styles.cardImageWrapper}>
                  <Link href={card.url} className={styles.cardImageLink}>
                    <Image
                      src={card.image.src}
                      alt={card.image.alt ?? ''}
                      width={416}
                      height={256}
                      loading={imageLoadingStrategy}
                      sizes={
                        cards.length === 3
                          ? `(max-width: ${breakpoints.tablet}) 100vw, (max-width: ${breakpoints.contentNarrow}) calc(100vw / 3), calc(${breakpoints.contentNarrow} / 3)`
                          : `(max-width: ${breakpoints.tablet}) 100vw), (max-width: ${breakpoints.contentNarrow}) 25vw, calc(${breakpoints.contentNarrow} / 4)`
                      }
                    />
                  </Link>
                </div>
              )}

              <div className={styles.cardHeaderWrapper}>
                <Link href={card.url} className={styles.cardHeaderLink}>
                  {card.icon.src && (
                    <Image
                      className={styles.cardIcon}
                      src={card.icon.src}
                      alt={card.icon.alt ?? ''}
                      width={44}
                      height={44}
                      loading={imageLoadingStrategy}
                      sizes="44px"
                    />
                  )}
                  <Heading level={3} uiStyle={6}>
                    {card.heading}
                  </Heading>
                  <ArrowAltIcon />
                </Link>
              </div>

              {card.copy && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: richTextToHtml(card.copy),
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomeCards
