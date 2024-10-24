import classNames from 'classnames'
import type { ServerProductQueryQuery } from '@generated/graphql'

import { getSpec } from '../../utils/productData'
import { useFormattedPrice } from '../../hooks/useFormattedPrice'
import Image from '../Image/Image'
import QuantitySelector from './QuantitySelector'
import styles from './OrderExtraParts.module.scss'

type EprintPartsItemProps = {
  sku: ServerProductQueryQuery['product']['isVariantOf']['fullVariantList'][0]
  index?: number
  isSelected?: boolean
  titleClass?: string
  setSelectedItem?: (index: number) => void
  changeOrder: (value: number, name: string) => void
}
const EprintPartsItem = ({
  sku,
  index,
  isSelected,
  titleClass,
  setSelectedItem,
  changeOrder,
}: EprintPartsItemProps) => {
  const onClickItem = () => {
    index && setSelectedItem && setSelectedItem(index)
  }

  const handleQuantityChange = (value: number, id: string) => {
    changeOrder(value, sku.productID)
    setSelectedItem && onClickItem()
  }

  const setQuantity = getSpec(sku.additionalProperty, 'SKU Part Count')
  const set = setQuantity ?? 1

  return (
    <tr
      onClick={onClickItem}
      className={isSelected ? styles.selectedItem : styles.unSelectedItem}
    >
      <td>
        <div className={styles.itemDescription}>
          {sku?.image.length && (
            <Image
              className={styles.itemImage}
              src={sku?.image[0].url}
              alt={sku?.image[0].alternateName}
              width={60}
              height={100}
              loading="lazy"
              sizes="60px"
            />
          )}
          <p className={classNames(styles.name, titleClass)}>{sku.name}</p>
        </div>
      </td>
      {set && <td className={classNames(!set && styles.setTd)}>{set}</td>}
      <td className={styles.price}>
        {useFormattedPrice(sku?.offers.offers[0].price)}
      </td>
      <td
        className={classNames(
          styles.quantitySelector,
          !set && styles.smallQuantityTd
        )}
      >
        <QuantitySelector name={sku.name} onChange={handleQuantityChange} />
      </td>
    </tr>
  )
}

export default EprintPartsItem
