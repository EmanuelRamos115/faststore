import classNames from 'classnames'

import styles from './Badges.module.scss'

const SaleBadge = () => {
  return <span className={classNames(styles.badge, styles.sale)}>Sale</span>
}

export default SaleBadge
