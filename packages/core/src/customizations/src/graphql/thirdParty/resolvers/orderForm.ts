import type {
  MutationAddExtraPartsArgs,
  MutationRemoveExtraPartsArgs,
  MutationAddFolderImprintingArgs,
  MutationRemoveFolderImprintingArgs,
  QueryOrderFormArgs,
  CustomApp,
  QueryCustomDataArgs,
} from '@generated/graphql'

import {
  getOrderForm,
  addOrUpdateCustomData,
  deleteCustomData,
  getCustomDataField,
} from '../../clients/vtex/orderForm'
import type {
  CustomDataOpenExtraParts,
  CustomDataFolderImprinting,
} from '../../../typings/orderForm'
import {
  CUSTOM_DATA_APP_ID as FOLDER_IMPRINTING_APP_ID,
  CUSTOM_DATA_FIELD as FOLDER_IMPRINTING_FIELD_NAME,
} from '../../../constants/folderImprinting'
import { parseJson } from '../../../utils/parseJson'
import type { Context } from './context'

const EXTRA_PARTS_APP_ID = 'extraparts'
const EXTRA_PARTS_FIELD_NAME = 'orders'

export const getOrderFormIdFromContext = (context: Context) => {
  const [, , orderFormId] =
    context.headers.cookie
      ?.split(';')
      .map((c) => c.trim().split('='))
      .find(([key]) => key === 'checkout.vtex.com') ?? []

  return orderFormId
}

export const orderFormResolver = {
  mutations: {
    addExtraParts: async (
      _: unknown,
      { extraOrderData }: MutationAddExtraPartsArgs,
      context: Context
    ) => {
      const orderFormId = getOrderFormIdFromContext(context)
      const newData = parseJson<CustomDataFolderImprinting>(extraOrderData)
      const existingData = await getCustomDataField<CustomDataOpenExtraParts>({
        orderFormId,
        appId: EXTRA_PARTS_APP_ID,
        fieldName: EXTRA_PARTS_FIELD_NAME,
      })

      await addOrUpdateCustomData({
        orderFormId,
        value: JSON.stringify({
          ...existingData,
          ...newData,
        }),
        fieldName: EXTRA_PARTS_FIELD_NAME,
        appId: EXTRA_PARTS_APP_ID,
      })
    },
    removeExtraParts: async (
      _: any,
      { skuGtin }: MutationRemoveExtraPartsArgs,
      context: Context
    ) => {
      const orderFormId = getOrderFormIdFromContext(context)

      // If no sku is provided then delete all
      if (!skuGtin) {
        await deleteCustomData({
          orderFormId,
          appId: EXTRA_PARTS_APP_ID,
          fieldName: EXTRA_PARTS_FIELD_NAME,
        })

        return
      }

      // If sku is provided only delete sku
      const data = await getCustomDataField<CustomDataOpenExtraParts>({
        orderFormId,
        appId: EXTRA_PARTS_APP_ID,
        fieldName: EXTRA_PARTS_FIELD_NAME,
      })

      if (!data?.[skuGtin]) {
        return
      }

      delete data[skuGtin]

      if (data) {
        await addOrUpdateCustomData({
          orderFormId,
          value: JSON.stringify(data),
          appId: EXTRA_PARTS_APP_ID,
          fieldName: EXTRA_PARTS_FIELD_NAME,
        })
      } else {
        await deleteCustomData({
          orderFormId,
          appId: EXTRA_PARTS_APP_ID,
          fieldName: EXTRA_PARTS_FIELD_NAME,
        })
      }
    },
    addFolderImprinting: async (
      _: any,
      { data }: MutationAddFolderImprintingArgs,
      context: Context
    ) => {
      const orderFormId = getOrderFormIdFromContext(context)
      const newData = parseJson<CustomDataFolderImprinting>(data)
      const existingData = await getCustomDataField<CustomDataFolderImprinting>(
        {
          orderFormId,
          fieldName: FOLDER_IMPRINTING_FIELD_NAME,
          appId: FOLDER_IMPRINTING_APP_ID,
        }
      )

      await addOrUpdateCustomData({
        orderFormId,
        value: JSON.stringify({
          ...existingData,
          ...newData,
        }),
        appId: FOLDER_IMPRINTING_APP_ID,
        fieldName: FOLDER_IMPRINTING_FIELD_NAME,
      })
    },
    removeFolderImprinting: async (
      _: any,
      { skuGtin }: MutationRemoveFolderImprintingArgs,
      context: Context
    ) => {
      const orderFormId = getOrderFormIdFromContext(context)

      // If no sku is provided then delete all
      if (!skuGtin) {
        await deleteCustomData({
          orderFormId,
          appId: FOLDER_IMPRINTING_APP_ID,
          fieldName: FOLDER_IMPRINTING_FIELD_NAME,
        })

        return
      }

      // If sku is provided only delete sku
      const data = await getCustomDataField<CustomDataFolderImprinting>({
        orderFormId,
        appId: FOLDER_IMPRINTING_APP_ID,
        fieldName: FOLDER_IMPRINTING_FIELD_NAME,
      })

      if (!data?.[skuGtin]) {
        return
      }

      delete data[skuGtin]

      if (data) {
        await addOrUpdateCustomData({
          orderFormId,
          value: JSON.stringify(data),
          appId: FOLDER_IMPRINTING_APP_ID,
          fieldName: FOLDER_IMPRINTING_FIELD_NAME,
        })
      } else {
        await deleteCustomData({
          orderFormId,
          appId: FOLDER_IMPRINTING_APP_ID,
          fieldName: FOLDER_IMPRINTING_FIELD_NAME,
        })
      }
    },
  },
  queries: {
    orderForm: async (_: unknown, { id }: QueryOrderFormArgs) => {
      const order = await getOrderForm(id)

      if (!order.customData) {
        return order
      }

      const customApps = order.customData?.customApps.map((app): CustomApp => {
        return {
          ...app,
          fields: Object.keys(app.fields).map((key) => {
            return {
              key,
              value: app.fields[key],
            }
          }),
        }
      })

      return { ...order, customData: { customApps } }
    },
    customData: async (
      _: any,
      { appId, field }: QueryCustomDataArgs,
      context: Context
    ) => {
      const orderFormId = getOrderFormIdFromContext(context)
      const order = await getOrderForm(orderFormId)

      if (!order.customData) {
        return null
      }

      const data = order.customData.customApps.find((app) => {
        return app.id === appId
      })?.fields[field]

      return data
    },
  },
}

export default orderFormResolver
