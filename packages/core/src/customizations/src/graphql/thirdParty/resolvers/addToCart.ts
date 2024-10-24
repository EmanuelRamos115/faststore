/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable spaced-comment */

import type { MutationAddToCartArgs } from '@generated/graphql'

import { getSessionFromContext } from './sessionToken'
import { account } from '../../../../faststore.config'
import { getOrderFormIdFromContext } from './orderForm'
import type { Context } from './context'

const orderFormToCart = async (
  form: any,
  skuLoader: Context['loaders']['skuLoader']
) => {
  return {
    order: {
      orderNumber: form.id,
      acceptedOffer: await Promise.all(
        form.items.map(async (item: any) => ({
          ...item,
          tax: 0,
          product: await skuLoader.load(item.id),
        }))
      ),
    },
    messages: form.messages.generalMessages.map(({ text, status }: any) => ({
      text,
      status: status?.toUpperCase(),
    })),
  }
}

const QUERY = `
  mutation addToCart($orderFormId: ID!, $items: [ItemInput!]) {
    addToCart(orderFormId: $orderFormId, items: $items)
      @context(provider: "vtex.checkout-graphql") {
        ...OrderFormFragment
    }
  }

  fragment OrderFormFragment on OrderForm {
    id
    items {
      ...ItemFragment
    }
    canEditData
    loggedIn
    userProfileId
    userType
    marketingData {
      coupon
      utmCampaign
      utmMedium
      utmSource
      utmiCampaign
      utmiPart
      utmiPage
    }
    totalizers {
      id
      name
      value
    }
    shipping {
      countries
      availableAddresses {
        ...Address
      }
      selectedAddress {
        ...Address
      }
      deliveryOptions {
        id
        deliveryChannel
        price
        estimate
        isSelected
      }
      pickupOptions {
        id
        address {
          ...Address
        }
        deliveryChannel
        price
        estimate
        isSelected
        friendlyName
        additionalInfo
        storeDistance
        transitTime
        businessHours {
          dayNumber
          closed
          closingTime
          openingTime
        }
      }
      isValid
    }
    paymentData {
      paymentSystems {
        id
        name
        groupName
        validator {
          regex
          mask
          cardCodeRegex
          cardCodeMask
          weights
          useCvv
          useExpirationDate
          useCardHolderName
          useBillingAddress
        }
        stringId
        requiresDocument
        isCustom
        description
        requiresAuthentication
        dueDate
      }
      payments {
        paymentSystem
        bin
        accountId
        tokenId
        installments
        referenceValue
        value
      }
      installmentOptions {
        paymentSystem
        installments {
          count
          hasInterestRate
          interestRate
          value
          total
        }
      }
      availableAccounts {
        accountId
        paymentSystem
        paymentSystemName
        cardNumber
        bin
      }
      isValid
    }
    clientProfileData {
      email
      firstName
      lastName
      document
      documentType
      phone
      isValid
    }
    clientPreferencesData {
      locale
      optInNewsletter
    }
    messages {
      couponMessages {
        code
      }
      generalMessages {
        code
        text
        status
      }
    }
    value
    allowManualPrice
    customData {
      customApps {
        fields
        id
        major
      }
    }
  }

  fragment Address on Address {
    addressId
    addressType
    city
    complement
    country
    neighborhood
    number
    postalCode
    receiverName
    reference
    state
    street
    isDisposable
    geoCoordinates
  }

  fragment ItemFragment on Item {
    additionalInfo {
      brandName
    }
    attachments {
      name
      content
    }
    attachmentOfferings {
      name
      required
      schema
    }
    bundleItems {
      ...BundleItemFragment
    }
    parentAssemblyBinding
    parentItemIndex
    sellingPriceWithAssemblies
    options {
      assemblyId
      id
      quantity
      seller
      inputValues
      options {
        assemblyId
        id
        quantity
        seller
        inputValues
        options {
          assemblyId
          id
          quantity
          seller
          inputValues
        }
      }
    }
    availability
    detailUrl
    id
    imageUrls {
      at1x
      at2x
      at3x
    }
    listPrice
    manualPrice
    measurementUnit
    modalType
    name
    offerings {
      id
      name
      price
      type
      attachmentOfferings {
        name
        required
        schema
      }
    }
    price
    priceTags {
      identifier
      isPercentual
      name
      rawValue
      value
    }
    productCategories
    productCategoryIds
    productRefId
    productId
    quantity
    seller
    sellingPrice
    skuName
    skuSpecifications {
      fieldName
      fieldValues
    }
    unitMultiplier
    uniqueId
    refId
    priceTags {
      identifier
      isPercentual
      rawValue
      value
      name
      ratesAndBenefitsIdentifier {
        description
        id
        featured
        name
        matchedParameters
      }
    }
    isGift
    priceDefinition {
      calculatedSellingPrice
      total
      sellingPrices {
        quantity
        value
      }
    }
  }

  fragment BundleItemFragment on Item {
    additionalInfo {
      brandName
    }
    attachments {
      name
      content
    }
    attachmentOfferings {
      name
      required
      schema
    }
    availability
    detailUrl
    id
    imageUrls {
      at1x
      at2x
      at3x
    }
    listPrice
    measurementUnit
    name
    offerings {
      id
      name
      price
      type
      attachmentOfferings {
        name
        required
        schema
      }
    }
    price
    productCategories
    productCategoryIds
    productRefId
    productId
    quantity
    seller
    sellingPrice
    skuName
    skuSpecifications {
      fieldName
      fieldValues
    }
    unitMultiplier
    uniqueId
    refId
  }
`

// Proxy to checkout-graphql addToCart
export async function addToCart(
  _: unknown,
  args: MutationAddToCartArgs,
  context: Context
) {
  const token = getSessionFromContext(context)
  const orderFormId = getOrderFormIdFromContext(context)

  if (!token) {
    throw new Error('Unauthorized')
  }

  const response = await fetch(
    `https://${account}.myvtex.com/_v/private/graphql/v1`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        cookie: `vtex_session=${token}`,
      },
      body: JSON.stringify({
        operationName: 'addToCart',
        query: QUERY,
        variables: {
          orderFormId,
          items: args.items,
        },
      }),
    }
  )

  const { data, errors } = await response.json()

  if (errors && errors.length > 0) {
    throw new Error(errors[0].message)
  }

  if (!data) {
    throw new Error('Internal server error.')
  }

  return orderFormToCart(data.addToCart, context.loaders.skuLoader)
}
