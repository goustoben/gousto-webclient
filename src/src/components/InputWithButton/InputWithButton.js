import React from 'react'
import PropTypes from 'prop-types'
import css from './InputWithButton.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
  eventErrorMessage: PropTypes.string.isRequired,
  showSuccessMessage: PropTypes.bool.isRequired,
}

const InputWithButton = ({ children, eventErrorMessage, showSuccessMessage }) => (
  <div>
    <div className={css.inputWithButtonWrapper}>
      {children}
    </div>
    <p className={css.eventStatus}>
      {eventErrorMessage.length > 0 && eventErrorMessage}
      {showSuccessMessage && 'Your message will arrive shortly'}
    </p>
  </div>
)

InputWithButton.propTypes = propTypes

export {
  InputWithButton,
}
