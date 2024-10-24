import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type { ResponsiveObject } from 'react-slick'
import classNames from 'classnames'

import ProductCard from '../ProductCard/ProductCard'
import { PrevArrow, NextArrow } from './ProductListArrowButtons'
import type { ProductListQuery } from '../../@generated/cms/ProductList'
import type { ClientManyProductsQueryQueryProductEdges } from '../../typings/product'
import styles from './ProductListUI.module.scss'

type ProductListSliderProps = {
  heading: ProductListQuery['heading']
  productEdges: ClientManyProductsQueryQueryProductEdges
  productsToShow?: number
  showDots?: boolean
  responsiveConfig: ResponsiveObject[]
  isDepartmentPage?: boolean
}

const ProductListSlider = ({
  productEdges,
  productsToShow = 5,
  showDots = false,
  responsiveConfig,
  isDepartmentPage,
}: ProductListSliderProps) => {
  const productCount = productEdges.length

  return (
    <div
      className={classNames(
        styles.carouselWrapper,
        isDepartmentPage && styles.isDepartmentCarousel,
        {
          [styles.carouselWrapperDots]: showDots,
          [styles.carouselWrapper1Product]: productCount === 1,
          [styles.carouselWrapper2Products]: productCount === 2,
          [styles.carouselWrapper3Products]: productCount === 3,
          [styles.carouselWrapper4Products]: productCount === 4,
          [styles.carouselWrapper5Products]: productCount === 5,
        }
      )}
    >
      <Slider
        arrows={productsToShow !== 2}
        className={classNames(
          'slick-slider--product-list',
          isDepartmentPage && 'slick-slider-department'
        )}
        nextArrow={<NextArrow />}
        prevArrow={<PrevArrow />}
        responsive={responsiveConfig}
        speed={500}
        dots={showDots}
        slidesToShow={
          productCount >= productsToShow ? productsToShow : productCount
        }
        slidesToScroll={1}
      >
        {productEdges.map(({ node: product }, index) => (
          <div className={styles.productWrapper} key={product.id}>
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ProductListSlider
