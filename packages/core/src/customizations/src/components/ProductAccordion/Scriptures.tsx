import Link from 'next/link'
import type { ServerProductQueryQuery } from '@generated/graphql'

import { slugify } from '../../utils/slugify'
import AccordionItem from '../AccordionItem/AccordionItem'
import styles from './ProductAccordion.module.scss'

type ScripturesProps = {
  product: ServerProductQueryQuery['product']
  index: number
}

const Scriptures = ({ product, index }: ScripturesProps) => {
  const verseRanges = product.isVariantOf.additionalProperty.filter(
    (spec) => spec.name === 'Verse Range'
  )

  if (!verseRanges.length) {
    return null
  }

  return (
    <AccordionItem
      title="Scriptures"
      details={
        <div className={styles.linkList}>
          {verseRanges.map(
            (
              verseRange: { name: string; value: string },
              verseRangeIndex: number
            ) => (
              <Link
                href={`/scripture-search-result?${slugify(
                  verseRange.name
                )}=${slugify(verseRange.value)}`}
                className={styles.link}
                key={verseRangeIndex}
              >
                {verseRange.value}
              </Link>
            )
          )}
        </div>
      }
      index={index}
    />
  )
}

export default Scriptures
