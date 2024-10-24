import { useState, type FormEvent } from 'react'
import { Button, Label, TextArea, Input, useUI } from '@faststore/ui'
import { useProductsQuery } from '@faststore/core'

import { useWishlist } from '../../../../hooks/useWishlist'
import styles from './ListForm.module.scss'
import type { SkuItem } from '../../AddToWishlistButton'
import { getSkus } from '../../helpers'

type AddToNewWishlistFormProps = { skuItems: SkuItem[]; onSubmit?: () => void }

const AddToNewWishlistForm = ({
  skuItems,
  onSubmit,
}: AddToNewWishlistFormProps) => {
  const { createList } = useWishlist()
  const { pushToast } = useUI()
  const [isSubmiting, setIsSubmiting] = useState(false)
  const skuIds = skuItems.map((item) => item.skuId)

  const term = `sku:${skuIds.join(';')}`

  const productQuery = useProductsQuery({
    term,
  })

  const skus = getSkus(productQuery, skuItems)

  const handleCreateNewList = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()

    setIsSubmiting(true)

    try {
      const data = new FormData(event.currentTarget)

      const name = data.get('wishlist-name')?.toString()
      const notes = data.get('wishlist-item-notes')?.toString()

      if (name && skus) {
        await createList(name, skus, notes)

        pushToast({
          message: 'You created a new Wishlist and your product was added',
          status: 'INFO',
        })
      }

      if (onSubmit) {
        onSubmit()
      }
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === 'object' && 'message' in error
          ? (error as Error).message
          : 'An error occurred.'

      pushToast({
        message: `${errorMessage} Make sure there isn't a wishlist with the same name.`,
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
        void handleCreateNewList(event)
      }}
    >
      <div data-fs-input-container>
        <Label className={styles.labelText} htmlFor="wishlist-name">
          List Name
        </Label>
        <Input
          className={styles.textInput}
          data-fs-custom-input
          id="wishlist-name"
          name="wishlist-name"
        />
      </div>

      {skuItems.length === 1 && (
        <div data-fs-input-container>
          <Label className={styles.labelText} htmlFor="wishlist-item-notes">
            Add a Note to this item (optional)
          </Label>
          <TextArea
            className={styles.textInput}
            data-fs-custom-textarea
            id="wishlist-item-notes"
            name="wishlist-item-notes"
          />
        </div>
      )}

      <Button
        variant="primary"
        type="submit"
        loading={isSubmiting}
        disabled={isSubmiting}
      >
        Create List & Add
      </Button>
    </form>
  )
}

export default AddToNewWishlistForm
