import styles from './FolderImprintingCosts.module.scss'

const MIDDLE_SECTION_PRICING = [
  '1 - 29 folders: <b>$3.00 / each</b>',
  '30 - 49 folders: <b>$2.00 / each</b>',
  '50+ folders: <b>FREE IMPRINTING</b>',
]

const OTHER_SECTION_PRICING = ['Per line added: $1.00 / each']

const FolderImprintingCosts = () => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.heading}>MIDDLE SECTION PRICING</div>
        <ul className={styles.list}>
          {MIDDLE_SECTION_PRICING.map((pricing) => (
            <li key={pricing}>
              <span
                dangerouslySetInnerHTML={{
                  __html: pricing,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className={styles.heading}>UPPER RIGHT & LOWER RIGHT PRICING</div>
        <ul className={styles.list}>
          {OTHER_SECTION_PRICING.map((pricing) => (
            <li key={pricing}>{pricing}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FolderImprintingCosts
