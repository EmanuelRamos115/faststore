import AccordionItem from '../AccordionItem/AccordionItem'
import styles from './ProductAccordion.module.scss'

type IncludesProps = {
  productSpecs: Partial<Record<string, string>>
  index: number
}

const Includes = ({ productSpecs, index }: IncludesProps) => {
  if (!productSpecs.Includes) {
    return null
  }

  return (
    <AccordionItem
      title="Includes"
      details={
        <div className={styles.includesList}>
          <p className={`${styles.itemText} ${styles.preserveWhitespace}`}>
            {productSpecs.Includes}
          </p>
        </div>
      }
      index={index}
    />
  )
}

export default Includes
