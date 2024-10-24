import type { SubcollectionProducts } from '@generated/graphql'

import { vtexApiRequest } from '../../utils/vtexApiRequest'

export async function getSubcollectionProductsById(
  subcollectionId: number,
  page: number
): Promise<SubcollectionProducts> {
  return vtexApiRequest<SubcollectionProducts>(
    `/api/catalog/pvt/subcollection/${subcollectionId}/stockkeepingunit?page=${page}&size=50`,
    true
  )
}
