import PropTypes from 'prop-types'
import React from 'react'

import Link from 'Link'
import { Alert } from 'goustouicomponents'
import configRoutes from 'config/routes'
import css from './FormAlert.css'

const customTokenMessage = (
  <span>
    <br />
    &nbsp;Please&nbsp;
    <Link to={configRoutes.client.resetForm} clientRouted={false}>request a new link</Link>
    &nbsp;to reset your password!
  </span>
)

const FormAlert = ({ errorResetPassword }) => {
  if (!errorResetPassword || !errorResetPassword.length) {
    return null
  }

  return (
    <Alert type="danger">
      <ul className={css.errorList}>
        {errorResetPassword.map((errorItem) => {
          const { error, message } = errorItem

          if (!message || !error) {
            return null
          }

          return (
            <li className={css.errorListItem} key={error}>
              {message}
              {error === 'password_token-invalid' && customTokenMessage}
            </li>
          )
        })}
      </ul>
    </Alert>
  )
}

FormAlert.propTypes = {
  errorResetPassword: PropTypes.arrayOf(PropTypes.shape({
    error: PropTypes.string,
    message: PropTypes.string,
  }))
}

FormAlert.defaultProps = {
  errorResetPassword: null
}

export { FormAlert }
