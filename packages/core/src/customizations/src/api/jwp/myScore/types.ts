export type Composer = {
  first_name?: string
  last_name?: string
  formal_name?: string
  socials: Array<{
    type: string
    url: string
    icon: string
    iconAltText: string
  }>
  slug: string
  brand_code?: string
  bio?: string
  photo?: string
  collections: Array<{
    vtexCollectionId: number
    displayName: string
  }>
  vtex_brand_id?: number
}
