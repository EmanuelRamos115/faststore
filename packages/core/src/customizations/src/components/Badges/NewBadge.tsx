import classNames from 'classnames'

import styles from './Badges.module.scss'

const NewBadge = () => {
  return <span className={classNames(styles.badge, styles.new)}>New</span>
}

export default NewBadge
