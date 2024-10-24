import TriangledWarningIcon from '../Icons/General/TriangledWarningIcon'
import styles from './Prop65.module.scss'

const Prop65 = () => {
  return (
    <div className={styles.prop65Wrapper}>
      <div className={styles.iconWrapper}>
        <TriangledWarningIcon />
      </div>

      <p>
        <span className={styles.warningText}>Warning</span>: This product can
        expose you to chemicals which are known to the State of California to
        cause cancer, birth defects, or other reproductive harm.
      </p>
    </div>
  )
}

export default Prop65
