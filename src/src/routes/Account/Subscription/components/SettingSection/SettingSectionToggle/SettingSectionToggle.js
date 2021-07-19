import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Icon, iconNames } from '../../Icon'

import css from './SettingSectionToggle.css'

export const SettingSectionToggle = ({
  isExpanded,
  icon,
  title,
  handleClick,
  isMobile,
  renderCurrentValue,
  testingSelector
}) => {
  const shouldRenderCurrentValue = (!isMobile && !isExpanded) || (isMobile)

  return (
    <Fragment>
      <div className={css.header}>
        <Icon name={icon} />
        <p data-testing={`${testingSelector}-title`} className={css.headerTitle}>{title}</p>
        <button
          className={css.headerCta}
          type="button"
          onClick={handleClick}
          onMouseDown={(e) => e.preventDefault()}
          tabIndex="0"
          data-testing={`${testingSelector}-cta`}
        >
          {isExpanded ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {shouldRenderCurrentValue && (
        <div
          data-testing={`${testingSelector}-current-value`}
          className={css.currentValue}
        >
          {renderCurrentValue}
        </div>
      )}
    </Fragment>
  )
}

SettingSectionToggle.propTypes = {
  isExpanded: PropTypes.bool,
  icon: PropTypes.oneOf(iconNames).isRequired,
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  renderCurrentValue: PropTypes.node.isRequired,
  testingSelector: PropTypes.string
}

SettingSectionToggle.defaultProps = {
  isExpanded: false,
  isMobile: false,
  testingSelector: ''
}
