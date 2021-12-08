import React, {
  forwardRef,
} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { optionShape, defaultRenderItem } from './DropdownBase.propTypes'
import { Options } from './Options'

import css from './DropdownBase.module.css'

export const DropdownBasePresentation = forwardRef(({
  handleOptionClick,
  isExpanded,
  isMobile,
  name,
  options,
  selectedOption,
  testingSelector,
  toggleOptionsVisibility,
  valueText,
  renderItem,
  itemsAreLinks,
}, ref) => {
  const valueClasses = classnames(
    css.value,
    { [css.expanded]: isExpanded },
  )

  const chevronClass = isExpanded
    ? css.chevronExpanded
    : css.chevronCollapsed

  return (
    <div className={css.container} ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        className={valueClasses}
        onClick={toggleOptionsVisibility}
        data-testing={`${testingSelector}-toggle`}
      >
        {valueText}
        <span
          data-testing={`toggle-icon-${isExpanded ? 'expanded' : 'collapsed'}`}
          role="img"
          alt="chevron"
          aria-label="select-chevron"
          className={chevronClass}
        />
      </button>
      <Options
        isExpanded={isExpanded}
        handleOptionClick={handleOptionClick}
        isMobile={isMobile}
        name={name}
        options={options}
        selectedOption={selectedOption}
        testingSelector={testingSelector}
        toggleOptionsVisibility={toggleOptionsVisibility}
        renderItem={renderItem}
        itemsAreLinks={itemsAreLinks}
      />
    </div>
  )
})

DropdownBasePresentation.propTypes = {
  handleOptionClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(optionShape).isRequired,
  selectedOption: optionShape,
  testingSelector: PropTypes.string,
  toggleOptionsVisibility: PropTypes.func.isRequired,
  valueText: PropTypes.string.isRequired,
  renderItem: PropTypes.func,
  itemsAreLinks: PropTypes.bool,
}

DropdownBasePresentation.defaultProps = {
  testingSelector: '',
  selectedOption: null,
  renderItem: defaultRenderItem,
  itemsAreLinks: false,
}
