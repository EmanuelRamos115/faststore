import { useRef, useEffect } from 'react'
import { useProductsQuery } from '@faststore/core'
import { useInView } from 'react-intersection-observer'
import type { ResponsiveObject } from 'react-slick'
import { useViewItemListEvent } from 'src/sdk/analytics/hooks/useViewItemListEvent'

import type {
  Heading as HeadingProps,
  CallToAction,
  Products as ProductsQuery,
} from '../../@generated/cms/DepartmentLandingPage'
import Heading from '../Heading/Heading'
import Action from '../Action/Action'
import ProductListSlider from '../ProductList/ProductListSlider'
import styles from './ProductListSection.module.scss'

type ProductListSectionProps = {
  heading: HeadingProps
  cta: CallToAction
  productQuery: ProductsQuery
}

const ProductListSection = ({
  heading,
  cta,
  productQuery,
}: ProductListSectionProps) => {
  const data = useProductsQuery(productQuery)
  const productEdges = data?.search?.products?.edges ?? []
  const viewedOnce = useRef(false)
  const { ref, inView } = useInView()
  const productCount = productEdges.length

  const responsiveConfig: ResponsiveObject[] = [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: productCount >= 5 ? 5 : productCount,
      },
    },
    {
      breakpoint: 1360,
      settings: {
        slidesToShow: productCount >= 4 ? 4 : productCount,
      },
    },
    {
      breakpoint: 1240,
      settings: {
        slidesToShow: productCount >= 3 ? 3 : productCount,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: productCount >= 4 ? 4 : productCount,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: productCount >= 3 ? 3 : productCount,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: productCount >= 2 ? 2 : productCount,
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
    <div className={styles.section} ref={ref}>
      <div className={styles.header}>
        <Heading level={2} uiStyle={4}>
          {heading}
        </Heading>

        {cta && (
          <Action as="a" href={cta.url} color={cta.color} size={'small'}>
            {cta.text}
          </Action>
        )}
      </div>

      <ProductListSlider
        heading={heading}
        productEdges={productEdges}
        responsiveConfig={responsiveConfig}
        isDepartmentPage
      />
    </div>
  )
}

export default ProductListSection
