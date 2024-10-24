import type { ClientManyProductsQueryQueryVariables } from '@generated/graphql'

import type { CallToAction } from '../@generated/cms/ProductList'

const dummyImages = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
    originalAlt: 'Original alt',
    thumbnailAlt: 'Thunmbnail alt',
    loading: 'eager',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
    originalAlt: 'Original alt',
    thumbnailAlt: 'Thunmbnail alt',
    loading: 'lazy',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
    originalAlt: 'Original alt',
    thumbnailAlt: 'Thunmbnail alt',
    loading: 'lazy',
  },
]

const dummyCta: CallToAction = {
  color: 'neutralDark',
  size: 'medium',
  text: 'Shop All',
  url: '#',
}

const dummyProductQuery: ClientManyProductsQueryQueryVariables = {
  first: 10,
  after: '0',
  sort: 'score_desc',
  term: '',
  selectedFacets: {
    key: 'category-1',
    value: 'choral-music',
  },
}

export { dummyCta, dummyImages, dummyProductQuery }
