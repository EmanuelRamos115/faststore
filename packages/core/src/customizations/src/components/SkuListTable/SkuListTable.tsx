/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useEffect, useState } from 'react'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'
import { useRouter } from 'next/router'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetSubcollectionIdQuery } from '@generated/graphql'
import { gql } from '@generated/gql'
import { useQuery_unstable as useQuery } from '@faststore/core/experimental'

import type { FormData } from '../../typings/props'
import { removeExtraParts } from '../../utils/productData'
import Action from '../Action/Action'
import SkuListItem from './SkuListItem'
import styles from './SkuListTable.module.scss'
import { addToCart } from '../../utils/addToCart'
import type { Product, ProductFullVariantList } from '../../typings/product'

const tableHeadings = [
  'Description',
  'Delivery',
  'Level',
  'Preview',
  'Save',
  'Price',
  'Add Qty',
]

export type AddToCartParams = {
  sku: Product | ProductFullVariantList[0]
  quantity: number
}

export type OrderProducts = {
  [key: string]: {
    quantity: number
  }
}

type SkuListTableProps = {
  product: Product
  isPLP?: boolean
  isClusterPage?: boolean
}

const GET_SUBCOLLECTIONS = gql(`
    query getSubcollectionId($collectionId: String!){
      getSubcollectionId(collectionId: $collectionId) {
        Data {
          SkuId
        }
      }
    }
  `)

const SkuListTable = ({ product, isPLP, isClusterPage }: SkuListTableProps) => {
  const { onClick } = useCartToggleButton()
  const [skusToDisplay, setSkusToDisplay] = useState(removeExtraParts(product))
  const [orderProducts, setOrderProducts] = useState<FormData>({})
  const [selected, setSelected] = useState(!isPLP && product.id)

  const { query } = useRouter()
  const { collectionId } = query

  const data = isClusterPage
    ? useQuery<GetSubcollectionIdQuery>(GET_SUBCOLLECTIONS, {
        collectionId,
      })
    : null

  useEffect(() => {
    if (!data || !data.data) {
      return
    }

    const skusOfSubcollection =
      data.data.getSubcollectionId?.Data?.map((item) => item?.SkuId) ?? []

    setSkusToDisplay(
      isClusterPage
        ? skusToDisplay.filter((item) =>
            skusOfSubcollection.includes(Number(item.sku))
          )
        : skusToDisplay
    )
  }, [data?.data])

  const changeOrderDesktop = (value: number, id: string) => {
    if (value > 0) {
      setOrderProducts((prevState) => ({
        ...prevState,
        [id]: {
          quantity: value,
        },
      }))
    } else {
      setOrderProducts((prevState) => {
        return Object.keys(prevState)
          .filter((objKey) => objKey !== id)
          .reduce((newState: OrderProducts, key) => {
            newState[key] = prevState[key]

            return newState
          }, {})
      })
    }
  }

  const handleAddToCartDesktop = () => {
    const timestamp = Date.now()
    const chosenSkus = [] as ProductFullVariantList

    Object.keys(orderProducts).forEach((skuProductID) => {
      const skuMatch = product.isVariantOf.fullVariantList.find(
        (sku) => sku.productID === skuProductID
      )

      if (skuMatch) {
        chosenSkus.push(skuMatch)
      }
    })

    chosenSkus.forEach((sku) =>
      addToCart({
        sku,
        isVariantOf: product.isVariantOf,
        brand: product.brand,
        quantity: orderProducts[sku.productID].quantity,
        timestamp,
      })
    )

    onClick()
    setOrderProducts({})
  }

  if (skusToDisplay.length < 1) {
    return <></>
  }

  return (
    <div className={styles.skuListTableWrapper}>
      <div>
        <div className={styles.tableHeadingsRow}>
          {tableHeadings.map((heading) => (
            <span key={heading} className={styles.tableHeading}>
              {heading}
            </span>
          ))}
        </div>

        <div className={styles.dataWrapper}>
          {skusToDisplay.map((sku) => {
            return (
              <SkuListItem
                key={sku.gtin}
                sku={sku}
                product={product}
                isSelected={selected === sku.productID}
                setSelected={setSelected}
                isPLP={isPLP}
                changeOrderDesktop={changeOrderDesktop}
                orderProducts={orderProducts}
              />
            )
          })}
        </div>
      </div>

      <div className={styles.addToCartWrapper}>
        <Action
          as="button"
          color="important"
          size="large"
          type="button"
          onClick={handleAddToCartDesktop}
          disabled={!Object.keys(orderProducts).length}
        >
          Add to Cart
        </Action>
      </div>
    </div>
  )
}

export default SkuListTable
