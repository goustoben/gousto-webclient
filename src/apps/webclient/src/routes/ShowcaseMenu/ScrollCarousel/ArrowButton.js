import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from './ScrollCarousel.css'

export const ArrowButton = ({ buttonClassName, iconClassName, canScroll, onClick }) => (
  // Note: it's safe to set tabIndex=-1 for this control to be mouse-only: as
  // long as the contents are focusable, the keyboard users can navigate with
  // Tab, and the scroll position will follow focus.
  <button
    type="button"
    className={classNames(css.arrowButton, buttonClassName, {
      [css.invisible]: !canScroll,
    })}
    onClick={onClick}
    tabIndex={-1}
  >
    <div className={iconClassName} />
  </button>
)

ArrowButton.propTypes = {
  buttonClassName: PropTypes.string.isRequired,
  iconClassName: PropTypes.string.isRequired,
  canScroll: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}
