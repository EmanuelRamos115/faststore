import type { PLPContext, SearchPageContext } from '@faststore/core'
import { isPLP, isSearchPage, usePage } from '@faststore/core'
import { useDelayedFacets_unstable as useDelayedFacets } from '@faststore/core/experimental'

import ProductGallery from '../ProductGallery/ProductGallery'
import type { TrustPilotStarsConfig } from '../../@generated/cms/CustomProductDetails'

const CustomProductGallery = ({
  trustPilotPlpConfig,
}: {
  trustPilotPlpConfig: TrustPilotStarsConfig
}) => {
  const context = usePage<SearchPageContext | PLPContext>()
  const [title, searchTerm] = isSearchPage(context)
    ? [context?.data?.title, context?.data?.searchTerm]
    : isPLP(context)
      ? [context?.data?.collection?.seo?.title]
      : ['']

  const facets = useDelayedFacets(context?.data) ?? []
  const productInfo = context?.data?.search?.products

  return (
    <ProductGallery
      title={title}
      searchTerm={searchTerm}
      facets={facets}
      productInfo={productInfo}
      trustPilotPlpConfig={trustPilotPlpConfig}
    />
  )
}

export default CustomProductGallery
