import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { passwordCriteria } from './errors'
import css from './PasswordCriteria.css'

const getCriteriaClass = (type, errors) => {
  let className = css.defaultMessage
  if (type === 'digits' && (!errors.includes(type) || !errors.includes('symbols'))) {
    className = css.success
  }

  if (type !== 'digits' && !errors.includes(type)) {
    className = css.success
  }

  return className
}

export const PasswordCriteria = ({ passwordErrors, password, showFailedCriteria }) => (
  <div className={css.criteriaContainer}>
    <div className={css.criteriaTitle}>Password requirements:</div>
    <ul className={css.errorsList}>
      {passwordCriteria(password).map(error => {
        const className = typeof passwordErrors === 'string' && passwordErrors ? css.defaultMessage : getCriteriaClass(error.type, passwordErrors)
        const errorClassName = showFailedCriteria && className === css.defaultMessage ? css.error : ''

        return <li key={error.type} className={classNames(css.message, className, errorClassName)}>{error.text}</li>
      })}
    </ul>
  </div>
)

PasswordCriteria.propTypes = {
  passwordErrors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  password: PropTypes.string,
  showFailedCriteria: PropTypes.bool,
}

PasswordCriteria.defaultProps = {
  passwordErrors: [],
  password: '',
  showFailedCriteria: false,
}
