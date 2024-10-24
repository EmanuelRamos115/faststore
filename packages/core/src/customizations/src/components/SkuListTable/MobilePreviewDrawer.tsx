import { useState } from 'react'

import MobileDrawerSkuDetails from './MobileDrawerSkuDetails'
import PreviewsIcon from '../Icons/General/PreviewsIcon'
import PreviewAudioAndScore from './PreviewAudioAndScore'
import PreviewRange from './PreviewRange'
import PreviewVideo from './PreviewVideo'
import MobileDrawer from '../MobileDrawer/MobileDrawer'
import styles from './SkuListItem.module.scss'
import { useScroll } from '../../hooks/useScroll'
import type { SkuDetailsFormatted } from '../../typings/sku'

type MobilePreviewDrawerProps = {
  skuSpecs: Partial<Record<string, string>>
  skuDetails: SkuDetailsFormatted
  productTitle: string
}

const MobilePreviewDrawer = ({
  skuSpecs,
  skuDetails,
  productTitle,
}: MobilePreviewDrawerProps) => {
  const { blockScroll, allowScroll } = useScroll()
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const handleDrawerOpen = () => {
    setDrawerIsOpen(true)
    blockScroll()
  }

  const handleDrawerClose = () => {
    setDrawerIsOpen(false)
    allowScroll()
  }

  return (
    <>
      <button
        className={styles.mobileControlIconButton}
        onClick={handleDrawerOpen}
        type="button"
      >
        <PreviewsIcon />
        <span className={styles.mobileControlButtonText}>Previews</span>
      </button>

      {drawerIsOpen && (
        <MobileDrawer
          drawerIsOpen={drawerIsOpen}
          bodyContent={<MobileDrawerSkuDetails skuDetails={skuDetails} />}
          footerContent={
            <>
              {skuSpecs['Audio Available'] === 'Yes' ||
              skuSpecs['Score Available'] === 'Yes' ? (
                <PreviewAudioAndScore
                  productTitle={productTitle}
                  skuDetails={skuDetails}
                />
              ) : null}

              {skuSpecs['Video Available'] === 'Yes' && (
                <PreviewVideo
                  productTitle={productTitle}
                  skuDetails={skuDetails}
                />
              )}

              {skuSpecs['MINTS Data Available'] === 'Yes' && (
                <PreviewRange
                  productTitle={productTitle}
                  skuDetails={skuDetails}
                />
              )}
            </>
          }
          handleDrawerClose={handleDrawerClose}
          headerText={productTitle}
        />
      )}
    </>
  )
}

export default MobilePreviewDrawer
