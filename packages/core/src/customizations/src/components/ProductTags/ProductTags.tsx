/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { usePDP } from '@faststore/core'

import type { ProductTags as ProductTagsProps } from '../../@generated/cms/ProductTags'
import type { Tag } from '../../@generated/cms/PageTags'
import { slugify } from '../../utils/slugify'
import PageTags from '../PageTags/PageTags'

const ProductTags = ({ heading, count }: ProductTagsProps) => {
  const { data } = usePDP()
  const seriesSpecs =
    data?.product?.additionalProperty?.filter(
      (property) => property.name === 'Series'
    ) ?? []

  const tagSpecs =
    data?.product?.isVariantOf?.additionalProperty?.filter(
      (property) => property.name === 'Tag'
    ) ?? []

  const tags = [...seriesSpecs, ...tagSpecs].slice(0, count).map((tag): Tag => {
    const nameSlug = slugify(tag.name)
    const valueSlug = slugify(tag.value)

    return {
      url: `/s?${nameSlug}=${valueSlug}&facets=${nameSlug}`,
      text: tag.value,
    }
  }) as [Tag, ...Tag[]]

  if (!tags.length) {
    return null
  }

  return <PageTags heading={heading} tags={tags} />
}

export default ProductTags
