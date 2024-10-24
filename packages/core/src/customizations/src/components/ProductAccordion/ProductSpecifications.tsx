import AccordionItem from '../AccordionItem/AccordionItem'
import styles from './ProductAccordion.module.scss'

type ProductDescriptionProps = {
  productSpecs: Partial<Record<string, string>>
  language?: string
  index: number
}

const ProductSpecifications = ({
  productSpecs,
  language,
  index,
}: ProductDescriptionProps) => {
  const specifications = Object.keys(productSpecs)
    .filter((item) => item.includes('Specification'))
    .map((item) => productSpecs[item])

  if (!specifications.length && !language) {
    return null
  }

  return (
    <AccordionItem
      title="Specifications"
      details={
        <div className={styles.descriptionList}>
          <ul className="list-reset">
            {language && (
              <li className={styles.listText}>Language: {language}</li>
            )}
            {specifications?.map((spec) => (
              <li key={spec} className={styles.listText}>
                {spec}
              </li>
            ))}
          </ul>
        </div>
      }
      index={index}
    />
  )
}

export default ProductSpecifications
