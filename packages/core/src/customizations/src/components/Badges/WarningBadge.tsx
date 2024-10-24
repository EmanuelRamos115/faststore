import { useState } from 'react'
import classNames from 'classnames'

import ExclamationIcon from '../Icons/General/ExclamationIcon'
import styles from './Badges.module.scss'

type WarningBadgeProps = {
  badgeText: string
  tooltipText?: string
}

const WarningBadge = ({ badgeText, tooltipText }: WarningBadgeProps) => {
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false)

  return (
    <div
      className={styles.badgeWrapper}
      onMouseOver={() => setTooltipVisible(true)}
      onMouseOut={() => setTooltipVisible(false)}
      onTouchEnd={() => setTooltipVisible(!tooltipVisible)}
    >
      <span className={classNames(styles.badge, styles.warning)}>
        <ExclamationIcon /> <span className={styles.text}>{badgeText}</span>
      </span>

      {tooltipText && (
        <div
          className={classNames(
            styles.badgeTooltip,
            styles.badgeTooltipWarning,
            tooltipVisible && styles.visible
          )}
        >
          <p>{tooltipText}</p>
        </div>
      )}
    </div>
  )
}

export default WarningBadge
