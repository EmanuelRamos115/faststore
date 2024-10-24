import React, { useEffect } from 'react'
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

import { CUSTOMER_CLASSIFICATION, COUNTRIES } from './contants'
import { InputField } from './InputField'
import { SelectField } from './SelectField'
import ToggleInput from './ToggleInput'
import type { FormBillingInput, InputData } from './B2BForm'
import type { B2BSchema } from './schema'
import styles from './B2BForm.module.scss'

interface AccountInformationProps {
  inputData: InputData
  watch: UseFormWatch<B2BSchema>
  register: UseFormRegister<B2BSchema>
  setValue: UseFormSetValue<B2BSchema>
  hasBilling: FormBillingInput
  setHasBilling: React.Dispatch<React.SetStateAction<FormBillingInput>>
}
function AccountInformationForm({
  inputData,
  hasBilling,
  setHasBilling,
  watch,
  register,
  setValue,
}: AccountInformationProps) {
  const orgType = watch('account.classification')
  const orgInterest = watch('account.interest')
  const orgCountry = watch('address.country')

  const orgInterests =
    CUSTOMER_CLASSIFICATION.find((interest) => interest.label === orgType)
      ?.interest ?? []

  const orgStates =
    COUNTRIES.find((country) => country.value === orgCountry)?.states ?? []

  const orgDetails =
    CUSTOMER_CLASSIFICATION.find((detail) => detail.label === orgType)
      ?.details ?? []

  const orgRoles =
    orgInterests.find((interest) => interest.label === orgInterest)?.role ?? []

  useEffect(() => {
    if (orgDetails.length === 0) {
      setValue('account.detail', '')
    }

    if (orgStates.length === 0) {
      setValue('address.state', '')
    }

    if (orgInterests.length === 0) {
      setValue('account.interest', '')
    }

    if (orgRoles.length === 0) {
      setValue('account.role', '')
    }
  }, [orgType, orgCountry, orgInterest])

  return (
    <div
      className={styles.basicInfoForm}
      data-fs-form-input={hasBilling.formActive}
    >
      <fieldset className={styles.fieldset}>
        <h3 className={styles.sectionTitle}>Account Information</h3>
        <InputField
          label="Account Name:"
          placeholder="Type here"
          {...inputData}
          {...register('account.name')}
        />
        <InputField
          label="Attention:"
          placeholder="Type here"
          {...inputData}
          {...register('account.attention')}
        />
        <InputField
          label="Phone:"
          placeholder="Type here"
          {...inputData}
          {...register('account.phone')}
        />

        <SelectField
          label="Account Type:"
          placeholder="Type here"
          options={CUSTOMER_CLASSIFICATION}
          {...inputData}
          {...register('account.classification')}
        />
        <div data-fs-select-active={orgDetails.length}>
          <SelectField
            label="Organization Detail:"
            placeholder="Type here"
            options={orgDetails}
            {...inputData}
            {...register('account.detail')}
          />
        </div>
        <div data-fs-select-active={orgInterests.length}>
          <SelectField
            label="Interest:"
            placeholder="Type here"
            {...inputData}
            {...register('account.interest')}
            options={orgInterests}
          />
        </div>
        <div data-fs-select-active={orgRoles.length}>
          <SelectField
            label="Role:"
            placeholder="Type here"
            options={orgRoles}
            {...inputData}
            {...register('account.role')}
          />
        </div>
      </fieldset>
      <fieldset className={styles.fieldset}>
        <h3 className={styles.sectionTitle}>Shipping Address</h3>
        <InputField
          label="Address *:"
          placeholder="Type here"
          {...inputData}
          {...register('address.street')}
        />
        <ToggleInput
          showInputLabel="+ Add address line 2"
          label="Address Line 2:"
          placeholder="Type here"
          {...inputData}
          {...register('address.complement')}
        />
        <InputField
          label="City:"
          placeholder="Type here"
          {...inputData}
          {...register('address.city')}
        />
        <SelectField
          label="Country:"
          placeholder="Type here"
          options={COUNTRIES}
          {...inputData}
          {...register('address.country')}
        />
        <div data-fs-select-active={orgStates.length}>
          <SelectField
            label={`Select ${orgCountry === 'CA' ? 'Province' : 'State'}:`}
            placeholder="Type here"
            options={orgStates}
            {...inputData}
            {...register('address.state')}
          />
        </div>

        <InputField
          label={`${orgCountry === 'US' ? 'Zip' : 'Postal'} Code:`}
          placeholder="Type here"
          {...inputData}
          {...register('address.postalCode')}
        />
      </fieldset>
      <fieldset className={styles.fieldset}>
        <div className={styles.radioContainer}>
          <legend>Would you like to create a separate billing account?</legend>
          <label className={styles.billingRadio} htmlFor="yesOption">
            <input
              type="radio"
              id="yesOption"
              name="option"
              value="true"
              checked={hasBilling.checked}
              onClick={() => {
                setHasBilling({ ...hasBilling, checked: true })
                setValue('billing.hasBilling', true)
              }}
            />
            Yes
          </label>
          <label className={styles.billingRadio} htmlFor="noOption">
            <input
              type="radio"
              id="noOption"
              name="option"
              value="false"
              checked={!hasBilling.checked}
              onClick={() => {
                setHasBilling({ ...hasBilling, checked: false })
                setValue('billing.hasBilling', false)
              }}
            />
            No
          </label>
        </div>
      </fieldset>
    </div>
  )
}

export default AccountInformationForm
