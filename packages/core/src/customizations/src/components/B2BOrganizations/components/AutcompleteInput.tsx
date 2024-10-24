import { useRef, useState } from 'react'
import useOnClickOutside from 'src/sdk/ui/useOnClickOutside'
import {
  SearchInputField,
  SearchDropdown,
  SearchAutoComplete,
  SearchAutoCompleteTerm,
  type SearchInputFieldProps,
  type SearchAutoCompleteTermProps,
} from '@faststore/ui'

type AutcompleteInputProps = {
  input: SearchInputFieldProps
  options: SearchAutoCompleteTermProps[]
}

const AutcompleteInput = ({ options, input }: AutcompleteInputProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(searchRef, () => setDropdownVisible(false))

  return (
    <div data-fs-autocomplete-input ref={searchRef}>
      <SearchInputField {...input} onFocus={() => setDropdownVisible(true)} />
      {dropdownVisible && (
        <SearchDropdown>
          <SearchAutoComplete>
            {options.map((option) => (
              <SearchAutoCompleteTerm key={option.suggestion} {...option} />
            ))}
          </SearchAutoComplete>
        </SearchDropdown>
      )}
    </div>
  )
}

export default AutcompleteInput
