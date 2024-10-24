import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownButton,
  Icon,
} from '@faststore/ui'
import classNames from 'classnames'

import styles from './Select.module.scss'

type SelectProps = {
  items: Record<string, string>
  label: string
  handleClick: (value: string, text: string) => void
  placeholder: string
  selected?: string
  width?: string
}

const Select = ({
  items,
  label,
  selected,
  handleClick,
  placeholder,
  width,
}: SelectProps) => {
  return (
    <Dropdown>
      <DropdownButton
        icon={<Icon name="CaretDown" />}
        iconPosition="right"
        className={styles.dropdownButton}
        style={{
          width,
        }}
      >
        {placeholder}
      </DropdownButton>
      <DropdownMenu
        className={styles.dropdownMenu}
        aria-labelledby={label}
        style={{
          width,
        }}
      >
        {Object.entries(items).map(([value, text]) => {
          return (
            text && (
              <DropdownItem
                key={value}
                className={classNames(
                  styles.dropdownItem,
                  selected === value && styles.dropdownItemSelected
                )}
                onClick={() => handleClick(value, text)}
              >
                {text}
              </DropdownItem>
            )
          )
        })}
      </DropdownMenu>
    </Dropdown>
  )
}

export default Select
