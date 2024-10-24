import type {
  AriaAttributes,
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
} from 'react'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Icon, Button, Input } from '@faststore/ui'

import styles from './HeaderSearch.module.scss'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit'>

type ButtonProps = {
  onClick?: () => void
  testId?: string
}
export interface SearchInputFieldProps extends InputProps {
  id: string
  /**
   * ID to find this component in testing tools (e.g.: cypress, testing library, and jest).
   */
  testId?: string
  /**
   * Props for the submit button inside the input.
   */
  buttonProps?: ButtonProps
  /**
   * A React component that will be rendered as an icon (submit button).
   * @default <Icon name="MagnifyingGlass" />
   */
  buttonIcon?: ReactNode
  /**
   * Custom aria-label for input and button.
   */
  'aria-label'?: AriaAttributes['aria-label']
  /**
   * Callback function when submitted.
   */
  onSubmit: (value: string) => void
}

export interface SearchInputFieldRef {
  inputRef?: HTMLInputElement | null
  formRef?: HTMLFormElement | null
}

const HeaderSearchInputField = forwardRef<
  SearchInputFieldRef | null,
  SearchInputFieldProps
>(function HeaderSearchInputField(
  {
    id,
    onSubmit,
    buttonIcon,
    'aria-label': ariaLabel = 'search',
    testId = 'fs-search-input',
    buttonProps,
    ...otherProps
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (inputRef.current?.value !== '') {
      onSubmit(inputRef.current!.value)
    }
  }

  useImperativeHandle(ref, () => ({
    inputRef: inputRef.current,
    formRef: formRef.current,
  }))

  return (
    <form
      ref={formRef}
      data-fs-search-input-field
      data-testid={testId}
      onSubmit={handleSubmit}
      role="search"
      autoComplete="off"
      action=""
    >
      <label className={styles.searchLabel} htmlFor={id} aria-label={ariaLabel}>
        <Icon name="MagnifyingGlass" />
      </label>
      <Input
        className={styles.searchInput}
        id={id}
        ref={inputRef}
        aria-label={ariaLabel}
        data-fs-search-input-field-input
        type="search"
        placeholder="Search by keyword or item #"
        {...otherProps}
      />
      <Button
        className={styles.searchButton}
        type="submit"
        aria-label="Submit Search"
        icon={<Icon name="MagnifyingGlass" />}
        {...buttonProps}
      >
        Search
      </Button>
    </form>
  )
})

export default HeaderSearchInputField
