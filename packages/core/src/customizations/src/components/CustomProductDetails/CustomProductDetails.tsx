import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { usePDP } from '@faststore/core'
import { sendAnalyticsEvent } from '@faststore/sdk'
import type { CurrencyCode, ViewItemEvent } from '@faststore/sdk'
import { useSession } from 'src/sdk/session'
import type { AnalyticsItem } from 'src/sdk/analytics/types'

import styles from './CustomProductDetails.module.scss'
import MediaGallery from '../MediaGallery/MediaGallery'
import ProductAccordion from '../ProductAccordion/ProductAccordion'
import SkuListTable from '../SkuListTable/SkuListTable'
import ProductSummaryDefault from '../ProductSummary/ProductSummaryDefault'
import ProductSummarySheetMusic from '../ProductSummary/ProductSummarySheetMusic'
import ProductOptionsForm from '../ProductOptionsForm/ProductOptionsForm'
import FolderImprinting from '../FolderImprinting/FolderImprinting'
import Prop65 from '../Prop65/Prop65'
import {
  isSheetMusic,
  isImprintable,
  formattedMediaImages,
  getSpec,
} from '../../utils/productData'
import type { TrustPilotWidgetProps } from '../TrustPilot/TrustPilotWidget'
import type { TrustPilotStarsConfig } from '../../@generated/cms/CustomProductDetails'

interface CustomProductDetailsProps {
  trustPilotPdpConfig: {
    stars: TrustPilotStarsConfig
    accordion: TrustPilotWidgetProps
  }
}

const CustomProductDetails = ({
  trustPilotPdpConfig,
}: CustomProductDetailsProps) => {
  const context = usePDP()
  const product = context?.data?.product
  const [scrollDetected, setScrollDetected] = useState(0)
  const scrollToRef = useRef<HTMLDivElement>(null)
  const { currency } = useSession()

  if (!product) {
    throw new Error('Product not found.')
  }

  const {
    sku,
    gtin,
    name: variantName,
    brand,
    isVariantOf,
    offers: {
      offers: [{ price, listPrice }],
    },
  } = product

  useEffect(() => {
    sendAnalyticsEvent<ViewItemEvent<AnalyticsItem>>({
      name: 'view_item',
      params: {
        currency: currency.code as CurrencyCode,
        value: price,
        items: [
          {
            item_id: isVariantOf.productGroupID,
            item_name: isVariantOf.name,
            item_brand: brand.name,
            item_variant: sku,
            price,
            discount: listPrice - price,
            currency: currency.code as CurrencyCode,
            item_variant_name: variantName,
            product_reference_id: gtin,
          },
        ],
      },
    })
  }, [
    isVariantOf.productGroupID,
    isVariantOf.name,
    brand.name,
    sku,
    price,
    listPrice,
    currency.code,
    variantName,
    gtin,
  ])

  const isSheetMusicProduct = isSheetMusic(product)
  const isImprintableProduct = isImprintable(product)

  const prop65 = getSpec(product.additionalProperty, 'Prop65')
  const videoAvailable = getSpec(product.additionalProperty, 'Video Available')

  const scrollToDescription = () => {
    setScrollDetected((prev) => prev + 1)
    scrollToRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.section}>
      <div className={styles.row}>
        <div className={styles.container}>
          <div className={styles.summary}>
            <div className={styles.summaryMedia}>
              <MediaGallery
                isSheetMusic={isSheetMusicProduct}
                images={formattedMediaImages(product)}
                refId={product.gtin}
                isVideoAvailable={videoAvailable === 'Yes'}
              />
            </div>
            <div className={styles.summaryDetails}>
              {isSheetMusicProduct ? (
                <ProductSummarySheetMusic
                  product={product}
                  trustPilotStarsConfig={trustPilotPdpConfig.stars}
                  scrollToDescription={scrollToDescription}
                />
              ) : (
                <>
                  <ProductSummaryDefault
                    product={product}
                    trustPilotStarsConfig={trustPilotPdpConfig.stars}
                    scrollToDescription={scrollToDescription}
                  />
                  {isImprintableProduct ? (
                    <FolderImprinting product={product} />
                  ) : (
                    <ProductOptionsForm product={product} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isSheetMusicProduct && (
        <div className={styles.row}>
          <div className={styles.container}>
            <SkuListTable product={product} />
          </div>
        </div>
      )}

      <div className={classNames(styles.row, styles.rowDark)} ref={scrollToRef}>
        <div className={styles.container}>
          <ProductAccordion
            product={product}
            scrollDetected={scrollDetected}
            trustPilotAccordionConfig={trustPilotPdpConfig.accordion}
          />
        </div>
      </div>

      {prop65 === 'Yes' && (
        <div className={styles.row}>
          <div className={styles.container}>
            <Prop65 />
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomProductDetails
