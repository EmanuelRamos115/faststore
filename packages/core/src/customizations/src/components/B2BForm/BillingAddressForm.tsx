import React, { useEffect } from 'react'
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

import { BILLING_CLASSIFICATION, COUNTRIES } from './contants'
import { InputField } from './InputField'
import ToggleInput from './ToggleInput'
import { SelectField } from './SelectField'
import type { B2BSchema } from './schema'
import type { FormBillingInput, InputData } from './B2BForm'
import styles from './B2BForm.module.scss'

interface AccountBillingProps {
  inputData: InputData
  watch: UseFormWatch<B2BSchema>
  register: UseFormRegister<B2BSchema>
  setValue: UseFormSetValue<B2BSchema>
  hasBilling: FormBillingInput
}
function BillingAddressForm({
  inputData,
  hasBilling,
  watch,
  setValue,
  register,
}: AccountBillingProps) {
  const billingCountry = watch('billing.country')
  const billingStates =
    COUNTRIES.find((country) => country.value === billingCountry)?.states ?? []

  useEffect(() => {
    if (billingStates.length === 0) {
      setValue('billing.state', '')
    }
  }, [billingCountry])

  return (
    <div
      className={styles.billingForm}
      data-fs-form-input={hasBilling.formActive}
    >
      <fieldset className={styles.fieldset}>
        <h3 className={styles.sectionTitle}>Billing Information</h3>
        <InputField
          label="Account Name:"
          placeholder="Type here"
          {...inputData}
          {...register('billing.name')}
        />
        <InputField
          label="Attention:"
          placeholder="Type here"
          {...inputData}
          {...register('billing.attention')}
        />
        <InputField
          label="Phone:"
          placeholder="Type here"
          {...inputData}
          {...register('billing.phone')}
        />

        <SelectField
          label="Account Type:"
          placeholder="Type here"
          options={BILLING_CLASSIFICATION}
          {...inputData}
          {...register('billing.classification')}
        />
        <h3 className={styles.sectionTitle}>Billing Address</h3>
        <InputField
          label="Address *:"
          placeholder="Type here"
          {...inputData}
          {...register('billing.street')}
        />
        <ToggleInput
          showInputLabel="+ Add address line 2"
          label="Address Line 2:"
          placeholder="Type here"
          {...inputData}
          {...register('billing.complement')}
        />
        <InputField
          label="City:"
          placeholder="Type here"
          {...inputData}
          {...register('billing.city')}
        />
        <SelectField
          label="Country:"
          placeholder="Type here"
          options={COUNTRIES}
          {...inputData}
          {...register('billing.country')}
        />
        <div data-fs-select-active={billingStates.length}>
          <SelectField
            label={`Select ${billingCountry === 'CA' ? 'Province' : 'State'}:`}
            placeholder="Type here"
            options={billingStates}
            {...inputData}
            {...register('billing.state')}
          />
        </div>

        <InputField
          label={`${billingCountry === 'US' ? 'Zip' : 'Postal'} Code:`}
          placeholder="Type here"
          {...inputData}
          {...register('billing.postalCode')}
        />
      </fieldset>
    </div>
  )
}

export default BillingAddressForm
