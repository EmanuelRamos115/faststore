import draftToHtml from 'draftjs-to-html'
import type { RawDraftContentState } from 'draft-js'

const richTextToHtml = (text: string): string => {
  try {
    // No good way to validate this, and we're in a try/catch
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jsonContent: RawDraftContentState = JSON.parse(text)

    return draftToHtml(
      jsonContent,
      undefined,
      undefined,
      (
        entity: { type: string; data: { url: string } },
        originalText: string
      ) => {
        if (entity.type !== 'LINK') {
          return null
        }

        // This doesn't handle special characters, but data from CMS is probably safe
        return `<a href=${entity.data.url}>${originalText}</a>`
      }
    )
  } catch {
    return text
  }
}

export default richTextToHtml
