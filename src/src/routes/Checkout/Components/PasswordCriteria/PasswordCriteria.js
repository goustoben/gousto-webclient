import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { passwordCriteria } from './errors'
import css from './PasswordCriteria.module.css'

const max = 'validation.max.string.password'
const min = 'validation.min.string.password'

export const PasswordCriteria = ({ password, passwordErrors, showFailedCriteria }) => {
  const maxValue = passwordErrors.length > 0 && passwordErrors.includes(max)
  const requirements = passwordCriteria.filter((item) =>
    maxValue ? item.rule !== min : item.rule !== max
  )

  return (
    <div className={css.criteriaContainer}>
      <div className={css.criteriaTitle}>Password requirements:</div>
      <ul className={css.errorsList}>
        {requirements.map(({ message, rule }) => {
          const className =
            !passwordErrors.includes(rule) && password ? css.success : css.defaultMessage
          const errorClassName =
            showFailedCriteria && className === css.defaultMessage ? css.error : ''

          return (
            <li key={rule} className={classNames(css.message, className, errorClassName)}>
              {message}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

PasswordCriteria.propTypes = {
  passwordErrors: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.List),
    PropTypes.arrayOf(PropTypes.string),
  ]),
  password: PropTypes.string,
  showFailedCriteria: PropTypes.bool,
}

PasswordCriteria.defaultProps = {
  passwordErrors: Immutable.List([]),
  password: '',
  showFailedCriteria: false,
}
