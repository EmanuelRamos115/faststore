import classNames from 'classnames'
import type { Dispatch, SetStateAction } from 'react'

import Action from '../Action/Action'
import TextInput from '../Form/TextInput'
import CircledPlusIcon from '../Icons/General/CircledPlusIcon'
import CircledXIcon from '../Icons/General/CircledXIcon'
import { useFormattedPrice } from '../../hooks/useFormattedPrice'
import styles from './FolderImprintingLineOptions.module.scss'
import type { ImprintingType, LineType } from './FolderImprinting'

type InputField = {
  type: string
  label: string
  labelStyle?: 'bold'
  value: string
  name: string
  onChange: Dispatch<SetStateAction<LineType | string>>
  options?: Array<{
    text: string
    value: string
  }>
  hidden?: boolean
}

type FolderImprintingLineOptionsProps = {
  section: {
    title: string
    enabled: boolean
    setEnabled: (arg: boolean) => void
  }
  fields: Record<'repeat' | 'diff', InputField[]>
  maxCharacters: number
  price: number
  quantity: number
  imprintingType: ImprintingType
}

const FolderImprintingLineOptions = ({
  section,
  fields,
  maxCharacters,
  price,
  quantity,
  imprintingType,
}: FolderImprintingLineOptionsProps) => {
  const priceFormatted = useFormattedPrice(price)
  const totalPriceFormatted = useFormattedPrice(
    section.enabled ? price * quantity : 0
  )

  const isFree = section.title === 'Middle Lines' && quantity >= 50

  return (
    <div
      className={classNames(
        styles.container,
        section.enabled && styles.containerEnabled
      )}
    >
      <div className={styles.options}>
        {!section.enabled ? (
          <div>
            <h3 className={styles.heading}>{section.title}</h3>
            <Action
              className={styles.enableButton}
              as="button"
              size="medium"
              color="neutralDark"
              type="button"
              onClick={() => section.setEnabled(true)}
            >
              <CircledPlusIcon /> Add Section
            </Action>
          </div>
        ) : (
          fields[imprintingType].map(
            (field, i) =>
              !field.hidden && (
                <>
                  <div className={styles.option} key={field.name}>
                    <label
                      htmlFor={field.name}
                      className={classNames(
                        styles.label,
                        field.labelStyle === 'bold' && styles.labelBold
                      )}
                    >
                      {field.label}
                    </label>
                    <div className={styles.inputWrapper}>
                      {i === 0 && (
                        <button
                          className={styles.disableButton}
                          onClick={() => section.setEnabled(false)}
                          aria-label="Remove section"
                        >
                          <CircledXIcon />
                        </button>
                      )}

                      {field.type === 'select' && field.options && (
                        <select
                          name={field.name}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(e.target.value as LineType)
                          }
                        >
                          {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.text}
                            </option>
                          ))}
                        </select>
                      )}

                      {field.type === 'text' && (
                        <TextInput
                          sizeClass="medium"
                          type={field.type}
                          name={field.name}
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          maxLength={maxCharacters}
                          minLength={1}
                          pattern="[a-zA-Z 0-9\.\(\)\!\#\-\&\@\;\:\/\\\x27]+"
                        />
                      )}

                      {field.type === 'number' && (
                        <TextInput
                          sizeClass="medium"
                          type={field.type}
                          name={field.name}
                          id={field.name}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                  {imprintingType === 'diff' && field.value === 'diff' && (
                    <p className={styles.tableNote}>
                      Insert desired imprinting text in the editable fields
                      provided below.
                    </p>
                  )}
                </>
              )
          )
        )}
      </div>

      <div className={styles.prices}>
        <div className={styles.price}>
          <div className={styles.heading}>Each</div>
          <div className={styles.priceValue}>
            {isFree ? 'FREE' : priceFormatted}
          </div>
        </div>

        <div className={styles.price}>
          <div className={styles.heading}>Subtotal</div>
          <div className={styles.priceValue}>{totalPriceFormatted}</div>
        </div>
      </div>
    </div>
  )
}

export default FolderImprintingLineOptions
