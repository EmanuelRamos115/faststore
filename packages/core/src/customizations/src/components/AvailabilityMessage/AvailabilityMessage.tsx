import type {
  ServerProductQueryQuery,
  ClientProductQueryQuery,
} from '@generated/graphql'

import NotAvailableBadge from '../Badges/NotAvailableBadge'
import WarningBadge from '../Badges/WarningBadge'
import { getSkuAvailability } from '../../utils/productData'
import type { ClientManyProductsQueryQueryProductEdges } from '../../typings/product'

type AvailabilityProps = {
  product:
    | ServerProductQueryQuery['product']
    | ClientManyProductsQueryQueryProductEdges[0]['node']
    | ClientProductQueryQuery['product']
  skuRefId: string
}

const AvailabilityMessage = ({ product, skuRefId }: AvailabilityProps) => {
  const availability = getSkuAvailability(product, skuRefId)

  if (!availability?.short_message) {
    return null
  }

  return (
    <div>
      {availability.short_message === 'Not Available' ? (
        <NotAvailableBadge />
      ) : (
        <WarningBadge
          badgeText={availability.short_message}
          tooltipText={availability.availability_message}
        />
      )}
    </div>
  )
}

export default AvailabilityMessage
