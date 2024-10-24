import classNames from 'classnames'
import React, { useEffect, useRef } from 'react'

import styles from './TrustPilotWidget.module.scss'

export interface TrustPilotWidgetProps {
  templateId?: string
  businessId?: string
  stars?: string
  reviewLanguages?: string
  theme?: string
  width?: string
  height?: string
  locale?: string
  skuId?: string
}

const TrustPilotWidget = ({
  templateId,
  businessId = '57177697fdb1180308e3815f',
  stars = '5',
  reviewLanguages = 'en',
  theme = 'light',
  width = '100%',
  height = '240px',
  locale = 'en-US',
  skuId,
}: TrustPilotWidgetProps) => {
  if (!templateId) {
    return null
  }

  const ref = useRef(null)

  useEffect(() => {
    if (window?.Trustpilot) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      window?.Trustpilot?.loadFromElement(ref.current, true)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={classNames([
        `trustpilot-widget`,
        !skuId && styles.trustPilotGenericSection,
      ])}
      data-locale={locale}
      data-template-id={templateId}
      data-businessunit-id={businessId}
      data-style-height={height}
      data-style-width={width}
      data-theme={theme}
      data-stars={stars}
      data-review-languages={reviewLanguages}
      data-sku={skuId}
    >
      <iframe
        title="Customer reviews powered by Trustpilot"
        src={`https://widget.trustpilot.com/trustboxes/${templateId}/index.html?templateId=${templateId}&amp;businessunitId=${businessId}#locale=${locale}&amp;styleHeight=${height}&amp;styleWidth=${width}25&amp;theme=${theme}&amp;stars=${stars}&amp;reviewLanguages=${reviewLanguages}`}
      ></iframe>
    </div>
  )
}

export default TrustPilotWidget
