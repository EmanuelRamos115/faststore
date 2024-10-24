import Link from 'next/link'
import { useSession } from 'src/sdk/session'

import Action from '../Action/Action'
import FullArrowLeftIcon from '../Icons/General/FullArrowLeftIcon'
import Heading from '../Heading/Heading'
import PlayIcon from '../Icons/General/PlayIcon'
import styles from './EditorsChoiceViewListenList.module.scss'
import { getLoginUrlWithReturn } from '../../utils/urls'
import type { EditorsChoiceViewListenList as EditorsChoiceViewListenListProps } from '../../@generated/cms/EditorsChoiceViewListenList'

const EditorsChoiceViewListenList = ({
  collections,
  listHeading,
}: EditorsChoiceViewListenListProps) => {
  const { person } = useSession()

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.headerAndButtonRow}>
          <div className={styles.actionWrapper}>
            <Action
              as="a"
              href="/editors-choice"
              color="neutralLight"
              size="small"
            >
              <FullArrowLeftIcon /> All Editor's Choice
            </Action>
          </div>

          <div className={styles.headingWrapper}>
            <Heading level={2} uiStyle={8} allCaps divider>
              {listHeading}
            </Heading>
          </div>
        </div>

        <div className={styles.itemsWrapper}>
          <ul className="list-reset">
            {collections.map((collection) => {
              const collectionPath = `/editors-choice/play?collectionId=${collection.collectionId}`

              return (
                <li
                  key={collection.collectionId}
                  className={styles.itemsListItem}
                >
                  <Link
                    href={collection.collectionUrl}
                    className={styles.itemsLink}
                  >
                    {collection.collectionName}
                  </Link>

                  <div>
                    {person?.id ? (
                      <Link
                        href={collectionPath}
                        className={styles.itemsPlayLink}
                      >
                        <PlayIcon />
                        Listen to All
                      </Link>
                    ) : (
                      <Link
                        href={getLoginUrlWithReturn(collectionPath)}
                        className={styles.itemsPlayLink}
                      >
                        <PlayIcon />
                        Log In to Listen
                      </Link>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EditorsChoiceViewListenList
