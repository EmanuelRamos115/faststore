import type { FormEvent } from 'react'
import { Button, Label, Input, useUI } from '@faststore/ui'

import { useWishlist } from '../../../../hooks/useWishlist'
import styles from './ListForm.module.scss'

const CreateNewList = () => {
  const { createList } = useWishlist()
  const { pushToast } = useUI()

  const handleCreateNewList = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const data = new FormData(event.currentTarget)

    const name = data.get('wishlist-name')?.toString()

    if (name) {
      try {
        await createList(name)

        pushToast({
          message: 'You created a new Wishlist',
          status: 'INFO',
        })
      } catch (error: unknown) {
        const errorMessage =
          error && typeof error === 'object' && 'message' in error
            ? (error as Error).message
            : 'An error occurred.'

        pushToast({
          message: `An error occurred while creating the Wishlist: ${errorMessage}`,
          status: 'ERROR',
        })
      }
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
        <Label htmlFor="wishlist-name">List Name</Label>
        <Input data-fs-custom-input id="wishlist-name" name="wishlist-name" />
      </div>

      <Button variant="primary" type="submit">
        Create List & Add
      </Button>
    </form>
  )
}

export default CreateNewList
