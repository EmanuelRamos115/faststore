type ParseResult<T> = T | undefined

export const parseJson = <T>(
  jsonString: string | undefined
): ParseResult<T> => {
  if (!jsonString) {
    return undefined
  }

  try {
    return JSON.parse(jsonString) as T
  } catch (error) {
    console.warn('Error parsing JSON:', error)

    return undefined
  }
}
