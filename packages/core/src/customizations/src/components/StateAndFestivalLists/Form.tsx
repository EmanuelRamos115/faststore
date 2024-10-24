import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import { alphabetize } from '../../utils/sort'
import Action from '../Action/Action'
import Heading from '../Heading/Heading'
import ListLink from './ListLink'
import { colors } from '../../constants/colors'
import styles from './StateAndFestivalLists.module.scss'

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

type Props = {
  lists: ListItem[]
}

const TYPE_LABELS: { [key: string]: string } = {
  list: 'State Lists',
  festival: 'Festival Lists',
}

const Form = ({ lists }: Props) => {
  const [types, setTypes] = useState<string[]>([])
  const [listType, setListType] = useState<string>('')

  const [level1Label, setLevel1Label] = useState<string>('')
  const [level1Values, setLevel1Values] = useState<string[]>([])
  const [level1Value, setLevel1Value] = useState<string>('')

  const [level2Label, setLevel2Label] = useState<string>('')
  const [level2Values, setLevel2Values] = useState<string[]>([])
  const [level2Value, setLevel2Value] = useState<string>('')

  const [results, setresults] = useState<ListItem[]>([])

  const [showDropdowns, setShowDropdowns] = useState<boolean>(false)

  useEffect(() => {
    const uniqueTypes: string[] = Array.from(
      new Set(lists.map((list: ListItem) => list.type))
    )

    setTypes(uniqueTypes)

    if (uniqueTypes.length === 1) {
      const listsByType = lists.filter(
        (list: ListItem) => list.type === uniqueTypes[0]
      )

      setListType(uniqueTypes[0])
      setLevel1Label(listsByType[0].level1Label)
      setLevel2Label(listsByType[0].level2Label)
      setShowDropdowns(true)

      setLevel1Values(
        Array.from(
          new Set(listsByType.map((list: ListItem) => list.level1Value))
        )
      )
    }
  }, [lists])

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const listsByType = lists.filter((list: ListItem) => list.type === value)
    const newLevel1Values: string[] = Array.from(
      new Set(listsByType.map((list: ListItem) => list.level1Value))
    )

    setListType(value)
    setLevel1Label(listsByType[0].level1Label)
    setLevel2Label(listsByType[0].level2Label)
    setLevel1Values(newLevel1Values)
    setShowDropdowns(true)
    setresults([])
  }

  const handleLevel1Change = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    const listsByLevel1Value = lists.filter(
      (list: ListItem) => list.level1Value === value
    )

    const newLevel2Values: string[] = Array.from(
      new Set(listsByLevel1Value.map((list: ListItem) => list.level2Value))
    )

    setLevel1Value(value)
    setLevel2Values(newLevel2Values)
    setresults([])
  }

  const handleLevel2Change = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target

    setLevel2Value(value)
    setresults([])
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const matchingLists: ListItem[] = lists.filter((list: ListItem) => {
      return (
        level1Value === list.level1Value && level2Value === list.level2Value
      )
    })

    setresults(matchingLists)
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {types.length > 1 && (
          <fieldset className={styles.fieldset}>
            <legend className={`${styles.subHeading} ${styles.inputLabel}`}>
              Select a list type to get started:
            </legend>

            <div className={styles.radioGroup}>
              {types.map((value) => {
                return (
                  <p key={value} className={styles.radio}>
                    <input
                      type="radio"
                      id={`type-${value}`}
                      name="type"
                      value={value}
                      checked={value === listType}
                      onChange={handleTypeChange}
                    />
                    <label
                      htmlFor={`type-${value}`}
                      className={`${styles.capitalize} ${styles.inputLabel}`}
                    >
                      {TYPE_LABELS[value]}
                    </label>
                  </p>
                )
              })}
            </div>
          </fieldset>
        )}

        {showDropdowns && (
          <fieldset className={styles.fieldset}>
            <div className={styles.inputs}>
              <div className={styles.select}>
                <label htmlFor="level_1_select" className={styles.inputLabel}>
                  {level1Label}
                </label>

                <select
                  name="level_1_select"
                  id="level_1_select"
                  onChange={handleLevel1Change}
                >
                  <option value="">{level1Label}</option>
                  {level1Values.sort(alphabetize).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.select}>
                <label htmlFor="level_2_select" className={styles.inputLabel}>
                  {level2Label}
                </label>

                <select
                  name="level_2_select"
                  id="level_2_select"
                  onChange={handleLevel2Change}
                >
                  <option value="">{level2Label}</option>
                  {level2Values.sort(alphabetize).map((value) => (
                    <option key={value} value={value}>
                      {value}
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
                  disabled={!(!!level1Value && !!level2Value)}
                >
                  Search
                </Action>
              </div>
            </div>
          </fieldset>
        )}
      </form>

      {results.length > 0 && (
        <div className={styles.results}>
          <Heading level={2} uiStyle={7} className={styles.subHeading}>
            Results
          </Heading>

          <ul className={`list-reset ${styles.linkList}`}>
            {results.map((result) => (
              <ListLink
                text={result.title}
                collectionID={result.collectionId}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Form
