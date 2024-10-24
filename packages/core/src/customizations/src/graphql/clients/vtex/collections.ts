import { vtexApiRequest } from '../../utils/vtexApiRequest'

export async function getCollectionById(
  collectionId: number
): Promise<Collection> {
  return vtexApiRequest<Collection>(
    `/api/catalog/pvt/collection/${collectionId}`,
    true
  )
}

type Collection = {
  Id: number
  Name: string
  Description?: string
  Searchable: boolean
  Highlight: boolean
  DateFrom: string
  DateTo: string
  TotalProducts: number
  Type: string
}
