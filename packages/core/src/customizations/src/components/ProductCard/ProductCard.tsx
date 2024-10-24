import { Link, ProductPrice } from '@faststore/ui'
import { useProductLink } from 'src/sdk/product/useProductLink'

import Heading from '../Heading/Heading'
import ProductImage from '../ProductImage/ProductImage'
import NewBadge from '../Badges/NewBadge'
import SaleBadge from '../Badges/SaleBadge'
import NotInStockMessage from '../NotInStockMessage/NotInStockMessage'
import BasicLibraryFull from '../Icons/Badges/Full/BasicLibrary'
import EditorsChoiceFull from '../Icons/Badges/Full/EditorsChoice'
import styles from './ProductCard.module.scss'
import {
  getSpecs,
  getBadges,
  isProductOnSale,
  isSheetMusic,
  concatComposer,
  getProductNotInStock,
} from '../../utils/productData'
import { useFormattedPrice } from '../../hooks/useFormattedPrice'
import type { ClientManyProductsQueryQueryProductEdges } from '../../typings/product'
import type { TrustPilotStarsConfig } from '../../@generated/cms/CustomProductDetails'
import ProductSummaryRating from '../ProductSummary/ProductSummaryRating'

type ProductCardProps = {
  trustPilotPlpConfig?: TrustPilotStarsConfig
  product: ClientManyProductsQueryQueryProductEdges[0]['node']
  index: number
}

const ProductCard = ({
  trustPilotPlpConfig,
  product,
  index,
}: ProductCardProps) => {
  const productSpecs = getSpecs(product.isVariantOf.additionalProperty)
  const productBadges = getBadges(product)
  const isSheetMusicProduct = isSheetMusic(product)
  const isNotInStock = getProductNotInStock(product)
  const isOnSale = isProductOnSale(product)
  const composer = concatComposer({
    composer: productSpecs.Composer,
    arranger: productSpecs.Arranger,
  })

  const {
    offers: [{ price, listPrice }],
  } = product.offers

  const linkProps = {
    ...useProductLink({ product, selectedOffer: 0, index }),
  }

  const skuIdList =
    product.isVariantOf.fullVariantList
      .map((variant) => variant.gtin)
      .join(',') ?? product.gtin

  return (
    <div
      className={`${styles.productCardWrapper} ${isSheetMusicProduct ? styles.isSheetMusic : ''}`}
    >
      <div className={styles.imageAndBadgeWrapper}>
        <ProductImage
          imageUrl={product.image[0].url}
          imageAlt={product.image[0].alternateName}
          width={170}
          isSheetMusic={isSheetMusicProduct}
          linkProps={linkProps}
          addBorder={false}
        />

        <div className={styles.badges}>
          {productBadges.basicLibrary && (
            <div className={`${styles.badge} ${styles.badgeBasicLibrary}`}>
              <BasicLibraryFull />
            </div>
          )}

          {productBadges.editorsChoice && (
            <div className={`${styles.badge} ${styles.badgeEditorsChoice}`}>
              <EditorsChoiceFull />
            </div>
          )}
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.textWrapper}>
          <div className={styles.pillWrapper}>
            {productBadges.newProduct && <NewBadge />}
            {isOnSale && <SaleBadge />}
          </div>
          <Heading level={3} uiStyle={7}>
            <Link {...linkProps} className={styles.name}>
              {product.isVariantOf.name}
            </Link>
          </Heading>

          {productSpecs.Subtitle && (
            <p className={styles.subtitle}>{productSpecs.Subtitle}</p>
          )}

          <p className={styles.description}>{composer ?? product.brand.name}</p>

          {!isSheetMusicProduct && (
            <p className={styles.price}>
              {product.offers.lowPrice < product.offers.highPrice ? (
                <>
                  <span>From</span>
                  <span className={styles.priceAmount}>
                    {useFormattedPrice(product.offers.lowPrice)}
                  </span>
                </>
              ) : (
                <span className={styles.priceAmount}>
                  <ProductPrice
                    formatter={useFormattedPrice}
                    listPrice={listPrice}
                    value={price}
                  />
                </span>
              )}
            </p>
          )}

          {isNotInStock && (
            <div>
              <NotInStockMessage size="small" />
            </div>
          )}
        </div>

        {trustPilotPlpConfig && (
          <ProductSummaryRating
            trustPilotStarsConfig={trustPilotPlpConfig}
            skuId={skuIdList}
          />
        )}
      </div>
    </div>
  )
}

export default ProductCard
