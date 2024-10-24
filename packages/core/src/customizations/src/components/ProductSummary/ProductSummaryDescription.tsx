import Link from 'next/link'

import type { ProductLinkProps } from '../../typings/product'
import ArrowAltIcon from '../Icons/General/ArrowAltIcon'
import TruncatedText from '../TruncatedText/TruncatedText'
import styles from './ProductSummary.module.scss'

type ProductSummaryDescriptionProps = {
  description: string
  isPLP: boolean
  productLinkProps?: ProductLinkProps
  scrollToDescription?: () => void
  isSheetMusic?: boolean
  supplierMessage?: string
}

const ProductSummaryDescription = ({
  description,
  isPLP,
  productLinkProps,
  scrollToDescription,
  isSheetMusic = false,
  supplierMessage,
}: ProductSummaryDescriptionProps) => {
  return (
    <div className={styles.description}>
      <TruncatedText
        copy={description}
        charCount={240}
        expandable={false}
        maxLines={2}
      />{' '}
      {isPLP && productLinkProps && isSheetMusic && (
        <Link className={styles.readmoreLink} {...productLinkProps}>
          Read More
        </Link>
      )}
      {scrollToDescription && (
        <span onClick={scrollToDescription} className="read-or-hide">
          <span className={styles.readMore}>
            Read More
            <ArrowAltIcon className={styles.readMoreArrow} />
          </span>
        </span>
      )}
      {supplierMessage && (
        <div className={styles.shippingMessageContainer}>
          <p className={styles.shippingMessage}>{supplierMessage}</p>
        </div>
      )}
    </div>
  )
}

export default ProductSummaryDescription
