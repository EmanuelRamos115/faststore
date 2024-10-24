import classNames from 'classnames'

import CircledXIcon from '../Icons/General/CircledXIcon'
import styles from './NotInStockMessage.module.scss'

type NotInStockMessageProps = {
  size?: 'default' | 'small'
}

const NotInStockMessage = ({ size = 'default' }: NotInStockMessageProps) => {
  return (
    <div
      className={classNames(styles.message, size === 'small' && styles.small)}
    >
      <CircledXIcon />
      <span>Not In Stock</span>
    </div>
  )
}

export default NotInStockMessage
