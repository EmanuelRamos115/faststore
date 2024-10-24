import { Accordion } from '@faststore/ui'
import { useEffect, useState } from 'react'
import type { ServerProductQueryQuery } from '@generated/graphql'

import ProductDescription from './ProductDescription'
import ProductSpecifications from './ProductSpecifications'
import Includes from './Includes'
import Reviews from './Reviews'
import FestivalList from './FestivalList'
import Scriptures from './Scriptures'
import { getSpecs, getSpec } from '../../utils/productData'
import styles from './ProductAccordion.module.scss'
import type { TrustPilotWidgetProps } from '../TrustPilot/TrustPilotWidget'

type ProductAccordionProps = {
  product: ServerProductQueryQuery['product']
  trustPilotAccordionConfig: TrustPilotWidgetProps
  scrollDetected: number
}

const ProductAccordion = ({
  product,
  trustPilotAccordionConfig,
  scrollDetected,
}: ProductAccordionProps) => {
  const [indices, setIndices] = useState(new Set<number>([]))
  const onChange = (index: number) => {
    if (indices.has(index)) {
      indices.delete(index)
      setIndices(new Set(indices))
    } else {
      setIndices(new Set(indices.add(index)))
    }
  }

  useEffect(() => {
    if (scrollDetected === 0) {
      return
    }

    setIndices(new Set(indices.add(1)))
  }, [scrollDetected])

  const language = getSpec(product.additionalProperty, 'Language')
  const productSpecs = getSpecs(product.isVariantOf.additionalProperty)

  const skuIdList =
    product.isVariantOf.fullVariantList
      .map((variant) => variant.gtin)
      .join(',') ?? product.gtin

  return (
    <div className={styles.accordionContainer}>
      <div className={styles.accordionInner}>
        <Accordion
          indices={indices}
          onChange={onChange}
          className={styles.accordion}
        >
          <ProductDescription
            productDescription={product?.description}
            productSpecs={productSpecs}
            index={1}
          />
          <ProductSpecifications
            productSpecs={productSpecs}
            language={language}
            index={2}
          />
          <Includes productSpecs={productSpecs} index={3} />

          <Scriptures product={product} index={4} />

          <Reviews
            skuId={skuIdList}
            index={5}
            trustPilotAccordionConfig={trustPilotAccordionConfig}
          />

          <FestivalList productSlug={product.slug} index={6} />
        </Accordion>
      </div>
    </div>
  )
}

export default ProductAccordion
