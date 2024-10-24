import classNames from 'classnames'

import AccordionItem from '../AccordionItem/AccordionItem'
import styles from './ProductAccordion.module.scss'

type ProductDescriptionProps = {
  productDescription: string
  productSpecs: Partial<Record<string, string>>
  index: number
}

const ProductDescription = ({
  productDescription,
  productSpecs,
  index,
}: ProductDescriptionProps) => {
  const marketingFeatures = Object.keys(productSpecs)
    .filter((item) => item.includes('Marketing Feature'))
    .map((item) => productSpecs[item])

  if (
    marketingFeatures.length <= 0 &&
    !productDescription &&
    !productSpecs['Supplier Shipping Message']
  ) {
    return null
  }

  return (
    <AccordionItem
      title="Description"
      details={
        <div className={styles.descriptionList}>
          <div
            className={styles.itemText}
            dangerouslySetInnerHTML={{ __html: productDescription }}
          />
          <ul className="list-reset">
            {marketingFeatures?.map((spec) => (
              <li key={spec} className={styles.listText}>
                {spec}
              </li>
            ))}
          </ul>
          {productSpecs['Supplier Shipping Message'] && (
            <p className={classNames(styles.boldText, styles.itemText)}>
              {productSpecs['Supplier Shipping Message']}
            </p>
          )}
        </div>
      }
      index={index}
    />
  )
}

export default ProductDescription
