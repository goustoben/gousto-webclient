import React from 'react'
import PropTypes from 'prop-types'
import { DropdownBase } from '../Dropdown/DropdownBase.logic'
import { optionShape } from '../Dropdown/DropdownBase.propTypes'

export const NavDropdown = ({
  isMobile,
  name,
  options,
  placeholder,
  testingSelector,
  renderItem,
}) => (
  <DropdownBase
    isMobile={isMobile}
    name={name}
    options={options}
    placeholder={placeholder}
    testingSelector={testingSelector}
    renderItem={renderItem}
    itemsAreLinks
  />
)

NavDropdown.propTypes = {
  isMobile: PropTypes.bool,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(optionShape).isRequired,
  placeholder: PropTypes.string.isRequired,
  testingSelector: PropTypes.string,
  renderItem: PropTypes.func.isRequired,
}

NavDropdown.defaultProps = {
  isMobile: false,
  testingSelector: '',
}
