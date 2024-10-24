import Dataloader from 'dataloader'
import type { Inventory } from '@generated/graphql'
import type { StoreProductRoot } from '@faststore/core/api'

import { getInventoryBySkuId } from '../../clients/vtex/inventory'

const loader = new Dataloader(async (ids: readonly number[]) => {
  return Promise.all(ids.map(getInventoryBySkuId))
})

export default {
  inventory: async (root: StoreProductRoot): Promise<Inventory[]> => {
    const skuData = await loader.load(parseInt(root.itemId, 10))

    return skuData.balance.map((balance) => ({
      // available is total - reserved, unless stock is unlimited
      availableQuantity: balance.hasUnlimitedQuantity
        ? 1_000_000
        : balance.totalQuantity - balance.reservedQuantity,
      hasUnlimitedQuantity: balance.hasUnlimitedQuantity,
      warehouse: {
        id: balance.warehouseId,
        name: balance.warehouseName,
      },
    }))
  },
}
