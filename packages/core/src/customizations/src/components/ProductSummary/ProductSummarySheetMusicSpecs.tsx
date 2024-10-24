import Link from 'next/link'

import { concatComposer, concatArtist } from '../../utils/productData'
import { slugify } from '../../utils/slugify'
import styles from './ProductSummary.module.scss'

type ProductSummarySheetMusicSpecsProps = {
  composer?: string
  arranger?: string
  brand?: string
  artist?: string
  lyricist?: string
}

const ProductSummarySheetMusicSpecs = ({
  composer,
  arranger,
  brand,
  artist,
  lyricist,
}: ProductSummarySheetMusicSpecsProps) => {
  return (
    <div className={styles.specs}>
      {(composer || arranger) && (
        <p className={styles.spec}>
          {concatComposer({
            composer,
            arranger,
          })}
        </p>
      )}

      {brand && (
        <p className={styles.spec}>
          <Link href={`/${slugify(brand)}`}>{brand}</Link>
        </p>
      )}

      {(artist || lyricist) && (
        <p className={styles.spec}>
          {concatArtist({
            artist,
            lyricist,
          })}
        </p>
      )}
    </div>
  )
}

export default ProductSummarySheetMusicSpecs
