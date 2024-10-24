import { vtexApiRequest } from '../../utils/vtexApiRequest'

export async function getInventoryBySkuId(skuId: number) {
  return vtexApiRequest<InventoryResponse>(
    `/api/logistics/pvt/inventory/skus/${skuId}`,
    true
  )
}

export type InventoryResponse = {
  skuId: string
  balance: Array<{
    warehouseId: string
    warehouseName: string
    totalQuantity: number
    reservedQuantity: number
    hasUnlimitedQuantity: boolean
    timeToRefill: unknown
    dateOfSupplyUtc: unknown
    leadTime: string
  }>
}
