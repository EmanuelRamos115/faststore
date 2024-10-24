/* eslint-disable no-await-in-loop */
import { useCartToggleButton } from 'src/sdk/cart/useCartToggleButton'
import {
  useState,
  useEffect,
  useCallback,
  type Dispatch,
  type SetStateAction,
  type SyntheticEvent,
} from 'react'
import { type CartItem, cartStore } from 'src/sdk/cart'
import { gql } from '@generated/gql'
import { useUI } from '@faststore/ui'
import type {
  AddToCartMutation,
  AddToCartMutationVariables,
  ServerProductQueryQuery,
} from '@generated/graphql'
import { useLazyQuery } from 'src/sdk/graphql/useLazyQuery'
import { request } from 'src/sdk/graphql/request'

import FolderImprintingToggle from './FolderImprintingToggle'
import FolderImprintingCosts from './FolderImprintingCosts'
import FolderImprintingOptions from './FolderImprintingOptions'
import FolderImprintingLineOptions from './FolderImprintingLineOptions'
import FolderImprintingTable from './FolderImprintingTable'
import FolderImprintingTotalPrice from './FolderImprintingTotalPrice'
import ProductSkuSelector from '../ProductSkuSelector/ProductSkuSelector'
import ProductOptionsAddToCart from '../ProductOptionsForm/ProductOptionsAddToCart'
import FolderImprintingPreviewTooltip from './FolderImprintingPreviewTooltip'
import styles from './FolderImprintingForm.module.scss'
import { addToCart } from '../../utils/addToCart'
import {
  getSpec,
  getFolderImprintingSkuIds,
  getFolderImprintingAssemblyOptions,
} from '../../utils/productData'
import type {
  FolderImprintingCustomData,
  FolderImprintingFormStates,
  ImprintingType,
  LineType,
} from './FolderImprinting'

const ADD_FOLDER_IMPRINTING = gql(`
  mutation addFolderImprinting($data: String!) {
    addFolderImprinting(data: $data)
  }
`)

const REMOVE_FOLDER_IMPRINTING = gql(`
  mutation removeFolderImprinting($skuGtin: String) {
    removeFolderImprinting(skuGtin: $skuGtin)
  }
`)

const ADD_TO_CART = gql(`
  mutation addToCart($items: [ItemInput!]!) {
    addToCart(items: $items) {
      order {
        orderNumber
        acceptedOffer {
          ...CartItem
        }
      }
      messages {
        ...CartMessage
      }
    }
  }
`)

const REMOVE_FROM_CART = gql(`
  mutation removeFromCart($skuId: ID!) {
    removeFromCart(skuId: $skuId)
  }
`)

const MIDDLE_LINE_TYPE_OPTIONS = [
  { text: 'Different Line on Each Folder', value: 'diff' },
  { text: 'Repeat Line on Each Folder', value: 'repeat' },
]

const OTHER_LINE_TYPE_OPTIONS = [
  { text: 'Different Line on Each Folder', value: 'diff' },
  { text: 'Repeat Line on Each Folder', value: 'repeat' },
  { text: 'Assign Numbers', value: 'numbers' },
]

type FolderImprintingFormProps = {
  product: ServerProductQueryQuery['product']
  orderFormData?: FolderImprintingFormStates | null
}

const getItemId = (item: Pick<CartItem, 'itemOffered' | 'seller' | 'price'>) =>
  [
    item.itemOffered.sku,
    item.seller.identifier,
    item.itemOffered.additionalProperty
      ?.map(({ propertyID }) => propertyID)
      .join('-'),
  ]
    .filter(Boolean)
    .join('::')

const FolderImprintingForm = ({
  product,
  orderFormData,
}: FolderImprintingFormProps) => {
  const { pushToast } = useUI()
  const [firstRender, setFirstRender] = useState(true)

  const minSellQty =
    getSpec(product.additionalProperty, 'Minimum Sell Quantity') ?? 1

  const [imprintingEnabled, setImprintingEnabled] = useState(
    orderFormData?.imprintingEnabled ?? false
  )

  // Price tallys
  const [imprintingPrice, setImprintingPrice] = useState(0)
  const [folderPrice, setFolderPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // Imprinting option states
  const [imprintingType, setImprintingType] = useState<ImprintingType | ''>(
    orderFormData?.imprintingType ?? ''
  )

  const [quantity, setQuantity] = useState(
    orderFormData?.quantity ?? Number(minSellQty)
  )

  // Middle section states
  const [middleSectionPrice, setMiddleSectionPrice] = useState(3)
  const [middleSectionEnabled, setMiddleSectionEnabled] = useState(
    orderFormData?.middleSectionEnabled ?? false
  )

  const [middleLine1Type, setMiddleLine1Type] = useState<LineType>(
    orderFormData?.middleLine1Type ?? 'repeat'
  )

  const [middleLine1Text, setMiddleLine1Text] = useState(
    orderFormData?.middleLine1Text ?? ''
  )

  const [middleLine2Type, setMiddleLine2Type] = useState<LineType>(
    orderFormData?.middleLine2Type ?? 'repeat'
  )

  const [middleLine2Text, setMiddleLine2Text] = useState(
    orderFormData?.middleLine2Text ?? ''
  )

  // Upper section states
  const [upperSectionPrice] = useState(1)
  const [upperSectionEnabled, setUpperSectionEnabled] = useState(
    orderFormData?.upperSectionEnabled ?? false
  )

  const [upperLineType, setUpperLineType] = useState<LineType>(
    orderFormData?.upperLineType ?? 'repeat'
  )

  const [upperLineText, setUpperLineText] = useState(
    orderFormData?.upperLineText ?? ''
  )

  // Lower section states
  const [lowerSectionPrice] = useState(1)
  const [lowerSectionEnabled, setLowerSectionEnabled] = useState(
    orderFormData?.lowerSectionEnabled ?? false
  )

  const [lowerLineType, setLowerLineType] = useState<LineType>(
    orderFormData?.lowerLineType ?? 'repeat'
  )

  const [lowerLineText, setLowerLineText] = useState(
    orderFormData?.lowerLineText ?? ''
  )

  // Table section states
  const [middleLine1Table, setMiddleLine1Table] = useState<string[]>(
    orderFormData?.middleLine1Table ?? []
  )

  const [middleLine2Table, setMiddleLine2Table] = useState<string[]>(
    orderFormData?.middleLine2Table ?? []
  )

  const [upperLineTable, setUpperLineTable] = useState<string[]>(
    orderFormData?.upperLineTable ?? []
  )

  const [lowerLineTable, setLowerLineTable] = useState<string[]>(
    orderFormData?.lowerLineTable ?? []
  )

  // Prevent useEffect updates on first render
  useEffect(() => {
    setFirstRender(false)
  }, [])

  const middleLine1Quantity = middleLine1Table.filter(
    (text) => text?.trim().length > 0
  ).length

  const middleLine2Quantity = middleLine2Table.filter(
    (text) => text?.trim().length > 0
  ).length

  const upperQuantity = upperLineTable.filter(
    (text) => text?.trim().length > 0
  ).length

  const lowerQuantity = lowerLineTable.filter(
    (text) => text?.trim().length > 0
  ).length

  const middleQuantity = Math.max(middleLine1Quantity, middleLine2Quantity)

  // Calculate prices
  useEffect(() => {
    const imprintingTally =
      (middleSectionEnabled ? middleQuantity * middleSectionPrice : 0) +
      (upperSectionEnabled ? upperQuantity * upperSectionPrice : 0) +
      (lowerSectionEnabled ? lowerQuantity * lowerSectionPrice : 0)

    const folderTally = product.offers.offers[0].price * quantity

    setImprintingPrice(imprintingTally)
    setFolderPrice(folderTally)
    setTotalPrice(imprintingTally + folderTally)
  }, [
    middleSectionEnabled,
    upperSectionEnabled,
    lowerSectionEnabled,
    middleSectionPrice,
    upperSectionPrice,
    lowerSectionPrice,
    quantity,
    upperQuantity,
    lowerQuantity,
    middleQuantity,
  ])

  // Update costs on quantity change
  useEffect(() => {
    if (quantity <= 29) {
      setMiddleSectionPrice(3)
    } else if (quantity <= 49) {
      setMiddleSectionPrice(2)
    } else {
      setMiddleSectionPrice(0)
    }
  }, [quantity])

  // Reset line options and table values on imprint type change
  useEffect(() => {
    if (firstRender) {
      return
    }

    setMiddleSectionEnabled(false)
    setUpperSectionEnabled(false)
    setLowerSectionEnabled(false)
  }, [imprintingEnabled, imprintingType])

  // Reset line options and table values on section enabled change
  useEffect(() => {
    if (firstRender) {
      return
    }

    const type = imprintingType as LineType

    setMiddleLine1Text('')
    setMiddleLine2Text('')
    setMiddleLine1Type(type)
    setMiddleLine2Type(type)
  }, [middleSectionEnabled])

  useEffect(() => {
    if (firstRender) {
      return
    }

    setUpperLineType(imprintingType as LineType)
    setUpperLineText('')
  }, [upperSectionEnabled])

  useEffect(() => {
    if (firstRender) {
      return
    }

    setLowerLineType(imprintingType as LineType)
    setLowerLineText('')
  }, [lowerSectionEnabled])

  // Add default value on line type changes
  useEffect(() => {
    if (firstRender) {
      return
    }

    setMiddleLine1Text('')
  }, [middleLine1Type])

  useEffect(() => {
    if (firstRender) {
      return
    }

    setMiddleLine2Text('')
  }, [middleLine2Type])

  useEffect(() => {
    if (firstRender) {
      return
    }

    setUpperLineText(upperLineType === 'numbers' ? '1' : '')
  }, [upperLineType])

  useEffect(() => {
    if (firstRender) {
      return
    }

    setLowerLineText(lowerLineType === 'numbers' ? '1' : '')
  }, [lowerLineType])

  // Helpers for repeatable table columns
  const createRepeatTextArray = (value: string, length: number): string[] => {
    return [...(Array(length) as undefined[])].map((_): string => value)
  }

  const createIncreasingNumbersArray = (
    startNumber: string,
    length: number
  ): string[] => {
    return Array.from({ length }, (_, i) => String(i + Number(startNumber)))
  }

  const handleRepeatableStateChanges = useCallback(
    ({
      lineType,
      textValue = '',
      setTableLines,
    }: {
      lineType: string
      textValue: string
      setTableLines: Dispatch<SetStateAction<string[]>>
    }) => {
      if (lineType === 'diff') {
        setTableLines(createRepeatTextArray('', quantity))
      } else if (lineType === 'repeat') {
        setTableLines(createRepeatTextArray(textValue, quantity))
      } else if (lineType === 'numbers') {
        const startNumber = Number(textValue) ? textValue : '1'

        setTableLines(createIncreasingNumbersArray(startNumber, quantity))
      }
    },
    [quantity]
  )

  // Update table columns on quantity changes
  useEffect(() => {
    if (firstRender) {
      return
    }

    if (middleLine1Type !== 'diff') {
      handleRepeatableStateChanges({
        lineType: middleLine1Type,
        textValue: middleLine1Text,
        setTableLines: setMiddleLine1Table,
      })
    }

    if (middleLine2Type !== 'diff') {
      handleRepeatableStateChanges({
        lineType: middleLine2Type,
        textValue: middleLine2Text,
        setTableLines: setMiddleLine2Table,
      })
    }

    if (upperLineType !== 'diff') {
      handleRepeatableStateChanges({
        lineType: upperLineType,
        textValue: upperLineText,
        setTableLines: setUpperLineTable,
      })
    }

    if (lowerLineType !== 'diff') {
      handleRepeatableStateChanges({
        lineType: lowerLineType,
        textValue: lowerLineText,
        setTableLines: setLowerLineTable,
      })
    }
  }, [quantity])

  // Update table columns on line type changes
  useEffect(() => {
    if (firstRender) {
      return
    }

    handleRepeatableStateChanges({
      lineType: middleLine1Type,
      textValue: middleLine1Text,
      setTableLines: setMiddleLine1Table,
    })
  }, [middleSectionEnabled, middleLine1Type, middleLine1Text])

  useEffect(() => {
    if (firstRender) {
      return
    }

    handleRepeatableStateChanges({
      lineType: middleLine2Type,
      textValue: middleLine2Text,
      setTableLines: setMiddleLine2Table,
    })
  }, [middleSectionEnabled, middleLine2Type, middleLine2Text])

  useEffect(() => {
    if (firstRender) {
      return
    }

    handleRepeatableStateChanges({
      lineType: upperLineType,
      textValue: upperLineText,
      setTableLines: setUpperLineTable,
    })
  }, [upperSectionEnabled, upperLineType, upperLineText])

  useEffect(() => {
    if (firstRender) {
      return
    }

    handleRepeatableStateChanges({
      lineType: lowerLineType,
      textValue: lowerLineText,
      setTableLines: setLowerLineTable,
    })
  }, [lowerSectionEnabled, lowerLineType, lowerLineText])

  // Add to Cart
  const [addingToCart, setAddingToCart] = useState(false)
  const { onClick: toggleCart } = useCartToggleButton()
  const [addFolderImprinting] = useLazyQuery(ADD_FOLDER_IMPRINTING, {})
  const [removeFolderImprinting] = useLazyQuery(REMOVE_FOLDER_IMPRINTING, {})
  const [removeFromCart] = useLazyQuery(REMOVE_FROM_CART, {})

  const cart = cartStore.read()
  const folderImprintingAssemblyOptions =
    getFolderImprintingAssemblyOptions(product)

  const folderImprintingSkuIds = getFolderImprintingSkuIds(product)

  const cartItemId = cart.items.find(
    (item) => item.itemOffered.gtin === product.gtin
  )?.id

  const orderFormAssemblyOptions = () => {
    if (!folderImprintingAssemblyOptions) {
      return []
    }

    const combinations: Array<{
      hasMiddle: boolean
      hasUpper: boolean
      hasLower: boolean
      quantity: number
      options: Array<{
        assemblyId: string
        quantity: number
        id: string
        seller: string
        inputValues: string[]
      }>
    }> = []

    const sharedValues = {
      assemblyId: folderImprintingAssemblyOptions.id,
      quantity: 1,
      seller: '1',
      inputValues: [] as string[],
    }

    for (let i = 0; i < quantity; i++) {
      const hasMiddle =
        middleLine1Table?.[i]?.trim().length > 0 ||
        middleLine2Table?.[i]?.trim().length > 0

      const hasUpper = upperLineTable?.[i]?.trim().length > 0
      const hasLower = lowerLineTable?.[i]?.trim().length > 0

      const options: Array<{
        assemblyId: string
        quantity: number
        id: string
        seller: string
        inputValues: string[]
      }> = [
        {
          ...sharedValues,
          quantity: hasMiddle && folderImprintingSkuIds?.middleSection ? 1 : 0,
          id: folderImprintingSkuIds?.middleSection ?? '',
        },
        {
          ...sharedValues,
          quantity: hasUpper && folderImprintingSkuIds?.upperSection ? 1 : 0,
          id: folderImprintingSkuIds?.upperSection ?? '',
        },
        {
          ...sharedValues,
          quantity: hasLower && folderImprintingSkuIds?.lowerSection ? 1 : 0,
          id: folderImprintingSkuIds?.lowerSection ?? '',
        },
      ]

      const combinationIndex = combinations.findIndex(
        (combination) =>
          combination.hasMiddle === hasMiddle &&
          combination.hasUpper === hasUpper &&
          combination.hasLower === hasLower
      )

      if (combinationIndex === -1) {
        combinations.push({
          hasMiddle,
          hasUpper,
          hasLower,
          quantity: 1,
          options,
        })
      } else {
        combinations[combinationIndex].quantity += 1
      }
    }

    return combinations
  }

  const orderFormCustomData = (): FolderImprintingCustomData => {
    const customData: FolderImprintingCustomData = {
      [product.gtin]: {
        quantity,
        type: imprintingType,
        text: [],
      },
    }

    if (imprintingType === 'repeat') {
      customData[product.gtin].text.push({
        ...(middleSectionEnabled && { middleLine1: middleLine1Text }),
        ...(middleSectionEnabled && { middleLine2: middleLine2Text }),
        ...(upperSectionEnabled && { upperLine: upperLineText }),
        ...(lowerSectionEnabled && { lowerLine: lowerLineText }),
      })
    } else {
      for (let i = 0; i < quantity; i++) {
        customData[product.gtin].text.push({
          ...(middleSectionEnabled && { middleLine1: middleLine1Table[i] }),
          ...(middleSectionEnabled && { middleLine2: middleLine2Table[i] }),
          ...(upperSectionEnabled && { upperLine: upperLineTable[i] }),
          ...(lowerSectionEnabled && { lowerLine: lowerLineTable[i] }),
        })
      }
    }

    return customData
  }

  const handleAddToCartWithImprinting = (e: SyntheticEvent | null) => {
    e?.preventDefault()

    setAddingToCart(true)

    void (async () => {
      try {
        let imprintingPromise

        if (cartItemId) {
          await removeFromCart({ skuId: product.id })
        }

        if (
          !middleSectionEnabled &&
          !upperSectionEnabled &&
          !lowerSectionEnabled
        ) {
          imprintingPromise = await removeFolderImprinting({
            skuGtin: product.gtin,
          })
        } else {
          imprintingPromise = await addFolderImprinting({
            orderFormId: cart.id,
            data: JSON.stringify(orderFormCustomData()),
          })
        }

        const combinations = orderFormAssemblyOptions()

        let addToCartPromise

        for (const combination of combinations) {
          // eslint-disable-next-line no-await-in-loop
          addToCartPromise = await request<
            AddToCartMutation,
            AddToCartMutationVariables
          >(ADD_TO_CART, {
            items: [
              {
                id: Number(product.id),
                quantity: combination.quantity,
                options: combination.options,
                seller: '1',
                uniqueId: '',
                inputValues: [] as string[],
              },
            ],
          })
        }

        const newCart = addToCartPromise?.addToCart

        if (newCart) {
          cartStore.set({
            id: newCart.order.orderNumber,
            items: newCart.order.acceptedOffer.map((item) => ({
              ...item,
              id: getItemId(item),
            })),
            messages: newCart.messages,
          })
        }

        await Promise.all([imprintingPromise, addToCartPromise])

        // need to do a hard refresh to bypass optimistic cart
        window.location.href = '/cart'
      } catch (error) {
        console.error(error)

        pushToast({
          title: 'Error!',
          message:
            'There was an error adding product to cart. Please try again.',
          status: 'ERROR',
        })
      }

      setAddingToCart(false)
    })()
  }

  const handleAddToCartDefault = () => {
    if (orderFormData) {
      handleAddToCartWithImprinting(null)

      return
    }

    addToCart({
      sku: product,
      isVariantOf: product.isVariantOf,
      brand: product.brand,
      quantity,
      timestamp: Date.now(),
    })

    toggleCart()
  }

  return (
    <>
      <ProductSkuSelector product={product} />

      <section className={styles.container}>
        <FolderImprintingToggle
          imprintingEnabled={imprintingEnabled}
          setImprintingEnabled={setImprintingEnabled}
        />

        {imprintingEnabled && <FolderImprintingCosts />}

        {imprintingEnabled && (
          <div className={styles.formContainer}>
            <FolderImprintingOptions
              imprintingType={imprintingType}
              setImprintingType={setImprintingType}
              quantity={quantity}
              setQuantity={setQuantity}
            />

            <form
              className={styles.form}
              id="lineOptionsForm"
              onSubmit={handleAddToCartWithImprinting}
            >
              {imprintingType && (
                <div className={styles.lineOptionsContainer}>
                  <div className={styles.lineOptions}>
                    <FolderImprintingPreviewTooltip
                      refId={product.gtin}
                      middleLine1Text={middleLine1Text}
                      middleLine2Text={middleLine2Text}
                      upperLineText={upperLineText}
                      lowerLineText={lowerLineText}
                    />

                    {folderImprintingSkuIds?.middleSection && (
                      <div className={styles.lineOption}>
                        <FolderImprintingLineOptions
                          section={{
                            title: 'Middle Lines',
                            enabled: middleSectionEnabled,
                            setEnabled: setMiddleSectionEnabled,
                          }}
                          fields={{
                            repeat: [
                              {
                                type: 'text',
                                label: 'Middle Line 1 (max 25 characters)',
                                labelStyle: 'bold',
                                name: 'middleLine1Text',
                                value: middleLine1Text,
                                onChange: setMiddleLine1Text,
                              },
                              {
                                type: 'text',
                                label: 'Middle Line 2 (max 25 characters)',
                                labelStyle: 'bold',
                                name: 'middleLine2Text',
                                value: middleLine2Text,
                                onChange: setMiddleLine2Text,
                              },
                            ],
                            diff: [
                              {
                                type: 'select',
                                label: 'Middle Line 1',
                                labelStyle: 'bold',
                                name: 'middleLine1Type',
                                value: middleLine1Type,
                                options: MIDDLE_LINE_TYPE_OPTIONS,
                                onChange: setMiddleLine1Type as Dispatch<
                                  SetStateAction<string>
                                >,
                              },
                              {
                                type: 'text',
                                label: 'Text to repeat (max 25 characters)',
                                name: 'middleLine1Text',
                                value: middleLine1Text,
                                hidden: middleLine1Type !== 'repeat',
                                onChange: setMiddleLine1Text,
                              },
                              {
                                type: 'select',
                                label: 'Middle Line 2',
                                labelStyle: 'bold',
                                name: 'middleLine2Type',
                                value: middleLine2Type,
                                options: MIDDLE_LINE_TYPE_OPTIONS,
                                onChange: setMiddleLine2Type as Dispatch<
                                  SetStateAction<string>
                                >,
                              },
                              {
                                type: 'text',
                                label: 'Text to repeat (max 25 characters)',
                                name: 'middleLine2Text',
                                value: middleLine2Text,
                                hidden: middleLine2Type !== 'repeat',
                                onChange: setMiddleLine2Text,
                              },
                            ],
                          }}
                          maxCharacters={25}
                          price={middleSectionPrice}
                          quantity={middleQuantity}
                          imprintingType={imprintingType}
                        />
                      </div>
                    )}

                    {folderImprintingSkuIds?.upperSection && (
                      <div className={styles.lineOption}>
                        <FolderImprintingLineOptions
                          section={{
                            title: 'Upper Right',
                            enabled: upperSectionEnabled,
                            setEnabled: setUpperSectionEnabled,
                          }}
                          fields={{
                            repeat: [
                              {
                                type: 'text',
                                label: 'Upper Right (max 20 characters)',
                                labelStyle: 'bold',
                                name: 'upperLineText',
                                value: upperLineText,
                                onChange: setUpperLineText,
                              },
                            ],
                            diff: [
                              {
                                type: 'select',
                                label: 'Upper Right',
                                labelStyle: 'bold',
                                name: 'upperLineType',
                                value: upperLineType,
                                options: OTHER_LINE_TYPE_OPTIONS,
                                onChange: setUpperLineType as Dispatch<
                                  SetStateAction<string>
                                >,
                              },
                              {
                                type: 'text',
                                label: 'Text to repeat (max 20 characters)',
                                name: 'upperLineText',
                                value: upperLineText,
                                hidden: upperLineType !== 'repeat',
                                onChange: setUpperLineText,
                              },
                              {
                                type: 'number',
                                label: 'Start with the number',
                                name: 'upperLineNumbers',
                                value: upperLineText,
                                hidden: upperLineType !== 'numbers',
                                onChange: setUpperLineText,
                              },
                            ],
                          }}
                          maxCharacters={20}
                          price={upperSectionPrice}
                          quantity={upperQuantity}
                          imprintingType={imprintingType}
                        />
                      </div>
                    )}

                    {folderImprintingSkuIds?.lowerSection && (
                      <div className={styles.lineOption}>
                        <FolderImprintingLineOptions
                          section={{
                            title: 'Lower Right',
                            enabled: lowerSectionEnabled,
                            setEnabled: setLowerSectionEnabled,
                          }}
                          fields={{
                            repeat: [
                              {
                                type: 'text',
                                label: 'Lower Right (max 20 characters)',
                                labelStyle: 'bold',
                                name: 'lowerLineText',
                                value: lowerLineText,
                                onChange: setLowerLineText,
                              },
                            ],
                            diff: [
                              {
                                type: 'select',
                                label: 'Lower Right',
                                labelStyle: 'bold',
                                name: 'lowerLineType',
                                value: lowerLineType,
                                options: OTHER_LINE_TYPE_OPTIONS,
                                onChange: setLowerLineType as Dispatch<
                                  SetStateAction<string>
                                >,
                              },
                              {
                                type: 'text',
                                label: 'Text to repeat (max 20 characters)',
                                name: 'lowerLineText',
                                value: lowerLineText,
                                hidden: lowerLineType !== 'repeat',
                                onChange: setLowerLineText,
                              },
                              {
                                type: 'number',
                                label: 'Start with the number',
                                name: 'lowerLineNumbers',
                                value: lowerLineText,
                                hidden: lowerLineType !== 'numbers',
                                onChange: setLowerLineText,
                              },
                            ],
                          }}
                          maxCharacters={20}
                          price={lowerSectionPrice}
                          quantity={lowerQuantity}
                          imprintingType={imprintingType}
                        />
                      </div>
                    )}
                  </div>

                  {imprintingType === 'diff' && (
                    <FolderImprintingTable
                      rowCount={quantity}
                      refId={product.gtin}
                      fields={[
                        {
                          tableHeader: 'Middle Line 1',
                          values: middleLine1Table,
                          maxCharacters: 25,
                          setTableState: setMiddleLine1Table,
                          disabled: !middleSectionEnabled,
                        },
                        {
                          tableHeader: 'Middle Line 2',
                          values: middleLine2Table,
                          maxCharacters: 25,
                          setTableState: setMiddleLine2Table,
                          disabled: !middleSectionEnabled,
                        },
                        {
                          tableHeader: 'Upper Right',
                          values: upperLineTable,
                          maxCharacters: 20,
                          setTableState: setUpperLineTable,
                          disabled: !upperSectionEnabled,
                        },
                        {
                          tableHeader: 'Lower Right',
                          values: lowerLineTable,
                          maxCharacters: 20,
                          setTableState: setLowerLineTable,
                          disabled: !lowerSectionEnabled,
                        },
                      ]}
                    />
                  )}

                  <FolderImprintingTotalPrice
                    quantity={quantity}
                    imprintingPrice={imprintingPrice}
                    folderPrice={folderPrice}
                    totalPrice={totalPrice}
                  />
                </div>
              )}
            </form>
          </div>
        )}
      </section>

      <ProductOptionsAddToCart
        product={product}
        quantity={quantity}
        minSellQty={Number(minSellQty)}
        setQuantity={setQuantity}
        handleAddToCart={imprintingEnabled ? undefined : handleAddToCartDefault}
        hideQuantity={imprintingEnabled}
        loading={addingToCart}
        formId={imprintingEnabled ? 'lineOptionsForm' : undefined}
        buttonText={orderFormData ? 'Update' : 'Add to Cart'}
      />
    </>
  )
}

export default FolderImprintingForm
