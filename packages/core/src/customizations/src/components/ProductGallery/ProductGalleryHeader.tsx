import styles from './ProductGalleryHeader.module.scss'
import Heading from '../Heading/Heading'

type ProductGalleryHeaderProps = {
  title?: string
  searchTerm?: string
  totalCount: number
}

const ProductGalleryHeader = ({
  title,
  searchTerm,
  totalCount,
}: ProductGalleryHeaderProps) => {
  return (
    <header className={styles.section}>
      <Heading level={1} uiStyle={3}>
        {searchTerm ? `Results for: "${searchTerm}"` : title}
        {totalCount > 0 && (
          <span className={styles.productCount}>({totalCount})</span>
        )}
      </Heading>
    </header>
  )
}

export default ProductGalleryHeader
