import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import type { FieldPath, FieldErrors, FieldError } from 'react-hook-form'
import { get } from 'react-hook-form'

import type { B2BSchema } from './schema'
import { IconError } from '../Icons/General/IconError'
import { IconSuccess } from '../Icons/General/IconSuccess'
import styles from './InputField.module.scss'

export type InputFieldProps = {
  label: string
  name: FieldPath<B2BSchema>
  errors?: FieldErrors
  touchedFields?: { [x: string]: unknown }
} & InputHTMLAttributes<HTMLInputElement>

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, touchedFields, errors, ...props }, ref) => {
    const inputId = useId()
    const touched = get(touchedFields, props.name) as boolean | undefined
    const error = get(errors, props.name) as FieldError | undefined

    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
        <div className={styles.inputContainer}>
          <input
            ref={ref}
            id={inputId}
            className={styles.input}
            data-fs-input-error={!!error}
            data-fs-input-success={touched && !error}
            {...props}
          />
          {error && <IconError />}
          {touched && !error && <IconSuccess />}
        </div>
        {error && (
          <span className={styles.error}>{error.message as string}</span>
        )}
      </div>
    )
  }
)
