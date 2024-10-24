import type { ClientProductQueryQuery } from '@generated/graphql'

import { getSpec } from '../../utils/productData'
import type { Product, ProductFullVariantList } from '../../typings/product'
import { physicalWarehouses, eprintWarehouses } from '../../../faststore.config'

const INVENTORY_THRESHOLD = 10

type LimitedProps = {
  sku: Product | ProductFullVariantList[0] | ClientProductQueryQuery['product']
}

const Limited = ({ sku }: LimitedProps) => {
  const deliveryMethod = getSpec(sku.additionalProperty, 'Delivery') ?? ''
  const method = deliveryMethod.toLowerCase()

  const calculateInventory = (warehouses: string[]) =>
    sku.inventory
      .filter(({ warehouse }) => warehouses?.includes(warehouse.id))
      .reduce((acc, { availableQuantity }) => acc + availableQuantity, 0)

  const isPrintMethod = method.includes('print')

  const relevantWarehouses = isPrintMethod
    ? eprintWarehouses
    : physicalWarehouses
  const totalInventory = calculateInventory(relevantWarehouses)

  return totalInventory < INVENTORY_THRESHOLD ? <p>Limited</p> : null
}

export default Limited
