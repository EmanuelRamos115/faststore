import type { CategoryTree } from '@generated/graphql'

import { vtexApiRequest } from '../../utils/vtexApiRequest'
import { STORE_URL } from '../../constants/index'

type QueryParams = {
  id: number
  excludeIds?: number[]
}

const getCategoryById = (
  category: CategoryTree,
  id: number
): CategoryTree | null => {
  if (category.id === id) {
    return category
  }

  if (!category.children) {
    return null
  }

  let match = null

  for (let i = 0; match === null && i < category.children.length; i++) {
    match = getCategoryById(category.children[i], id)
  }

  return match
}

const categoryTreeResolver = {
  categoryTree: async (
    _: unknown,
    { id, excludeIds }: QueryParams
  ): Promise<CategoryTree[] | undefined> => {
    let category
    const categories = await vtexApiRequest<CategoryTree[]>(
      `/api/catalog_system/pub/category/tree/10`,
      true
    )

    for (let i = 0; !category && i < categories.length; i++) {
      category = getCategoryById(categories[i], id)
    }

    return category?.children
      ?.filter((cat) => !excludeIds?.includes(cat.id))
      .map((cat) => {
        return {
          ...cat,
          url: cat.url.split(STORE_URL)[1],
          children: cat.children.map((child) => {
            return {
              ...child,
              url: child.url.split(STORE_URL)[1],
            }
          }),
        }
      })
  },
}

export default categoryTreeResolver
