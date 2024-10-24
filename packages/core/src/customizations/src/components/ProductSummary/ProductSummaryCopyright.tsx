import { concatCopyright } from '../../utils/productData'
import styles from './ProductSummary.module.scss'

type ProductSummaryCopyrightProps = {
  copyrightYear?: string
  publishedLocation?: string
  imprintPublisher?: string
}

const ProductSummaryCopyright = ({
  copyrightYear,
  publishedLocation,
  imprintPublisher,
}: ProductSummaryCopyrightProps) => {
  if (!copyrightYear && !publishedLocation && !imprintPublisher) {
    return null
  }

  return (
    <p className={styles.copyright}>
      {concatCopyright({
        copyrightYear,
        publishedLocation,
        imprintPublisher,
      })}
    </p>
  )
}

export default ProductSummaryCopyright
