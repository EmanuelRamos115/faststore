import { useState, useEffect } from 'react'
import type {
  ServerProductQueryQuery,
  GetOrderFormQuery,
} from '@generated/graphql'
import { gql } from '@generated/gql'
import { useLazyQuery } from 'src/sdk/graphql/useLazyQuery'
import { useQuery } from 'src/sdk/graphql/useQuery'
import { cartStore } from 'src/sdk/cart'
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'

import Action from '../Action/Action'
import AdditionalPartsItem from './AdditionalPartsItem'
import Heading from '../Heading/Heading'
import styles from './OrderExtraParts.module.scss'
import { addToCart } from '../../utils/addToCart'
import type { ClientManyProductsQueryQueryProductEdges } from '../../typings/product'
import { getCustomDataFields } from '../../utils/orderForm'
import { parseJson } from '../../utils/parseJson'
import type { PartsNames } from '../../typings/props'
import type { CustomDataOpenExtraParts } from '../../typings/orderForm'

const ADD_EXTRA_PARTS = gql(`
  mutation addExtraParts($extraOrderData: String!) {
    addExtraParts(extraOrderData: $extraOrderData)
  }
`)

const GET_ORDER_FORM = gql(`
  query getOrderForm($id: String!) {
    orderForm(id: $id) {
      orderFormId
      customData {
        customApps {
          id
          major
          fields {
            key
            value
          }
        }
      }
    }
  }
`)

const tableHeadings = ['Qty', 'Parts', 'Price']

const parts = {
  part1: {
    part: '',
    qty: 0,
  },
  part2: {
    part: '',
    qty: 0,
  },
  part3: {
    part: '',
    qty: 0,
  },
  part4: {
    part: '',
    qty: 0,
  },
  part5: {
    part: '',
    qty: 0,
  },
}

type FormData = {
  [key: string]: {
    part: string
    qty: number
  }
}

type AdditionalPartsFormProps = {
  product:
    | ServerProductQueryQuery['product']
    | ClientManyProductsQueryQueryProductEdges[0]['node']
  setShowDisclaimer: (arg: boolean) => void
  setModalIsOpen: (arg: boolean) => void
  sku: ServerProductQueryQuery['product']['isVariantOf']['fullVariantList'][0]
  traditionalParts: ServerProductQueryQuery['product']['isVariantOf']['fullVariantList']
}

const AdditionalPartsForm = ({
  product,
  setShowDisclaimer,
  setModalIsOpen,
  sku,
  traditionalParts,
}: AdditionalPartsFormProps) => {
  const [formData, setFormData] = useState<FormData>(parts)
  const [addExtraParts] = useLazyQuery(ADD_EXTRA_PARTS, {})
  const { onClick: openCartDrawer } = useCartToggleButton()
  const partSku = traditionalParts.find((item) => item.gtin.includes(sku.gtin))
  const partsFields = Object.keys(parts) as PartsNames[]
  const cart = cartStore.read()
  const cartItemId = cart.items.find(
    (item) => item.itemOffered.gtin === partSku?.gtin
  )?.id

  const { data: orderFormData } = useQuery<GetOrderFormQuery>(GET_ORDER_FORM, {
    id: cart.id,
  })

  useEffect(() => {
    if (!orderFormData?.orderForm?.customData?.customApps || !partSku) {
      return
    }

    const openExtraPartsString = getCustomDataFields({
      orderForm: orderFormData,
      appId: 'extraparts',
    })?.[0].value

    const openExtraParts =
      parseJson<CustomDataOpenExtraParts>(openExtraPartsString)?.[partSku.gtin]

    setFormData((prevData) => {
      const openExtraPartsData = openExtraParts?.reduce(
        (acc, part, i): FormData => {
          return {
            ...acc,
            [`part${i + 1}`]: {
              part: part.part,
              qty: part.qty,
            },
          }
        },
        {}
      )

      return {
        ...prevData,
        ...openExtraPartsData,
      }
    })
  }, [orderFormData])

  const handleAddToCart = () => {
    if (!partSku) {
      return
    }

    const orders = Object.keys(formData)
      .filter((item) => formData[item].qty > 0 && formData[item].part)
      .map((item) => {
        return {
          qty: formData[item].qty,
          part: formData[item].part,
        }
      })

    const totalQuantity = orders.reduce((sum, { qty }) => sum + qty, 0) ?? 1

    if (cartItemId) {
      cartStore.updateItemQuantity(cartItemId, totalQuantity)
    } else {
      addToCart({
        sku: partSku,
        isVariantOf: product.isVariantOf,
        brand: product.brand,
        quantity: totalQuantity,
        timestamp: Date.now(),
      })
    }

    void (async () => {
      await addExtraParts({
        extraOrderData: JSON.stringify({
          [partSku.gtin]: orders,
        }),
      }).catch((error) => console.error(error))

      setModalIsOpen(false)
      openCartDrawer()
    })()
  }

  const handleInputChange = (event: {
    target: { name: string; value: string }
  }) => {
    const { name, value } = event.target

    setFormData((prevState) => ({
      ...prevState,
      [name]: {
        part: value,
        qty: prevState[name].qty,
      },
    }))
  }

  const handleQuantityChange = (value: number, name: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: {
        part: prevState[name].part,
        qty: value,
      },
    }))
  }

  return (
    <div className={styles.addPartsContainer}>
      <div className={styles.formContainer}>
        <Heading level={2} uiStyle={4}>
          Additional parts
        </Heading>
        <p className={styles.headingDescription}>
          Additional parts are non-stock items that will result in us placing a
          publisher order for you.
        </p>
        <Heading level={2} uiStyle={8} className={styles.sectionHeadingText}>
          {sku.name}
        </Heading>
        <Heading level={3} uiStyle={8} className={styles.sectionHeadingText}>
          SKU {sku.gtin}
        </Heading>
        <div className={styles.addToCartDisclaimerWrapper}>
          <Action
            as="button"
            color="naked"
            size="large"
            type="button"
            className={styles.link}
            onClick={() => setShowDisclaimer(true)}
          >
            Disclaimer - Please Read
          </Action>
        </div>
        <p className={styles.headingDescription}>
          <span className={styles.boldText}>Note:</span> The parts requested
          must be a valid part relevant to the original set.
        </p>
        <Heading level={2} uiStyle={8} className={styles.sectionHeadingText}>
          Non Score Parts Ordering
        </Heading>
        <div className={styles.tableHeadingsRow}>
          <form action="sample">
            <table className={styles.additionalPartsTable}>
              <tbody>
                <tr className={styles.tableHeadingsRow}>
                  {tableHeadings.map((heading) => (
                    <th key={heading}>{heading}</th>
                  ))}
                </tr>
                {partsFields.map((fieldName) => {
                  return (
                    <AdditionalPartsItem
                      key={fieldName}
                      name={fieldName}
                      values={formData[fieldName]}
                      handleInputChange={handleInputChange}
                      handleQuantityChange={handleQuantityChange}
                      price={partSku ? partSku?.offers.offers[0].price : 0}
                      warning={
                        formData[fieldName].qty > 0 && !formData[fieldName].part
                      }
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdditionalPartsForm
