import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'
import { useState } from 'react'
import type { ServerProductQueryQuery } from '@generated/graphql'

import Image from '../Image/Image'
import Action from '../Action/Action'
import EprintPartsItem from './EprintPartsItem'
import Heading from '../Heading/Heading'
import { getSpec } from '../../utils/productData'
import { breakpoints } from '../../constants/breakpoints'
import type { ClientManyProductsQueryQueryProductEdges } from '../../typings/product'
import { addToCart } from '../../utils/addToCart'
import { useScroll } from '../../hooks/useScroll'
import { parseJson } from '../../utils/parseJson'
import styles from './OrderExtraParts.module.scss'

const tableHeadings = ['Parts', 'Parts in Set', 'Price', 'Qty']

type FormData = {
  [key: string]: {
    quantity: number
  }
}

type EprintPartsFormProps = {
  setModalIsOpen: (arg: boolean) => void
  product:
    | ServerProductQueryQuery['product']
    | ClientManyProductsQueryQueryProductEdges[0]['node']
  parts: ServerProductQueryQuery['product']['isVariantOf']['fullVariantList']
  sku: ServerProductQueryQuery['product']['isVariantOf']['fullVariantList'][0]
}

const EprintPartsForm = ({
  product,
  parts,
  setModalIsOpen,
  sku,
}: EprintPartsFormProps) => {
  const { onClick } = useCartToggleButton()

  const supplierIdSpecs = getSpec(
    product?.isVariantOf.additionalProperty,
    'Supplier Item ID'
  )

  const supplierIds = parseJson<Record<string, string>>(supplierIdSpecs)

  const { allowScroll } = useScroll()
  const [orderParts, setOrderParts] = useState<FormData>({})
  const [selectedItem, setSelectedItem] = useState(1)

  const changeOrder = (value: number, id: string) => {
    setOrderParts((prevState) => ({
      ...prevState,
      [id]: {
        quantity: value,
      },
    }))
  }

  const handleAddToCart = () => {
    const timestamp = Date.now()

    Object.keys(orderParts).forEach((item) => {
      const partSku = product.isVariantOf.fullVariantList.find(
        (skuId) => skuId.productID === item
      )

      if (!partSku) {
        return
      }

      addToCart({
        sku: partSku,
        isVariantOf: product.isVariantOf,
        brand: product.brand,
        quantity: orderParts[item].quantity,
        timestamp,
      })
    })
    allowScroll()
    setModalIsOpen(false)
    onClick()
  }

  return (
    <div className={styles.eprintPartsContainer}>
      <div className={styles.imageContainer}>
        <Heading level={2} uiStyle={8} className={styles.sectionHeadingText}>
          Showing: {parts[selectedItem - 1].name}
        </Heading>
        <Image
          className={styles.productImage}
          src={parts[selectedItem - 1].image[0].url}
          alt={parts[selectedItem - 1].image[0].alternateName}
          width={1000}
          height={500}
          loading="lazy"
          sizes={`(max-width: ${breakpoints.tablet}) 100vw, 50vw`}
        />
      </div>
      <div className={styles.formContainer}>
        <div className={styles.subHeadingDescription}>
          {sku.name && (
            <Heading
              level={2}
              uiStyle={8}
              className={styles.sectionHeadingText}
            >
              {sku.name}
            </Heading>
          )}
          {sku.gtin && (
            <span className={styles.productDetails}>SKU {sku.gtin}</span>
          )}
          {supplierIds && (
            <span className={styles.productDetails}>
              Publisher ID: {supplierIds[product.sku]}
            </span>
          )}
        </div>
        <div className={styles.tableHeadingsRowEprint}>
          <table className={styles.eprintPartsTable}>
            <tbody className={styles.eprintPartsTbody}>
              <tr className={styles.tableRowEprint}>
                {tableHeadings.map((heading) => (
                  <th key={heading}>{heading}</th>
                ))}
              </tr>
              {parts.map((item, index: number) => {
                return (
                  <EprintPartsItem
                    sku={item}
                    key={index}
                    index={index + 1}
                    isSelected={selectedItem === index + 1}
                    setSelectedItem={setSelectedItem}
                    changeOrder={changeOrder}
                  />
                )
              })}
            </tbody>
          </table>
          <div className={styles.addToCartWrapper}>
            <Action
              as="button"
              color="neutralLight"
              size="medium"
              type="button"
              className={styles.cancelButton}
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </Action>
            <Action
              as="button"
              color="important"
              size="medium"
              type="button"
              className={styles.cartButton}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Action>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EprintPartsForm
