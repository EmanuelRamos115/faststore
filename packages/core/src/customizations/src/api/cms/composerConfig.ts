import type { ContentData, Section } from '@vtex/client-cms'
import { getPage } from 'src/server/cms'

type ComposerPage = ContentData & {
  apiConfiguration?: {
    apiConfig?: {
      endpoint?: string
    }
  }
}

export async function getComposerConfig(): Promise<{
  endpoint: string
  sections: Section[]
}> {
  const page = await getPage<ComposerPage>({
    contentType: 'composerPage',
  })

  const endpoint = page?.apiConfiguration?.apiConfig?.endpoint
  const sections = page?.sections

  if (!endpoint) {
    throw new Error('Missing myscore api config')
  }

  return { endpoint, sections }
}
