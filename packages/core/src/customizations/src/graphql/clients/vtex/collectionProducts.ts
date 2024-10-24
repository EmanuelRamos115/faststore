import { vtexApiRequest } from '../../utils/vtexApiRequest'

export async function getCollectionProductsById(
  collectionId: number
): Promise<CollectionProducts> {
  return vtexApiRequest<CollectionProducts>(
    `/api/catalog/pvt/collection/${collectionId}/products`,
    true
  )
}

type CollectionProducts = {
  Page: number
  Size: number
  TotalRows: number
  TotalPage: number
  Data: CollectionProduct[]
}

type CollectionProduct = {
  ProductId: number
  SkuId: number
  SubCollectionId: number
  Position: number
  ProductName: string
  SkuImageUrl: string
}
