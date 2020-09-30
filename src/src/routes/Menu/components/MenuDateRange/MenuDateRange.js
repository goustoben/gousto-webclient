import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from './MenuDateRange.css'

export const MenuDateRange = ({ variant, text }) => (
  <h1
    className={classNames(css.menuDateRange, { [css.mobile]: variant === 'mobile' })}
    data-testing={`menuDateRange-${variant}`}
  >
    {text}
  </h1>
)

MenuDateRange.propTypes = {
  variant: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}
