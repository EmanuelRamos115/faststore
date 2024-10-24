import React, { forwardRef, useState } from 'react'

import type { InputFieldProps } from './InputField'
import { InputField } from './InputField'
import styles from './ToggleInput.module.scss'

type ToggleInputProps = InputFieldProps & { showInputLabel?: string }

const ToggleInput = forwardRef<HTMLInputElement, ToggleInputProps>(
  ({ showInputLabel, ...props }, ref) => {
    const [showInputField, setShowInputField] = useState(false)

    return (
      <>
        {showInputField ? (
          <InputField ref={ref} {...props} />
        ) : (
          <span
            role="button"
            tabIndex={0}
            onClick={() => setShowInputField(true)}
            className={styles.toggleInput}
          >
            {showInputLabel}
          </span>
        )}
      </>
    )
  }
)

export default ToggleInput
