import React from 'react'
import { Button } from '@faststore/ui'
import type { FieldErrors } from 'react-hook-form'

import type { FormBillingInput, FormLoading } from './B2BForm'
import { useScroll } from '../../hooks/useScroll'
import type { B2BSchema } from './schema'
import styles from './B2BForm.module.scss'

interface ButtonControlsProps {
  hasBilling: FormBillingInput
  setHasBilling: React.Dispatch<React.SetStateAction<FormBillingInput>>
  loading: FormLoading
  errors: FieldErrors<B2BSchema>
}
function ButtonControls({
  hasBilling,
  setHasBilling,
  loading,
  errors,
}: ButtonControlsProps) {
  const { scrollToTop } = useScroll()

  return (
    <>
      {hasBilling.checked && !hasBilling.formActive ? (
        <Button
          type="button"
          variant="primary"
          onClick={() => {
            setHasBilling({ ...hasBilling, formActive: true })
            scrollToTop()
          }}
        >
          Add Billing data
        </Button>
      ) : (
        <div className={styles.submitContainer}>
          <Button
            type="submit"
            variant="primary"
            loading={loading.isLoading}
            disabled={loading.isLoading}
          >
            Submit Request
            {loading.message && (
              <span className={styles.submitErrorMessage}>
                <br />
                {loading.message}
              </span>
            )}
          </Button>
          {hasBilling.formActive && (
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                setHasBilling({ ...hasBilling, formActive: false })
                scrollToTop()
              }}
              data-fs-button-back-errors={Object.keys(errors).length > 0}
            >
              Back to Registration form
              {Object.keys(errors).length > 0 && (
                <span>
                  <br />
                  Need fix some errors!
                </span>
              )}
            </Button>
          )}
        </div>
      )}
    </>
  )
}

export default ButtonControls
