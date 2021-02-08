import PropTypes from 'prop-types'
import React from 'react'
import { Alert } from 'goustouicomponents'
import config from 'config/checkout'
import { AlertCheckoutOverhaul } from '../AlertCheckoutOverhaul'
import { CustomerCareDetails } from './CustomerCareDetails'
import css from './ErrorMessage.css'

export const ErrorMessage = ({ errorType, goBack, isCheckoutOverhaulEnabled, onLoginClick }) => {
  if (!errorType) {
    return null
  }

  const handleLoginClick = (e) => {
    e.preventDefault()
    onLoginClick(e)
  }

  if (isCheckoutOverhaulEnabled) {
    const { errorMessagesForCheckoutOverhaul } = config
    const messageObject = errorMessagesForCheckoutOverhaul[errorType] || errorMessagesForCheckoutOverhaul.generic
    const {
      header,
      message,
      prependLoginLinkToMessage,
      loginLinkText,
      displayCustomerCareDetails,
    } = messageObject

    return (
      <div data-testing={`${errorType}`} className={css.checkoutOverhaulContainer}>
        <AlertCheckoutOverhaul>
          {header && <div className={css.header}>{header}</div>}
          <div className={css.messageContainer}>
            {prependLoginLinkToMessage && (
              <a href="#login" role="button" tabIndex="0" onClick={handleLoginClick}>
                {loginLinkText}
              </a>
            )}
            {message}
          </div>
          {displayCustomerCareDetails && <CustomerCareDetails />}
        </AlertCheckoutOverhaul>
      </div>
    )
  } else {
    return (
      <div data-testing={`${errorType}`} className={css.container}>
        <Alert type="danger">
          {config.errorMessage[errorType] || config.errorMessage.generic}
          {config.errorsRequireGoBack.includes(errorType) && (
            <button className={css.goBackButton} type="button" onClick={() => goBack()}>
              Back to Delivery
            </button>
          )}
        </Alert>
      </div>
    )
  }
}

ErrorMessage.propTypes = {
  errorType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  goBack: PropTypes.func,
  isCheckoutOverhaulEnabled: PropTypes.bool,
  onLoginClick: PropTypes.func,
}

ErrorMessage.defaultProps = {
  errorType: null,
  goBack: () => {},
  isCheckoutOverhaulEnabled: false,
  onLoginClick: () => {},
}
