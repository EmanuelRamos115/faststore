import { useCallback } from 'react'
import { useRouter } from 'next/router'

export const useUpdateClusterPageState = () => {
  const router = useRouter()

  return useCallback(
    (url: URL) => {
      const path = window?.location.pathname

      const newUrl = `${path}${url.search}`

      return url.searchParams.has('fuzzy') && url.searchParams.has('operator')
        ? router.replace(newUrl)
        : router.push(newUrl)
    },
    [router]
  )
}
