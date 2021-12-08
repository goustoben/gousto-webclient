import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import { useClickOutside } from '../../hooks/useClickOutside'
import { DropdownBasePresentation } from './DropdownBase.presentation'
import { optionShape, defaultRenderItem } from './DropdownBase.propTypes'

export const DropdownBase = ({
  value,
  isMobile,
  name,
  onChange,
  options,
  placeholder,
  testingSelector,
  renderItem,
  itemsAreLinks,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleOptionsVisibility = () => {
    setIsExpanded(!isExpanded)
  }

  const selectRef = useRef(null)
  useClickOutside(
    selectRef,
    () => {
      setIsExpanded(false)
    },
    [isExpanded],
  )

  const handleOptionClick = ({ disabled, ...option }) => () => {
    if (disabled) {
      return
    }

    onChange(option)
    toggleOptionsVisibility()
  }

  const valueText = value ? value.text : placeholder

  return (
    <DropdownBasePresentation
      handleOptionClick={handleOptionClick}
      isExpanded={isExpanded}
      isMobile={isMobile}
      name={name}
      options={options}
      placeholder={placeholder}
      ref={selectRef}
      selectedOption={value}
      testingSelector={testingSelector}
      toggleOptionsVisibility={toggleOptionsVisibility}
      valueText={valueText}
      renderItem={renderItem}
      itemsAreLinks={itemsAreLinks}
    />
  )
}

DropdownBase.propTypes = {
  value: optionShape,
  isMobile: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(optionShape).isRequired,
  placeholder: PropTypes.string.isRequired,
  testingSelector: PropTypes.string,
  renderItem: PropTypes.func,
  itemsAreLinks: PropTypes.bool,
}

DropdownBase.defaultProps = {
  value: null,
  isMobile: false,
  onChange: () => {},
  testingSelector: '',
  renderItem: defaultRenderItem,
  itemsAreLinks: false,
}
