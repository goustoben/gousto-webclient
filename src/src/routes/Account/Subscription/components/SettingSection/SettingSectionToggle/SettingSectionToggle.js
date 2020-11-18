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
  renderCurrentValue
}) => {
  const shouldRenderCurrentValue = (!isMobile && !isExpanded) || (isMobile)

  return (
    <Fragment>
      <div className={css.header}>
        <Icon name={icon} />
        <p className={css.headerTitle}>{title}</p>
        <button
          className={css.headerCta}
          type="button"
          onClick={handleClick}
          tabIndex="0"
          data-testing="header-cta"
        >
          {isExpanded ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {shouldRenderCurrentValue && (
        <div className={css.currentValue}>
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
}

SettingSectionToggle.defaultProps = {
  isExpanded: false,
  isMobile: false
}
