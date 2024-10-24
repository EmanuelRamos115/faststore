import classNames from 'classnames'
import { useProductLink } from 'src/sdk/product/useProductLink'
import type {
  ServerProductQueryQuery,
  ProductSummary_ProductFragment,
} from '@generated/graphql'

import ProductSummaryRating from './ProductSummaryRating'
import ProductSummaryHeading from './ProductSummaryHeading'
import ProductSummaryDefaultPrice from './ProductSummaryDefaultPrice'
import ProductSummaryDefaultSpecs from './ProductSummaryDefaultSpecs'
import ProductSummaryDefaultBadges from './ProductSummaryDefaultBadges'
import ProductSummaryDescription from './ProductSummaryDescription'
import Action from '../Action/Action'
import styles from './ProductSummary.module.scss'
import {
  getSpecs,
  getBadges,
  isSkuOnSale,
  getProductNotInStock,
} from '../../utils/productData'
import { parseJson } from '../../utils/parseJson'
import type { ClientManyProductsQueryQueryProductEdges } from '../../typings/product'
import type { TrustPilotStarsConfig } from '../../@generated/cms/CustomProductDetails'

type ProductSummaryDefaultProps = {
  product:
    | ServerProductQueryQuery['product']
    | (ClientManyProductsQueryQueryProductEdges[0]['node'] & {
        description: string
      })
  layout?: 'plp' | 'pdp'
  index?: number
  trustPilotStarsConfig?: TrustPilotStarsConfig
  scrollToDescription?: () => void
}

const ProductSummaryDefault = ({
  product,
  trustPilotStarsConfig,
  layout = 'pdp',
  index = 0,
  scrollToDescription,
}: ProductSummaryDefaultProps) => {
  const isPLP = layout === 'plp'
  const productSpecs = getSpecs(product.isVariantOf.additionalProperty)
  const badges = getBadges(product)
  const isOnSale = isSkuOnSale(product)
  const isNotInStock = getProductNotInStock(product)

  const skuIdList =
    product.isVariantOf.fullVariantList
      .map((variant) => variant.gtin)
      .join(',') ?? product.gtin

  const productLinkProps = {
    ...useProductLink({
      product: product as ProductSummary_ProductFragment,
      selectedOffer: 0,
      index,
    }),
  }

  const isbns = parseJson<Record<string, string>>(productSpecs.ISBN)
  const upcs = parseJson<Record<string, string>>(productSpecs.Upc)
  const supplierIds = parseJson<Record<string, string>>(
    productSpecs['Supplier Item ID']
  )

  return (
    <div
      className={classNames(styles.summary, isPLP ? styles.plp : styles.pdp)}
    >
      <ProductSummaryHeading
        title={product.isVariantOf.name}
        subtitle={productSpecs.Subtitle}
        productLinkProps={productLinkProps}
        isPLP={isPLP}
        skuId={product.sku}
      />

      <div className={styles.detailsContainer}>
        <ProductSummaryDefaultSpecs
          sku={product.gtin}
          supplierID={supplierIds?.[product.gtin]}
          upc={upcs?.[product.gtin]}
          isbn={isbns?.[product.gtin]}
          brand={product.brand.name}
        />

        {!isPLP && (badges.newProduct || isOnSale) && (
          <ProductSummaryDefaultBadges
            newProduct={badges.newProduct}
            onSale={isOnSale}
          />
        )}
        {trustPilotStarsConfig && (
          <ProductSummaryRating
            trustPilotStarsConfig={trustPilotStarsConfig}
            skuId={skuIdList}
          />
        )}

        <ProductSummaryDefaultPrice
          offers={product.offers}
          isPLP={isPLP}
          isNotInStock={isNotInStock}
        />

        {product.description && (
          <ProductSummaryDescription
            description={product.description}
            isPLP={isPLP}
            scrollToDescription={scrollToDescription}
            supplierMessage={productSpecs['Supplier Shipping Message'] ?? ''}
          />
        )}

        {isPLP && (
          <div className={styles.viewPDPLink}>
            <Action
              as="a"
              color="neutralLight"
              onClick={productLinkProps.onClick}
              href={productLinkProps.href}
              size="medium"
            >
              View Product Details
            </Action>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductSummaryDefault
