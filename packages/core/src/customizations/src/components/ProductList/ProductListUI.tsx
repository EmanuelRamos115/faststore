import { useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type { ResponsiveObject } from 'react-slick'
import { useViewItemListEvent } from 'src/sdk/analytics/hooks/useViewItemListEvent'

import Action from '../Action/Action'
import Heading from '../Heading/Heading'
import ProductListSlider from './ProductListSlider'
import type { ProductListQuery } from '../../@generated/cms/ProductList'
import type { ClientManyProductsQueryQueryProductEdges } from '../../typings/product'
import styles from './ProductListUI.module.scss'

type ProductListUIProps = {
  cta?: ProductListQuery['cta']
  heading: ProductListQuery['heading']
  productEdges: ClientManyProductsQueryQueryProductEdges
  productsToShow?: number
  showDots?: boolean
}

const ProductListUI = ({
  cta,
  heading,
  productEdges,
  productsToShow = 5,
  showDots = false,
}: ProductListUIProps) => {
  const viewedOnce = useRef(false)
  const { ref, inView } = useInView()
  const productCount = productEdges.length

  const responsiveConfig: ResponsiveObject[] = [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: productCount >= 3 ? 3 : productCount,
      },
    },
    { breakpoint: 500, settings: { slidesToShow: 1 } },
  ]

  const { sendViewItemListEvent } = useViewItemListEvent({
    products: productEdges,
    title: heading,
    page: 0,
    pageSize: 0,
  })

  useEffect(() => {
    if (inView && !viewedOnce.current && productCount) {
      sendViewItemListEvent()

      viewedOnce.current = true
    }
  }, [inView, productCount, sendViewItemListEvent])

  if (productCount === 0) {
    return null
  }

  return (
    <div className={styles.productList} ref={ref}>
      <div className={styles.innerWrapper}>
        <Heading level={2} uiStyle={8} allCaps bold divider>
          {heading}
        </Heading>

        {cta?.text && cta?.url && (
          <Action as="a" href={cta.url} color={cta.color} size={cta.size}>
            {cta.text}
          </Action>
        )}
      </div>

      <ProductListSlider
        heading={heading}
        productEdges={productEdges}
        productsToShow={productsToShow}
        showDots={showDots}
        responsiveConfig={responsiveConfig}
      />
    </div>
  )
}

export default ProductListUI
