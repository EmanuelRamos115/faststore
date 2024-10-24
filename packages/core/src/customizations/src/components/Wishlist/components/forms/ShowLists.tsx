import { useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  TextArea,
  Button,
  Label,
  useUI,
} from '@faststore/ui'

import { useWishlist } from '../../../../hooks/useWishlist'
import styles from './ListForm.module.scss'
import Trashcan from '../../../Icons/General/Trashcan'
import CircledArrowUpIcon from '../../../Icons/General/CircledArrowUpIcon'
import CircledArrowDownIcon from '../../../Icons/General/CircledArrowDownIcon'

type ShowListsProps = {
  onChangeStep?: () => void
}

function ShowLists({ onChangeStep }: ShowListsProps) {
  const { pushToast } = useUI()
  const { lists, updateList } = useWishlist()
  const [openedList, setOpenedList] = useState<number>()

  const handleOpenList = (listIndex: number) => {
    if (listIndex === openedList) {
      setOpenedList(undefined)
    } else {
      setOpenedList(listIndex)
    }
  }

  const updateListNotes = async (notes: string) => {
    if (openedList === undefined) {
      return
    }

    const list = lists[openedList]

    if (!list || !list.id || !list.wishlistType) {
      return
    }

    try {
      await updateList(list.id, list.wishlistType, notes)

      pushToast({
        message: 'The wishlist has been updated',
        status: 'INFO',
      })
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === 'object' && 'message' in error
          ? (error as Error).message
          : 'An error occurred.'

      pushToast({
        message: `An error occurred while updating the wishlist: ${errorMessage}`,
        status: 'ERROR',
      })
    }
  }

  return (
    <Accordion
      className={`${styles.formContainer} ${styles.accordionContainer}`}
      indices={openedList !== undefined ? [openedList] : []}
      onChange={handleOpenList}
    >
      {lists.map((list, index) => (
        <AccordionItem
          className={styles.accordionItem}
          data-fs-opened={index === openedList}
        >
          <AccordionButton
            className={styles.accordionButton}
            icon={
              index === openedList ? (
                <CircledArrowUpIcon />
              ) : (
                <CircledArrowDownIcon />
              )
            }
          >
            {list?.wishlistType?.replace('_', ' ')}
          </AccordionButton>
          <AccordionPanel className={styles.accordionPanel}>
            <div
              data-fs-input-container
              className={styles.accordionPanelContainer}
            >
              <Label className={styles.labelText} htmlFor="wishlist-item-notes">
                Note
              </Label>
              <TextArea
                className={styles.textInput}
                data-fs-custom-textarea
                id="wishlist-item-notes"
                name="wishlist-item-notes"
                defaultValue={list?.fieldsConfig?.description ?? ''}
                onBlur={(event) => {
                  void updateListNotes(event.currentTarget.value)
                }}
              />

              <Button
                className={styles.accordionPanelButton}
                onClick={() => {
                  void updateListNotes('')
                }}
                variant="tertiary"
                icon={<Trashcan />}
              >
                Remove From List
              </Button>
            </div>
          </AccordionPanel>
        </AccordionItem>
      ))}

      <Button
        className={styles.submitWishlistButton}
        onClick={onChangeStep}
        variant="tertiary"
      >
        Add to Another List
      </Button>
    </Accordion>
  )
}

export default ShowLists
