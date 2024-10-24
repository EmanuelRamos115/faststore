import { useState } from 'react'
import classNames from 'classnames'

import DigitalDownloadFull from '../Icons/Badges/Full/DigitalDownload'
import EPrintFull from '../Icons/Badges/Full/EPrint'
import ShipsIcon from '../Icons/General/ShipsIcon'
import EmailDelivery from '../Icons/General/EmailDelivery'
import styles from './DeliveryMethod.module.scss'

type DeliveryMethodProps = {
  deliveryMethod: string
}

const DeliveryMethod = ({ deliveryMethod }: DeliveryMethodProps) => {
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false)

  const method = deliveryMethod.toLowerCase()
  let icon: JSX.Element
  let tooltip: string

  if (method.includes('download')) {
    icon = <DigitalDownloadFull />
    tooltip = 'Digital Download in My Account'
  } else if (method.includes('email')) {
    icon = <EmailDelivery />
    tooltip = 'Purchased Item will be Emailed'
  } else if (method.includes('print')) {
    icon = <EPrintFull />
    tooltip = 'Print Immediately in My Account'
  } else {
    icon = <ShipsIcon />
    if (method.includes('direct')) {
      tooltip = 'Ships Direct from Manufacturer'
    } else {
      tooltip = 'Ships from J.W. Pepper'
    }
  }

  return (
    <div
      className={styles.wrapper}
      onMouseOver={() => setTooltipVisible(true)}
      onMouseOut={() => setTooltipVisible(false)}
      onTouchEnd={() => setTooltipVisible(!tooltipVisible)}
    >
      {icon}
      <div
        className={classNames(styles.tooltip, tooltipVisible && styles.visible)}
      >
        <p>{tooltip}</p>
      </div>
    </div>
  )
}

export default DeliveryMethod
