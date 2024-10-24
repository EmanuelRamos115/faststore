import classNames from 'classnames'

import ExclamationIcon from '../Icons/General/ExclamationIcon'
import styles from './Badges.module.scss'

type NotAvailableBadgeProps = {
  tooltipText?: string
}

const NotAvailableBadge = ({ tooltipText }: NotAvailableBadgeProps) => {
  return (
    <div className={styles.badgeWrapper}>
      <span className={classNames(styles.badge, styles.notAvailable)}>
        <ExclamationIcon /> <span className={styles.text}>Not Available</span>
      </span>

      {tooltipText && (
        <div
          className={classNames(
            styles.badgeTooltip,
            styles.badgeTooltipNotAvailable
          )}
        >
          <p>{tooltipText}</p>
        </div>
      )}
    </div>
  )
}

export default NotAvailableBadge
