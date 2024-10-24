import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Link from 'next/link'
import { gql } from '@generated/gql'
import type { ChangeEvent, FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useQuery } from 'src/sdk/graphql/useQuery'

import { alphabetize } from '../../utils/sort'
import Action from '../Action/Action'
import Form from './Form'
import FullArrowLeftIcon from '../Icons/General/FullArrowLeftIcon'
import Heading from '../Heading/Heading'
import NationalIcon from '../Icons/General/NationalIcon'
import StateIcon from '../Icons/General/StateIcon'
import { slugify } from '../../utils/slugify'
import { colors } from '../../constants/colors'
import { useDeviceInfo } from '../../hooks/useDeviceInfo'
import styles from './StateAndFestivalLists.module.scss'
import type { StateAndFestivalLists as Props } from '../../@generated/cms/StateAndFestivalLists'

const GET_DATA = gql(`
  query getStateAndFestivalLists {
    lists {
      collectionId
      level1Label
      level1Value
      level2Label
      level2Value
      region
      title
      type
    }
  }
`)

type ListItem = {
  collectionId: number
  level1Label: string
  level1Value: string
  level2Label: string
  level2Value: string
  region: string
  title: string
  type: string
}

type ListsQuery = {
  lists: ListItem[]
}

const StateAndFestivalLists = ({ page }: Props) => {
  const { data } = useQuery<ListsQuery>(GET_DATA, {})

  const { device } = useDeviceInfo()
  const router = useRouter()
  const [stateLists, setStateLists] = useState<ListItem[]>([])
  const [nationalLists, setNationalLists] = useState<ListItem[]>([])
  const [selectedState, setSelectedState] = useState<string>('')

  const pathname = usePathname()
  const state = pathname.split('/state-and-festival-lists/')[1]

  useEffect(() => {
    if (!data) {
      return
    }

    setStateLists(
      data.lists.filter((list: ListItem) => list.region !== 'National')
    )
    setNationalLists(
      data.lists.filter((list: ListItem) => list.region === 'National')
    )
  }, [data])

  const uniqueStates: string[] = Array.from(
    new Set(stateLists.map((list: ListItem) => list.region))
  ).sort(alphabetize)

  const listsForThisState: ListItem[] = stateLists.filter((list: ListItem) => {
    const listState = slugify(list.region)

    return listState === state
  })

  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target

    setSelectedState(value)
  }

  const handleStateSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    router.push(`/state-and-festival-lists/${slugify(selectedState)}`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {page === 'state' ? (
          <div>
            <div className={styles.header}>
              <div>
                <Action
                  as="a"
                  href="/state-and-festival-lists/"
                  size="small"
                  color="neutralLight"
                >
                  <div className={styles.backButton}>
                    <FullArrowLeftIcon />
                    <span>Back to Choose a State</span>
                  </div>
                </Action>
              </div>

              <Heading level={1} uiStyle={2}>
                <span className={styles.capitalize}>{state}</span> - State
                Festival List
              </Heading>
            </div>

            <div className={styles.tabPanelContent}>
              <Form lists={listsForThisState} />
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.header}>
              <Heading level={1} uiStyle={2}>
                State Contest Repertoire & Music Festival Lists
              </Heading>

              <p>
                Pepper provides these shopping lists for your convenience. Be
                sure to verify your items match the organization’s official
                required list before making your final purchases.
              </p>
            </div>

            <Tabs className={styles.tabs}>
              <TabList className={styles.tabList}>
                <Tab className={styles.tab}>
                  <div className={styles.tabContent}>
                    <span className={styles.tabIcon}>
                      <StateIcon />
                    </span>
                    <span className={styles.tabText}>State Festivals</span>
                  </div>
                </Tab>
                <Tab className={styles.tab}>
                  <div className={styles.tabContent}>
                    <span className={styles.tabIcon}>
                      <NationalIcon />
                    </span>
                    <span className={styles.tabText}>National Festivals</span>
                  </div>
                </Tab>
              </TabList>

              <TabPanel className={styles.tabPanel}>
                <div className={styles.tabPanelContent}>
                  {device === 'desktop' ? (
                    <ul className={`list-reset ${styles.stateList}`}>
                      {uniqueStates.map((stateName: string) => {
                        return (
                          <li key={slugify(stateName)}>
                            <Link
                              href={`/state-and-festival-lists/${slugify(
                                stateName
                              )}`}
                              className={styles.link}
                            >
                              {stateName}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  ) : (
                    <form className={styles.form} onSubmit={handleStateSubmit}>
                      <fieldset className={styles.fieldset}>
                        <div className={styles.inputs}>
                          <div className={styles.select}>
                            <label
                              htmlFor="state_select"
                              className={styles.inputLabel}
                            >
                              State
                            </label>

                            <select
                              name="state_select"
                              id="state_select"
                              onChange={handleStateChange}
                            >
                              <option value="">Choose a State</option>
                              {uniqueStates.map((stateName: string) => (
                                <option
                                  key={slugify(stateName)}
                                  value={slugify(stateName)}
                                  className={styles.capitalize}
                                >
                                  {stateName}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className={styles.action}>
                            <Action
                              as="button"
                              color={colors.maroon.token}
                              size="large"
                              type="submit"
                              fullWidth={true}
                              disabled={!selectedState}
                            >
                              View State Lists
                            </Action>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                  )}
                </div>
              </TabPanel>
              <TabPanel className={styles.tabPanel}>
                <div className={styles.tabPanelContent}>
                  <Heading level={2} uiStyle={7} className={styles.subHeading}>
                    Choose a Region to find a national festival:
                  </Heading>

                  <Form lists={nationalLists} />
                </div>
              </TabPanel>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}

export default StateAndFestivalLists
