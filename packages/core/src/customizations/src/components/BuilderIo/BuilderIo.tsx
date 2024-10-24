import useSwr from 'swr'
import builder, { BuilderComponent, useIsPreviewing } from '@builder.io/react'

import { BUILDER_PUBLIC_KEY } from './config'
import type { BuilderIo as BuilderIoProps } from '../../@generated/cms/BuilderIo'
import { NotFoundError } from '../../utils/NotFoundError'
import styles from './BuilderIo.module.scss'

builder.init(BUILDER_PUBLIC_KEY)

type BuilderContent = BuilderComponent['props']['content']

const BuilderIo = ({
  urlPath,
}: BuilderIoProps): React.ReactElement | undefined => {
  const isPreviewing = useIsPreviewing()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error, isLoading } = useSwr(
    urlPath,
    async (path): Promise<BuilderContent> => {
      return builder
        .get('page', {
          userAttributes: {
            urlPath: path,
          },
        })
        .toPromise()
    }
  )

  if (error) {
    console.error(error)
    throw error
  }

  if (!isLoading && !data && !isPreviewing) {
    console.error(`No data for ${urlPath}`)
    throw new NotFoundError('Builder.io page not found', { status: 404 })
  }

  return (
    <div className={styles.section}>
      {data && !isLoading && <BuilderComponent model="page" content={data} />}
    </div>
  )
}

export default BuilderIo
