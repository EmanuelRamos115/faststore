import type { Brand, QueryBrandArgs } from '@generated/graphql'

import { vtexApiRequest } from '../../utils/vtexApiRequest'

const brandResolver = {
  brand: async (
    _: unknown,
    { id }: QueryBrandArgs
  ): Promise<Brand | undefined> => {
    return vtexApiRequest<Brand>(`/api/catalog_system/pvt/brand/${id}`, true)
  },
  brandList: async (_: unknown): Promise<Brand[] | undefined> => {
    return vtexApiRequest<Brand[]>(`/api/catalog_system/pvt/brand/list`, true)
  },
}

export default brandResolver
