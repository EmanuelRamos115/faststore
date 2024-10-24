import classNames from 'classnames'
import { useProductLink } from 'src/sdk/product/useProductLink'

import type { ClientManyProductsQueryQueryProductEdges } from '../../typings/product'
import styles from './ProductSummaryCard.module.scss'
import {
  isSheetMusic,
  getBadges,
  isProductOnSale,
} from '../../utils/productData'
import ProductImage from '../ProductImage/ProductImage'
import ProductSummaryDefault from '../ProductSummary/ProductSummaryDefault'
import ProductSummarySheetMusic from '../ProductSummary/ProductSummarySheetMusic'
import ProductSummaryDefaultBadges from '../ProductSummary/ProductSummaryDefaultBadges'
import SkuListTable from '../SkuListTable/SkuListTable'
import type { TrustPilotStarsConfig } from '../../@generated/cms/CustomProductDetails'

type ProductSummaryCardProps = {
  product: ClientManyProductsQueryQueryProductEdges[0]['node']
  trustPilotPlpConfig: TrustPilotStarsConfig
  index: number
  isClusterPage?: boolean
}

const ProductSummaryCard = ({
  trustPilotPlpConfig,
  product,
  index,
  isClusterPage,
}: ProductSummaryCardProps) => {
  const isSheetMusicProduct = isSheetMusic(product)
  const badges = getBadges(product)
  const isOnSale = isProductOnSale(product)
  const linkProps = {
    ...useProductLink({ product, selectedOffer: 0, index }),
  }

  return (
    <div
      className={classNames(styles.card, {
        [styles.isSheetMusic]: isSheetMusicProduct,
      })}
    >
      <div className={styles.details}>
        <div className={styles.media}>
          <ProductImage
            imageUrl={product.image[0].url}
            imageAlt={product.image[0].alternateName}
            width={isSheetMusicProduct ? 240 : 322}
            isSheetMusic={isSheetMusicProduct}
            linkProps={linkProps}
            addBorder={isSheetMusicProduct}
          />

          {!isSheetMusicProduct && (badges.newProduct || isOnSale) && (
            <div className={styles.badges}>
              <ProductSummaryDefaultBadges
                newProduct={badges.newProduct}
                onSale={isOnSale}
              />
            </div>
          )}
        </div>

        <div className={styles.summary}>
          {isSheetMusicProduct ? (
            <ProductSummarySheetMusic
              product={product}
              layout="plp"
              index={index}
              trustPilotStarsConfig={trustPilotPlpConfig}
            />
          ) : (
            <ProductSummaryDefault
              product={product}
              layout="plp"
              index={index}
              trustPilotStarsConfig={trustPilotPlpConfig}
            />
          )}
        </div>
      </div>

      {isSheetMusicProduct && (
        <div className={styles.table}>
          <SkuListTable product={product} isPLP isClusterPage={isClusterPage} />
        </div>
      )}
    </div>
  )
}

export default ProductSummaryCard
