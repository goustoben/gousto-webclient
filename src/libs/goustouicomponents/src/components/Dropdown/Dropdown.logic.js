import React from 'react'
import PropTypes from 'prop-types'
import { DropdownBase } from './DropdownBase.logic'
import { optionShape } from './DropdownBase.propTypes'

export const Dropdown = ({
  value,
  isMobile,
  name,
  onChange,
  options,
  placeholder,
  testingSelector,
}) => (
  <DropdownBase
    value={value}
    isMobile={isMobile}
    name={name}
    onChange={onChange}
    options={options}
    placeholder={placeholder}
    testingSelector={testingSelector}
  />
)

Dropdown.propTypes = {
  value: optionShape,
  isMobile: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(optionShape).isRequired,
  placeholder: PropTypes.string.isRequired,
  testingSelector: PropTypes.string,
}

Dropdown.defaultProps = {
  value: null,
  isMobile: false,
  onChange: () => {},
  testingSelector: '',
}

Dropdown.displayName = 'Dropdown'
