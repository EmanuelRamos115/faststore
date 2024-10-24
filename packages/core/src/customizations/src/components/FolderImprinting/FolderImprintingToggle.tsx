import { Checkbox } from '@faststore/ui'
import type { Dispatch, SetStateAction } from 'react'

import styles from './FolderImprintingToggle.module.scss'

type FolderImprintingToggleProps = {
  imprintingEnabled: boolean
  setImprintingEnabled: Dispatch<SetStateAction<boolean>>
}

const FolderImprintingToggle = ({
  imprintingEnabled,
  setImprintingEnabled,
}: FolderImprintingToggleProps) => {
  return (
    <>
      <div className={styles.container}>
        <div>
          <Checkbox
            className={styles.checkbox}
            id="addImprinting"
            checked={imprintingEnabled}
            onChange={() => setImprintingEnabled((prev) => !prev)}
          />
        </div>
        <div>
          <label htmlFor="addImprinting" className={styles.label}>
            CUSTOM MUSIC FOLDER IMPRINTING (Optional)
          </label>
          <p>
            Our professional gold embossed imprinting helps your group look
            their best. Personalize the middle, upper right and lower right
            sections of the folder to keep your group organized.
          </p>
        </div>
      </div>
    </>
  )
}

export default FolderImprintingToggle
