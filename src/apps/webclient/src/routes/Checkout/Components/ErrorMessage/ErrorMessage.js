import React from 'react'

import { CTA } from 'goustouicomponents'
import PropTypes from 'prop-types'

import { checkoutConfig } from 'config/checkout'

import { Alert } from '../Alert'

import css from './ErrorMessage.css'

export const ErrorMessage = ({ errorType, onLoginClick }) => {
  if (!errorType) {
    return null
  }

  const handleLoginClick = (e) => {
    e.preventDefault()
    onLoginClick(e)
  }

  const { errorMessage } = checkoutConfig
  const messageObject = errorMessage[errorType] || errorMessage.generic
  const { header, message, showLoginCTA } = messageObject

  return (
    <div data-testing={`${errorType}`} className={css.container}>
      <Alert>
        {header && <div className={css.header}>{header}</div>}
        <div className={css.messageContainer}>{message}</div>
        {showLoginCTA && (
          <div className={css.ctaContainer}>
            <CTA size="small" variant="secondary" isFullWidth onClick={handleLoginClick}>
              Log in
            </CTA>
          </div>
        )}
      </Alert>
    </div>
  )
}

ErrorMessage.propTypes = {
  errorType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLoginClick: PropTypes.func,
}

ErrorMessage.defaultProps = {
  errorType: null,
  onLoginClick: () => {},
}
