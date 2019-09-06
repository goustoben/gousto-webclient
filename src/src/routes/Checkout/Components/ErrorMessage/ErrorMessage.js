import PropTypes from 'prop-types'
import React from 'react'
import config from 'config/checkout'
import { Alert } from 'goustouicomponents'
import css from './ErrorMessage.css'

const ErrorMessage = ({ errorType, goBack }) => (
  errorType ? (
    <div data-testing={`${errorType}`} className={css.container}>
      <Alert type="danger">
        {config.errorMessage[errorType] || config.errorMessage.generic}
        {config.errorsRequireGoBack.includes(errorType) && (
          <button
            className={css.goBackButton}
            type='button'
            onClick={() => goBack()}
          >
            Back to Delivery
          </button>
        )}
      </Alert>
    </div>
  ) : null
)

ErrorMessage.propTypes = {
  errorType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  goBack: PropTypes.func,
}

ErrorMessage.defaultProps = {
  errorType: null,
  goBack: () => {},
}

export default ErrorMessage
