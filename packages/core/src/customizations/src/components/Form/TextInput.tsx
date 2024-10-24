import classNames from 'classnames'
import type { InputHTMLAttributes } from 'react'

import styles from './TextInput.module.scss'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  sizeClass: 'small' | 'medium'
  fullWidth?: boolean
}

const TextInput = ({
  sizeClass,
  fullWidth,
  className,
  ...domProps
}: TextInputProps) => {
  const classes = classNames(
    styles.textInput,
    styles[sizeClass],
    { [styles.fullWidth]: fullWidth },
    className
  )

  return <input {...domProps} className={classes} />
}

export default TextInput
