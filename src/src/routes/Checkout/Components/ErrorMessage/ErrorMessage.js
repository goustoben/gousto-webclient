import PropTypes from 'prop-types'
import React from 'react'
import config from 'config/checkout'
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

  const { errorMessage } = config
  const messageObject = errorMessage[errorType] || errorMessage.generic
  const { header, message, prependLoginLinkToMessage, loginLinkText } = messageObject

  return (
    <div data-testing={`${errorType}`} className={css.container}>
      <Alert>
        {header && <div className={css.header}>{header}</div>}
        <div className={css.messageContainer}>
          {prependLoginLinkToMessage && (
            <a href="#login" role="button" tabIndex="0" onClick={handleLoginClick}>
              {loginLinkText}
            </a>
          )}
          {message}
        </div>
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
