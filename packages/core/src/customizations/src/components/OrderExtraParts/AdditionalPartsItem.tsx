import classNames from 'classnames'

import { useFormattedPrice } from '../../hooks/useFormattedPrice'
import QuantitySelector from './QuantitySelector'
import type { PartsNames } from '../../typings/props'
import styles from './OrderExtraParts.module.scss'

type AdditionalPartsItemProps = {
  defaultPart?: string
  name: PartsNames
  values: {
    part?: string
    qty?: number
  }
  handleInputChange?: (event: {
    target: { name: string; value: string }
  }) => void
  handleQuantityChange: (value: number, name: string) => void
  price: number
  warning?: boolean
}

const AdditionalPartsItem = ({
  defaultPart,
  name,
  values,
  handleInputChange,
  handleQuantityChange,
  price,
  warning,
}: AdditionalPartsItemProps) => {
  return (
    <tr>
      <td className={styles.quantitySelector}>
        <QuantitySelector
          name={name}
          onChange={handleQuantityChange}
          initial={values.qty}
        />
      </td>
      <td className={styles.inputTd}>
        {!defaultPart ? (
          <input
            className={classNames(styles.inputParts, warning && styles.warning)}
            name={name}
            value={values.part ?? ''}
            onChange={handleInputChange}
            type="text"
          />
        ) : (
          defaultPart
        )}
      </td>
      <td>{useFormattedPrice(price)}</td>
    </tr>
  )
}

export default AdditionalPartsItem
