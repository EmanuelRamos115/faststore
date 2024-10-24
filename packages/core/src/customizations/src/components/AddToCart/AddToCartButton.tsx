import type { ButtonHTMLAttributes } from 'react'
import { Loader } from '@faststore/ui'

import Action from '../Action/Action'
import styles from './AddToCartButton.module.scss'

type AddToCartButtonProps = {
  text?: string
  size?: 'small' | 'medium' | 'large'
  loading: boolean
  onClick?: () => void
} & ButtonHTMLAttributes<HTMLButtonElement>

const AddToCartButton = ({
  text = 'Add to Cart',
  size = 'large',
  onClick,
  loading = false,
  ...buyProps
}: AddToCartButtonProps) => {
  return (
    <div className={styles.container}>
      <Action
        as="button"
        color="important"
        size={size}
        type={buyProps.form ? 'submit' : 'button'}
        onClick={onClick}
        {...buyProps}
      >
        {text}
      </Action>
      {loading && <Loader />}
    </div>
  )
}

export default AddToCartButton
