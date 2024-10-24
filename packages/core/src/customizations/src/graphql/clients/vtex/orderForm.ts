import type { QueryOrderFormArgs } from '@generated/graphql'

import { vtexApiRequest } from '../../utils/vtexApiRequest'
import type { OrderForm } from '../../../typings/orderForm'

export async function getOrderForm(
  id: QueryOrderFormArgs['id']
): Promise<OrderForm> {
  return vtexApiRequest<OrderForm>(`/api/checkout/pub/orderForm/${id}`, true)
}

export async function addOrUpdateAttachment({
  orderFormId,
  itemIndex,
  attachmentName,
  value,
}: {
  orderFormId: string
  itemIndex: number
  attachmentName: string
  value: Record<string, string>
}) {
  return vtexApiRequest<OrderForm>(
    `/api/checkout/pub/orderForm/${orderFormId}/items/${itemIndex}/attachments/${attachmentName}`,
    true,
    {
      method: 'POST',
      body: JSON.stringify({ content: value }),
    }
  )
}

export const getCustomDataField = async <T>({
  orderFormId,
  fieldName,
  appId,
}: {
  orderFormId: string
  fieldName: string
  appId: string
}): Promise<T | undefined> => {
  const orderForm = await getOrderForm(orderFormId)
  const customData = orderForm.customData?.customApps.find(
    (app) => app.id === appId
  )?.fields[fieldName]

  if (!customData) {
    return undefined
  }

  try {
    return JSON.parse(customData) as T
  } catch (error) {
    console.warn(`Error parsing ${appId} ${fieldName} custom data JSON:`, error)

    return undefined
  }
}

export async function addOrUpdateCustomData({
  orderFormId,
  value,
  fieldName,
  appId,
}: {
  orderFormId: string
  value: string
  fieldName: string
  appId: string
}) {
  return vtexApiRequest<OrderForm>(
    `/api/checkout/pub/orderForm/${orderFormId}/customData/${appId}/${fieldName}`,
    true,
    {
      method: 'PUT',
      body: JSON.stringify({ value }),
    }
  )
}

export async function deleteCustomData({
  orderFormId,
  fieldName,
  appId,
}: {
  orderFormId: string
  fieldName: string
  appId: string
}) {
  await vtexApiRequest<OrderForm>(
    `/api/checkout/pub/orderForm/${orderFormId}/customData/${appId}/${fieldName}`,
    true,
    {
      method: 'DELETE',
    }
  )
}
