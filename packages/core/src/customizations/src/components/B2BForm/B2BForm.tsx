import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import type {
  FieldErrors,
  FieldNamesMarkedBoolean,
  SubmitHandler,
} from 'react-hook-form'
import { useSession } from 'src/sdk/session'
import { zodResolver } from '@hookform/resolvers/zod'

import { type B2BSchema, b2bFormSchema } from './schema'
import { useB2BForm } from './useB2BForm'
import styles from './B2BForm.module.scss'
import AccountInformationForm from './AccountInformationForm'
import BillingAddressForm from './BillingAddressForm'
import ButtonControls from './ButtonControls'

export interface FormBillingInput {
  checked: boolean
  formActive: boolean
}
export interface FormLoading {
  isLoading: boolean
  message: undefined | string
}
export interface InputData {
  errors: FieldErrors<B2BSchema>
  touchedFields: FieldNamesMarkedBoolean<B2BSchema>
}
function B2BForm() {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<B2BSchema>({
    resolver: zodResolver(b2bFormSchema),
    mode: 'onBlur',
    defaultValues: {
      billing: {
        hasBilling: false,
      },
    },
  })

  const inputData: InputData = {
    errors,
    touchedFields,
  }

  const { createOrganization } = useB2BForm()
  const { person } = useSession()
  const [hasBilling, setHasBilling] = useState<FormBillingInput>({
    checked: false,
    formActive: false,
  })

  const [loading, setLoading] = useState<FormLoading>({
    isLoading: false,
    message: undefined,
  })

  if (!person) {
    return <></>
  }

  const onSubmit: SubmitHandler<B2BSchema> = async (data) => {
    setLoading({
      isLoading: true,
      message: undefined,
    })

    return createOrganization(data, setLoading)
  }

  return (
    <form
      className={styles.container}
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event)
      }}
    >
      <h2 className={styles.formTitle}>Registration form</h2>
      <div
        className={styles.basicInfoForm}
        data-fs-form-input={hasBilling.formActive}
      >
        <AccountInformationForm
          inputData={inputData}
          hasBilling={hasBilling}
          setHasBilling={setHasBilling}
          register={register}
          watch={watch}
          setValue={setValue}
        />
      </div>
      <div
        className={styles.billingForm}
        data-fs-form-input={hasBilling.formActive}
      >
        <BillingAddressForm
          inputData={inputData}
          hasBilling={hasBilling}
          register={register}
          watch={watch}
          setValue={setValue}
        />
      </div>
      <ButtonControls
        hasBilling={hasBilling}
        setHasBilling={setHasBilling}
        loading={loading}
        errors={errors}
      />
    </form>
  )
}

export default B2BForm
