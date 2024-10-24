import classNames from 'classnames'
import Link from 'next/link'

import Image from '../Image/Image'
import type { ProductLinkProps } from '../../typings/product'
import styles from './ProductImage.module.scss'

type ProductImageProps = {
  imageUrl: string
  imageAlt: string
  isSheetMusic: boolean
  width: number
  linkProps: ProductLinkProps
  addBorder?: boolean
}

const ProductImage = ({
  imageUrl,
  imageAlt,
  isSheetMusic,
  width,
  linkProps,
  addBorder = false,
}: ProductImageProps) => {
  const imageHeight = isSheetMusic ? width * 0.94 : width
  const imageWidth = isSheetMusic ? width * 0.725 : width

  return (
    <Link
      {...linkProps}
      className={classNames(styles.link, {
        [styles.linkSheetMusic]: isSheetMusic,
      })}
      style={{
        height: isSheetMusic ? imageHeight - 6 : imageHeight,
        border: addBorder ? '1px solid var(--jwp-color-grey)' : undefined,
      }}
    >
      <div className={styles.imageWrapper}>
        <Image
          style={{
            height: imageHeight,
            maxWidth: isSheetMusic ? imageWidth : '100%',
          }}
          src={imageUrl}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          sizes={`${imageWidth + 55}px`}
          className={styles.image}
        />
      </div>
    </Link>
  )
}

export default ProductImage
