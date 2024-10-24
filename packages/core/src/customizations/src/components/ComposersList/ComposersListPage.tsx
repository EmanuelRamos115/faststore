import Link from 'next/link'
import { Loader } from '@faststore/ui'
import { useRef, useEffect } from 'react'

import Action from '../Action/Action'
import MissingAvatarImage from './MissingAvatarImage'
import TruncatedText from '../TruncatedText/TruncatedText'
import Heading from '../Heading/Heading'
import styles from './ComposersListPage.module.scss'
import { type AllComposersResponse } from '../../api/jwp/myScore/allComposers'
import { routes } from './ComposersList'

type ComposersListPageProps = {
  page: AllComposersResponse
  handlePageLoad: () => Promise<void>
  isCurrentPage: boolean
}

const ComposersListPage = ({
  page,
  handlePageLoad,
  isCurrentPage,
}: ComposersListPageProps) => {
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isCurrentPage) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return
      }

      observer.unobserve(entry.target)
      void handlePageLoad()
    })

    if (loaderRef.current && page.moreResults) {
      observer.observe(loaderRef.current)
    }
  }, [isCurrentPage])

  return (
    <>
      <ul className={`list-reset ${styles.composers}`}>
        {page.composers.map((composer) => {
          const composerName = [composer.first_name, composer.last_name]
            .filter(Boolean)
            .join(' ')

          return (
            <li key={composer.slug} className={styles.composer}>
              <div className={styles.avatar}>
                {composer.photo ? (
                  <img
                    className={styles.avatarImage}
                    src={composer.photo}
                    height={200}
                    width={200}
                    alt={`${composerName}'s avatar`}
                    loading="lazy"
                  />
                ) : (
                  <MissingAvatarImage className={styles.avatarImage} />
                )}
              </div>

              <div className={styles.details}>
                <Heading level={2} uiStyle={2}>
                  <Link
                    className={styles.name}
                    href={routes.composer(composer.slug)}
                  >
                    {composerName}
                  </Link>
                </Heading>

                {composer.formal_name && (
                  <p className={styles.formalName}>{composer.formal_name}</p>
                )}

                <p className={styles.bio}>
                  {composer.bio && (
                    <TruncatedText
                      copy={composer.bio}
                      charCount={240}
                      maxLines={2}
                      expandable={false}
                    />
                  )}
                </p>

                <Action
                  className={styles.cta}
                  as="a"
                  size="medium"
                  color="neutralLight"
                  href={routes.composer(composer.slug)}
                >
                  View Composer Profile
                </Action>
              </div>
            </li>
          )
        })}
      </ul>

      {page.moreResults && isCurrentPage && (
        <div ref={loaderRef} className={styles.loading}>
          <Loader />
        </div>
      )}
    </>
  )
}

export default ComposersListPage
