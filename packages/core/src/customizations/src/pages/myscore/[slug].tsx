import type { GetStaticProps } from 'next'
import type { Locator, Section } from '@vtex/client-cms'
import { getComposerConfig } from 'src/customizations/src/api/cms/composerConfig'
import { fetchComposer } from 'src/customizations/src/api/jwp/myScore/composer'
import GlobalSections, {
  getGlobalSectionsData,
  type GlobalSectionsData,
} from 'src/components/cms/GlobalSections'
import type { Composer } from 'src/customizations/src/api/jwp/myScore/types'
import { MyscoreComposerDataProvider } from 'src/customizations/src/hooks/useMyscoreComposer'
import RenderSections from 'src/components/cms/RenderSections'
import COMPONENTS from 'src/customizations/src/components'

type Props = {
  globalSections: GlobalSectionsData
  sections: Section[]
  composer: Composer
}

const MyScoreComposer = ({ globalSections, sections, composer }: Props) => {
  return (
    <MyscoreComposerDataProvider value={composer}>
      <GlobalSections {...globalSections}>
        <RenderSections components={COMPONENTS} sections={sections} />
      </GlobalSections>
    </MyscoreComposerDataProvider>
  )
}

export const getServerSideProps: GetStaticProps<
  Props,
  { slug: string },
  Locator
> = async (context) => {
  if (!context.params?.slug) {
    return {
      notFound: true,
    }
  }

  const { endpoint, sections } = await getComposerConfig()
  const composerResponse = await fetchComposer(endpoint, context.params.slug)

  if (!composerResponse.composer) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      composer: composerResponse.composer,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      sections,
      // Vtex is using non-strict mode, this is not actually a required param
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      globalSections: await getGlobalSectionsData(context.previewData!),
    },
  }
}

export default MyScoreComposer
