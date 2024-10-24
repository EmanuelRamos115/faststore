import { loginUrl, storeUrl } from '../../faststore.config'

export const getLoginUrlWithReturn = (
  returnUrl: string,
  isFastStorePath = true
) => {
  const returnParam = encodeURIComponent(
    isFastStorePath ? `${storeUrl}/${returnUrl}` : returnUrl
  )

  return `${loginUrl}?returnUrl=${returnParam}`
}

export const getValidExternalUrl = (string: string, securityType: string) => {
  let url

  try {
    url = new URL(string)
  } catch {
    url = new URL(`${securityType}://${string}`)
  }

  return url.href
}
