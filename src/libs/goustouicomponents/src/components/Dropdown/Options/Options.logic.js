import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { optionShape, defaultRenderItem } from '../DropdownBase.propTypes'
import { OptionsWrapper } from './OptionsWrapper'

import css from './Options.module.css'
import { onEnter } from '../../../utils/accessibility'

export const Options = ({
  isExpanded,
  isMobile,
  toggleOptionsVisibility,
  selectedOption,
  testingSelector,
  handleOptionClick,
  name,
  options,
  renderItem,
  itemsAreLinks,
}) => {
  const composeOptionClasses = ({ isSelected, disabled }) => classnames(css.option, {
    [css.itemsAreLinks]: itemsAreLinks,
    [css.optionSelected]: isSelected,
    [css.optionDisabled]: disabled,
  })

  return (
    <OptionsWrapper
      isExpanded={isExpanded}
      isMobile={isMobile}
      name={name}
      toggleOptionsVisibility={toggleOptionsVisibility}
      testingSelector={testingSelector}
    >
      <ul
        role="listbox"
        aria-activedescendant={selectedOption && selectedOption.text}
        className={classnames(css.dropdown, { [css.isMobile]: isMobile })}
        data-testing={`${testingSelector}-options`}
        tabIndex="0"
        aria-label="options"
      >
        {options.map((option) => {
          const { text, value, disabled } = option
          const isSelected = selectedOption && selectedOption.value === value

          return (
            <li
              className={composeOptionClasses({
                isSelected,
                disabled,
              })}
              id={text}
              key={text}
              role="option"
              aria-selected={isSelected}
              aria-disabled={disabled}
              tabIndex={itemsAreLinks ? null : '0'}
              onClick={handleOptionClick(option)}
              onKeyDown={(e) => onEnter(e, handleOptionClick(option))}
            >
              {renderItem ? renderItem(option) : defaultRenderItem(option)}
              {isSelected && (
                <span
                  data-testing="selected-option-icon"
                  role="img"
                  alt="checkmark"
                  className={css.selectedIcon}
                />
              )}
            </li>
          )
        })}
      </ul>
    </OptionsWrapper>
  )
}

Options.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  handleOptionClick: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(optionShape).isRequired,
  selectedOption: optionShape,
  testingSelector: PropTypes.string,
  toggleOptionsVisibility: PropTypes.func.isRequired,
  renderItem: PropTypes.func,
  itemsAreLinks: PropTypes.bool,
}

Options.defaultProps = {
  selectedOption: null,
  testingSelector: '',
  renderItem: defaultRenderItem,
  itemsAreLinks: false,
}
