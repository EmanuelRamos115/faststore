import classNames from 'classnames'
import type { Dispatch, SetStateAction } from 'react'

import TextInput from '../Form/TextInput'
import styles from './FolderImprintingTable.module.scss'
import FolderImprintingPreviewModal from './FolderImprintingPreviewModal'

type FolderImprintingTableProps = {
  rowCount: number
  refId: string
  fields: Array<{
    tableHeader: string
    values: string[]
    maxCharacters: number
    disabled: boolean
    setTableState: Dispatch<SetStateAction<string[]>>
  }>
}

const FolderImprintingTable = ({
  rowCount,
  refId,
  fields,
}: FolderImprintingTableProps) => {
  const handleTableInputChange = (
    value: string,
    index: number,
    setTableState: Dispatch<SetStateAction<string[]>>
  ) => {
    setTableState((prevState) => {
      let newState = []

      if (prevState.length) {
        newState = prevState.map((s, i) => {
          return i === index ? value : s
        })
      } else {
        newState[index] = value
      }

      return newState
    })
  }

  return (
    <div className={styles.table}>
      <div className={classNames(styles.tableRow, styles.tableHeader)}>
        <div className={styles.numberColumn}>No.</div>
        <div className={styles.contentColumn}>Content</div>
        <div className={styles.lineWrapper}>
          {fields.map(({ tableHeader }) => (
            <div key={tableHeader} className={styles.lineColumn}>
              {tableHeader}
            </div>
          ))}
        </div>
        <div className={styles.actionsColumn}></div>
      </div>

      <p className={styles.editableMessage}>
        Individual fields are fully editable.
      </p>

      <div className={styles.tableBody}>
        {[...(Array(rowCount) as undefined[])].map((_, i) => (
          <div className={styles.tableRow} key={i}>
            <div className={styles.numberColumn}>{i + 1}</div>

            <div className={styles.lineWrapper}>
              {fields.map((field) => (
                <div
                  key={field.tableHeader}
                  className={classNames(
                    styles.lineColumn,
                    field.disabled && styles.lineColumnDisabled
                  )}
                >
                  <label className={styles.lineLabel}>
                    {field.tableHeader}
                  </label>

                  <TextInput
                    sizeClass="small"
                    type="text"
                    value={field.values[i]}
                    disabled={field.disabled}
                    placeholder={field.disabled ? '---' : undefined}
                    maxLength={field.maxCharacters}
                    pattern="[a-zA-Z 0-9\.\(\)\!\#\-\&\@\;\:\/\\\x27]+"
                    aria-label={`Folder Number ${i + 1} ${field.tableHeader}`}
                    onChange={(e) =>
                      handleTableInputChange(
                        e.target.value,
                        i,
                        field.setTableState
                      )
                    }
                  />
                </div>
              ))}

              <div className={styles.actionsColumn}>
                <FolderImprintingPreviewModal
                  refId={refId}
                  index={i + 1}
                  middleLine1Text={fields[0].values[i]}
                  middleLine2Text={fields[1].values[i]}
                  upperLineText={fields[2].values[i]}
                  lowerLineText={fields[3].values[i]}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FolderImprintingTable
