import Link from 'next/link'
import classNames from 'classnames'

import { concatSKU, concatUPC } from '../../utils/productData'
import { slugify } from '../../utils/slugify'
import styles from './ProductSummary.module.scss'

type ProductSummaryDefaultSpecsProps = {
  sku: string
  supplierID?: string
  upc?: string
  isbn?: string
  brand?: string
}

const ProductSummaryDefaultSpecs = ({
  sku,
  supplierID,
  upc,
  isbn,
  brand,
}: ProductSummaryDefaultSpecsProps) => {
  return (
    <div className={styles.specs}>
      <p className={styles.spec}>{concatSKU({ sku, supplierID })}</p>
      <p className={classNames(styles.spec, styles.specSmall)}>
        {concatUPC({ upc, isbn })}
      </p>

      {brand && (
        <p className={styles.spec}>
          <Link href={`/${slugify(brand)}`}>{brand}</Link>
        </p>
      )}
    </div>
  )
}

export default ProductSummaryDefaultSpecs
