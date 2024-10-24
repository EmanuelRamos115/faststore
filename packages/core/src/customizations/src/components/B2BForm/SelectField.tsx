import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import type { FieldPath, FieldErrors, FieldError } from 'react-hook-form'
import { get } from 'react-hook-form'

import type { B2BSchema } from './schema'
import { IconError } from '../Icons/General/IconError'
import { IconSuccess } from '../Icons/General/IconSuccess'
import styles from './InputField.module.scss'

type SelectOption = {
  value: string
  label: string
}

type SelectFieldProps = {
  label: string
  name: FieldPath<B2BSchema>
  options: SelectOption[]
  errors?: FieldErrors
  touchedFields?: { [x: string]: unknown }
} & InputHTMLAttributes<HTMLSelectElement>

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, options, touchedFields, errors, ...props }, ref) => {
    const inputId = useId()

    const touched = get(touchedFields, props.name) as boolean | undefined
    const error = get(errors, props.name) as FieldError | undefined

    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
        <div className={`${styles.inputContainer} ${styles.selectContainer}`}>
          <select
            ref={ref}
            id={inputId}
            className={styles.input}
            data-fs-input-error={!!error}
            data-fs-input-success={touched && !error}
            {...props}
          >
            <option value="" disabled selected>
              Select an option
            </option>
            {options.map(({ label: optionLabel, value }) => (
              <option value={value}>{optionLabel}</option>
            ))}
          </select>

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
