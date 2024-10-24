import { Link } from '@faststore/ui'

import FullArrowRightIcon from '../Icons/General/FullArrowRightIcon'
import Over145YearsLogo from '../Icons/Logos/Over145YearsLogo'
import styles from './Over145YearsButton.module.scss'

const Over145YearsButton = () => {
  return (
    <Link
      href="/"
      className={styles.over145YearsButton}
      aria-label="Over 145 years of service"
    >
      <Over145YearsLogo /> <FullArrowRightIcon />
    </Link>
  )
}

export default Over145YearsButton
