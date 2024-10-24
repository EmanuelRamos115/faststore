/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react'
import {
  InputField,
  CheckboxField,
  RadioField,
  SelectField,
} from '@faststore/ui'

import styles from './StyleGuide.module.scss'
import Select from '../Select/Select'
import StyleGuideSubSection from './StyleGuideSubSection'

const DUMMY_ITEMS = {
  data_1: 'Data 1',
  data_2: 'Data 2',
  data_3: 'Data 3',
}

type Item = {
  value: string
  text: string
}

const StyleGuideForms = () => {
  const [selectedItem, setSelectedItem] = useState<Item>()

  const handleSelect = (value: string, text: string) => {
    setSelectedItem({ value, text })
  }

  return (
    <>
      <StyleGuideSubSection heading="Modal">
        <div className={styles.card}>TODO</div>
      </StyleGuideSubSection>
      <StyleGuideSubSection heading="Input Fields">
        <div className={`${styles.card} ${styles.cardFlexVertical}`}>
          <InputField label="Label" id="inputfield-default" />
          <InputField
            label="Input w/ Error Message"
            id="inputfield-error"
            error="Error Message"
          />
          <InputField
            label="Input w/ Action"
            id="inputfield-action"
            actionable
            // need to use () => undefined as apposter to () => {} to avoid
            // SonarQube complaining about empty functions
            onSubmit={() => undefined}
            onClear={() => undefined}
          />
          <InputField
            label="Input w/ Action and Error"
            id="inputfield-action-error"
            actionable
            error="Error Message"
            onSubmit={() => undefined}
            onClear={() => undefined}
          />
          <InputField
            label="Input Disabled"
            id="inputfield-disabled"
            disabled
          />
        </div>
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="Checkbox Fields">
        <div className={`${styles.card} ${styles.cardFlex}`}>
          <CheckboxField label="Default" id="checkboxfield-default" />

          {/* @ts-ignore Vtex hasn't properly declared all the props this component accepts */}
          <CheckboxField label="Checked" id="checkboxfield-checked" checked />

          <CheckboxField
            label="Disabled"
            id="checkboxfield-disabled"
            // @ts-ignore Vtex hasn't properly declared all the props this component accepts
            disabled
          />

          <CheckboxField
            // @ts-ignore Vtex hasn't properly declared all the props this component accepts
            checked
            label="Checked & Partial"
            id="checkboxfield-checked-partial"
            partial
          />
        </div>
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="Radio Fields">
        <div className={`${styles.card} ${styles.cardFlex}`}>
          <RadioField label="Default" id="radiofield-default" />

          {/* @ts-ignore Vtex hasn't properly declared all the props this component accepts */}
          <RadioField label="Checked" id="radiofield-checked" checked />

          {/* @ts-ignore Vtex hasn't properly declared all the props this component accepts */}
          <RadioField label="Disabled" id="radiofield-disabled" disabled />

          <RadioField
            // @ts-ignore Vtex hasn't properly declared all the props this component accepts
            checked
            label="Checked & Disabled"
            id="radiofield-checked-disabled"
            disabled
          />
        </div>
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="Select Fields">
        <div className={`${styles.card} ${styles.cardFlex}`}>
          <SelectField
            id="select-overview-default"
            label="Select a Status:"
            options={{
              great: 'Great',
              ok: 'Ok',
              bad: 'Bad',
            }}
          />
          <SelectField
            id="select-overview-disabled"
            label="Select a Status:"
            options={{
              great: 'Great',
              ok: 'Ok',
              bad: 'Bad',
            }}
            disabled
          />
        </div>
      </StyleGuideSubSection>

      <StyleGuideSubSection heading="Select">
        <Select
          items={DUMMY_ITEMS}
          placeholder={selectedItem?.text ?? 'Placeholder'}
          handleClick={handleSelect}
          selected={selectedItem?.value}
          width="280px"
          label="Select"
        />
        <Select
          items={DUMMY_ITEMS}
          placeholder={selectedItem?.text ?? 'Placeholder'}
          selected={selectedItem?.value}
          handleClick={handleSelect}
          label="Select"
        />
        <select name="sample" id="sample">
          <option value="1">Regular Select</option>
          <option value="2">Sample 1</option>
          <option value="3">Sample 2</option>
          <option value="4">Sample 3</option>
        </select>
      </StyleGuideSubSection>
    </>
  )
}

export default StyleGuideForms
