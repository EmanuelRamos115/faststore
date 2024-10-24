import { Button, Label, TextArea, useUI } from '@faststore/ui'
import { useState, type FormEvent } from 'react'
import { useProductsQuery } from 'src/sdk/product/useProductsQuery'

import { useWishlist } from '../../../../hooks/useWishlist'
import type { SkuItem, Wishlist } from '../../../../typings/wishlist'
import Trashcan from '../../../Icons/General/Trashcan'
import { getSkus } from '../../helpers'
import styles from './ListForm.module.scss'

type AddToWishlistFormProps = {
  skuItems: SkuItem[]
  onChangeStep?: () => void
  onSubmit?: () => void
}

const AddToWishlistForm = ({
  skuItems,
  onChangeStep,
  onSubmit,
}: AddToWishlistFormProps) => {
  const { addToList, removeFromList, updateListItem, lists } = useWishlist()
  const { pushToast } = useUI()
  const [isSubmiting, setIsSubmiting] = useState(false)

  const skuIds = skuItems.map((item) => item.skuId)
  const term = `sku:${skuIds.join(';')}`

  const productQuery = useProductsQuery({
    term,
  })

  const [selectedList, setSelectedList] = useState<Wishlist | null>(lists[0])

  const skus = getSkus(productQuery, skuItems)

  const alreadyInList = selectedList?.products?.some(
    (item) =>
      item && skuItems.some((skuItem) => String(item.ID) === skuItem.skuId)
  )

  const handleAddToList = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()

    setIsSubmiting(true)

    try {
      const data = new FormData(event.currentTarget)

      const listId = data.get('wishlist-list')?.toString()
      const notes = data.get('wishlist-item-notes')?.toString()

      if (listId && skus) {
        await addToList(listId, skus, notes)

        pushToast({
          message: 'Successfully added to the Wishlist',
          status: 'INFO',
        })
      }

      if (onSubmit) {
        onSubmit()
      }
    } catch (error) {
      console.error(error)

      pushToast({
        title: 'Error',
        message: 'There was an error in wishlist. Please try again.',
        status: 'ERROR',
      })
    } finally {
      setIsSubmiting(false)
    }
  }

  const handleRemoveFromList = async () => {
    setIsSubmiting(true)
    try {
      const list = lists.find((listItem) => listItem?.id === selectedList?.id)

      if (!list || !list.id) {
        pushToast({
          message:
            'An unexpected error occurred, please reload the page and try again',
          status: 'ERROR',
        })

        return
      }

      await removeFromList(
        list.id,
        skuItems.map((skuItem) => skuItem.skuId)
      )

      pushToast({
        message: 'Product removed from list',
        status: 'INFO',
      })
      if (onSubmit) {
        onSubmit()
      }
    } catch (error) {
      console.error(error)

      pushToast({
        title: 'Error',
        message: 'There was an error in wishlist. Please try again.',
        status: 'ERROR',
      })
    } finally {
      setIsSubmiting(false)
    }
  }

  const updateListNotes = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()

    setIsSubmiting(true)

    try {
      const data = new FormData(event.currentTarget)

      const listId = data.get('wishlist-list')?.toString()
      const notes = data.get('wishlist-item-notes')?.toString()

      if (listId && skus) {
        await updateListItem(listId, skuItems[0].skuId, notes)

        pushToast({
          message: 'The wishlist has been updated',
          status: 'INFO',
        })
      }

      if (onSubmit) {
        onSubmit()
      }
    } catch (error) {
      console.error(error)

      pushToast({
        title: 'Error',
        message: 'There was an error in wishlist. Please try again.',
        status: 'ERROR',
      })
    } finally {
      setIsSubmiting(false)
    }
  }

  return (
    <form
      className={styles.formContainer}
      onSubmit={(event) => {
        if (alreadyInList) {
          void updateListNotes(event)
        } else {
          void handleAddToList(event)
        }
      }}
    >
      <div data-fs-input-container>
        <Label htmlFor="wishlist-list" className={styles.labelSelect}>
          Select a List
        </Label>
        <select
          id="wishlist-list"
          className={styles.selectInput}
          name="wishlist-list"
          data-fs-custom-select
          onChange={(e) => {
            setSelectedList(
              lists?.find((list) => list?.id === e?.target.value) ?? null
            )
          }}
        >
          {lists?.length === 0 && <option value="">Create a new list</option>}
          {lists?.map((list) => (
            <option key={list?.id} value={list?.id ?? ''}>
              {list?.wishlistType?.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>
      {skuItems.length === 1 && (
        <div data-fs-input-container>
          <Label className={styles.labelText} htmlFor="wishlist-item-notes">
            {alreadyInList ? 'Update ' : 'Add a'} Note to this item (optional)
          </Label>
          <TextArea
            className={styles.textInput}
            data-fs-custom-textarea
            id="wishlist-item-notes"
            name="wishlist-item-notes"
            defaultValue={
              selectedList?.products
                ? selectedList?.products.find(
                    (listItem) => listItem?.ID?.toString() === skuItems[0].skuId
                  )?.notes ?? ''
                : ''
            }
          />
        </div>
      )}

      <Button
        variant="primary"
        type="submit"
        loading={isSubmiting}
        disabled={isSubmiting || lists?.length === 0}
      >
        {alreadyInList ? 'Update ' : 'Add to'} List
      </Button>
      {alreadyInList && (
        <Button
          type="button"
          variant="secondary"
          loading={isSubmiting}
          icon={<Trashcan />}
          onClick={() => void handleRemoveFromList()}
        >
          Remove From List
        </Button>
      )}

      <Button onClick={onChangeStep} variant="tertiary">
        Create New List
      </Button>
    </form>
  )
}

export default AddToWishlistForm
