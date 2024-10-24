import { QuantitySelector } from '@faststore/ui'
import type { Dispatch, SetStateAction } from 'react'

import { MAX_QUANTITY } from '../../constants/global'
import styles from './FolderImprintingOptions.module.scss'
import type { ImprintingType } from './FolderImprinting'

const IMPRINTING_TYPE_OPTIONS = [
  { text: 'Select an Option', value: '' },
  { text: 'Every folder is the same', value: 'repeat' },
  { text: 'One or more folders are different', value: 'diff' },
]

type FolderImprintingOptionsProps = {
  imprintingType: string
  setImprintingType: Dispatch<SetStateAction<ImprintingType | ''>>
  quantity: number
  setQuantity: Dispatch<SetStateAction<number>>
}

const FolderImprintingOptions = ({
  imprintingType,
  setImprintingType,
  quantity,
  setQuantity,
}: FolderImprintingOptionsProps) => {
  return (
    <div>
      <label htmlFor="imprintingType" className={styles.heading}>
        Folder Imprinting Options *
      </label>

      <div className={styles.imprintingOptions}>
        <div className={styles.typeContainer}>
          <select
            id="imprintingType"
            className={styles.select}
            value={imprintingType}
            onChange={(e) =>
              setImprintingType(e.target.value as ImprintingType)
            }
          >
            {IMPRINTING_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <p>
            Your imprinting can contain upper and lower case alpha characters,
            numbers, and these symbols . ( ) ! # - ' / \ & @ ; :
          </p>
        </div>
        <div className={styles.quantityContainer}>
          <b>QTY *</b>

          <QuantitySelector
            min={1}
            max={MAX_QUANTITY}
            initial={quantity}
            onChange={(value) => setQuantity(value)}
          />
        </div>
      </div>
    </div>
  )
}

export default FolderImprintingOptions
