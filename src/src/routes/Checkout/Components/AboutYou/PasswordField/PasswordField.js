import PropTypes from 'prop-types'
import React, { useState, useRef } from 'react'
import Immutable from 'immutable'
import classNames from 'classnames'
import { useDebounce } from 'react-use'
import checkoutCss from '../../../Checkout.module.css'

const propTypes = {
  name: PropTypes.string,
  passwordValue: PropTypes.string,
  type: PropTypes.oneOf(['password', 'text']),
  dataTesting: PropTypes.string,
  passwordErrors: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.List),
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onFocus: PropTypes.func,
  onCustomPasswordBlur: PropTypes.func,
  validatePassword: PropTypes.func,
  isMobile: PropTypes.bool,
  inputSuffix: PropTypes.node,
}

const defaultProps = {
  name: '',
  type: 'text',
  passwordErrors: Immutable.List([]),
  onFocus: () => {},
  onCustomPasswordBlur: () => {},
  validatePassword: () => {},
  isMobile: true,
  dataTesting: '',
  inputSuffix: null,
  passwordValue: '',
}

export const PasswordField = ({
  name,
  type,
  dataTesting,
  inputSuffix,
  passwordErrors,
  passwordValue,
  onCustomPasswordBlur,
  onFocus,
  isMobile,
  validatePassword,
}) => {
  const inputRef = useRef()
  const [touched, setTouched] = useState(false)
  const [value, setValue] = useState(passwordValue)

  useDebounce(
    () => {
      validatePassword(value)
    },
    300,
    [validatePassword, value]
  )

  const handleChange = (e) => {
    const { value: newValue } = e.target
    setValue(newValue)
  }

  const handleBlur = () => {
    setTouched(true)
    onCustomPasswordBlur()
  }

  const handleFocus = () => {
    onFocus()
    if (isMobile) {
      window.scrollTo({
        top: inputRef.current.getBoundingClientRect().top,
        left: 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className={classNames({ [checkoutCss.relative]: inputSuffix })}>
      <label htmlFor="password">
        <p className={checkoutCss.label}>Password</p>
        <input
          id="password"
          className={classNames(checkoutCss.password, checkoutCss.checkoutInput, {
            [checkoutCss.checkoutInputError]:
              (touched && !value) || (passwordErrors.length > 0 && value),
            [checkoutCss.validPassword]: passwordErrors.length === 0 && value,
          })}
          name={name}
          value={value}
          type={type}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-testing={dataTesting}
          onChange={handleChange}
          ref={inputRef}
          autoComplete="new-password"
        />
        {inputSuffix}
      </label>
    </div>
  )
}

PasswordField.propTypes = propTypes
PasswordField.defaultProps = defaultProps
