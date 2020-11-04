import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Svg from 'components/Svg'
import css from './ExpandingSection.css'

export const EXPANDING_SECTION_ICONS = {
  none: 'none',
  home: 'home'
}

export const ExpandingSection = ({
  testingSelector,
  icon,
  heading,
  onExpand,
  children
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleSection = () => {
    if (!isExpanded) {
      onExpand()
    }
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className={css.container}
      data-testing={testingSelector}
      aria-expanded={isExpanded}
    >
      <div
        className={css.headerContainer}
        data-testing="header-container"
      >
        {icon !== EXPANDING_SECTION_ICONS.none && (
          <Svg
            fileName={icon}
            className={`icon-${icon}`}
          />
        )}
        <h2 data-testing="heading">{heading}</h2>
        <button
          type="button"
          onClick={toggleSection}
          data-testing="edit-button"
        >
          Edit
        </button>
      </div>
      { children({ isExpanded, collapseSection: toggleSection })}
    </div>
  )
}

ExpandingSection.propTypes = {
  testingSelector: PropTypes.string,
  icon: PropTypes.oneOf(Object.values(EXPANDING_SECTION_ICONS)),
  heading: PropTypes.string.isRequired,
  onExpand: PropTypes.func,
  children: PropTypes.func.isRequired
}

ExpandingSection.defaultProps = {
  testingSelector: '',
  icon: EXPANDING_SECTION_ICONS.none,
  onExpand: () => { },
}
