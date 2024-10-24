type FacetProps = {
  key: string
  value: string
}

export const useFacetsUrl = (facetsArray: FacetProps[]) => {
  if (facetsArray.length === 0) {
    return ''
  }

  const urlParts: string[] = facetsArray.flatMap((facet) => [
    facet.key,
    facet.value,
  ])

  return `/${urlParts.join('/')}`
}
