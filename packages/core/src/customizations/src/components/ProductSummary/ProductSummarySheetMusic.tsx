import classNames from 'classnames'
import { useProductLink } from 'src/sdk/product/useProductLink'
import type {
  ServerProductQueryQuery,
  ProductSummary_ProductFragment,
} from '@generated/graphql'

import ProductSummaryHeading from './ProductSummaryHeading'
import ProductSummarySheetMusicSpecs from './ProductSummarySheetMusicSpecs'
import ProductSummarySheetMusicBadges from './ProductSummarySheetMusicBadges'
import ProductSummaryRating from './ProductSummaryRating'
import ProductSummaryDescription from './ProductSummaryDescription'
import ProductSummaryCopyright from './ProductSummaryCopyright'
import type { ClientManyProductsQueryQueryProductEdges } from '../../typings/product'
import { getSpecs, getBadges } from '../../utils/productData'
import styles from './ProductSummary.module.scss'
import type { TrustPilotStarsConfig } from '../../@generated/cms/CustomProductDetails'

type ProductSummaryProps = {
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

const ProductSummary = ({
  product,
  trustPilotStarsConfig,
  layout = 'pdp',
  index = 0,
  scrollToDescription,
}: ProductSummaryProps) => {
  const isPLP = layout === 'plp'
  const productSpecs = getSpecs(product.isVariantOf.additionalProperty)
  const skuSpecs = getSpecs(product.additionalProperty)
  const badges = getBadges(product)
  const productLinkProps = {
    ...useProductLink({
      product: product as ProductSummary_ProductFragment,
      selectedOffer: 0,
      index,
    }),
  }

  const skuIdList =
    product.isVariantOf.fullVariantList
      .map((variant) => variant.gtin)
      .join(',') ?? product.gtin

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
        <ProductSummarySheetMusicSpecs
          composer={productSpecs.Composer}
          arranger={productSpecs.Arranger}
          brand={product.brand.name}
          artist={productSpecs.Artist}
          lyricist={productSpecs.Lyricist}
        />

        {(badges.editorsChoice || badges.basicLibrary) && (
          <ProductSummarySheetMusicBadges
            editorsChoice={badges.editorsChoice}
            basicLibrary={badges.basicLibrary}
          />
        )}

        {trustPilotStarsConfig && (
          <ProductSummaryRating
            trustPilotStarsConfig={trustPilotStarsConfig}
            skuId={skuIdList}
          />
        )}

        {product.description && (
          <ProductSummaryDescription
            scrollToDescription={scrollToDescription}
            description={product.description}
            isPLP={isPLP}
            isSheetMusic={true}
            productLinkProps={productLinkProps}
            supplierMessage={productSpecs['Supplier Shipping Message'] ?? ''}
          />
        )}

        {!isPLP && (
          <ProductSummaryCopyright
            copyrightYear={skuSpecs['Copyright Year']}
            publishedLocation={skuSpecs['Published Location']}
            imprintPublisher={skuSpecs['Imprint Publisher']}
          />
        )}
      </div>
    </div>
  )
}

export default ProductSummary
