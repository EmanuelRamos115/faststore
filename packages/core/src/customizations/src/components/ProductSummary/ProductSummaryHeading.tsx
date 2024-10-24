import Link from 'next/link'

import Heading from '../Heading/Heading'
import ShareButton from '../ShareButton/ShareButton'
import styles from './ProductSummary.module.scss'
import type { SkuItem } from '../Wishlist/AddToWishlistButton'
import AddToWishlistButton from '../Wishlist/AddToWishlistButton'
import MobileSaveDrawer from '../SkuListTable/MobileSaveDrawer'
import type { ProductLinkProps } from '../../typings/product'
import { useDeviceInfo } from '../../hooks/useDeviceInfo'

type ProductSummaryHeadingProps = {
  productLinkProps: ProductLinkProps
  title: string
  isPLP?: boolean
  skuId: string
  subtitle?: string
}

const ProductSummaryHeading = ({
  productLinkProps,
  title,
  subtitle,
  isPLP = false,
  skuId,
}: ProductSummaryHeadingProps) => {
  const { device } = useDeviceInfo()

  const isMobile = device !== 'desktop'

  const skuItem: SkuItem = {
    skuId,
    quantity: 1,
  }

  return (
    <>
      <div className={styles.titleContainer}>
        {isPLP && productLinkProps ? (
          <Heading level={3} uiStyle={6} className={styles.title}>
            <Link {...productLinkProps}>{title}</Link>
          </Heading>
        ) : (
          <Heading level={1} uiStyle={3} className={styles.title}>
            {title}
          </Heading>
        )}

        <div className={styles.shareWrapper}>
          {isMobile ? (
            <MobileSaveDrawer skus={[skuItem]} />
          ) : (
            <AddToWishlistButton skus={[skuItem]} />
          )}

          <div className={styles.shareDivider} />

          <ShareButton
            buttonText={title}
            toastMessage="Product link copied to your clipboard."
            url={productLinkProps.href}
          />
        </div>
      </div>

      {subtitle && (
        <Heading level={2} uiStyle={7} className={styles.subtitle}>
          {subtitle}
        </Heading>
      )}
    </>
  )
}

export default ProductSummaryHeading
