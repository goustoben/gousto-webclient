import PropTypes from 'prop-types'
import React, { useState, useRef } from 'react'
import Immutable from 'immutable'
import useDebounce from 'react-use/lib/useDebounce'
import { InputField, FormFieldStatus } from '@gousto-internal/citrus-react'

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

  const getInputStatus = () => {
    if ((touched && !value) || (passwordErrors.length > 0 && value)) {
      return FormFieldStatus.Error
    } else if (value) {
      return FormFieldStatus.Success
    }

    return null
  }

  return (
    <InputField
      id="password"
      label="Password"
      type={type}
      name={name}
      value={value}
      data-testing={dataTesting}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      ref={inputRef}
      autoComplete="new-password"
      status={getInputStatus()}
      rightAccessory={inputSuffix}
    />
  )
}

PasswordField.propTypes = propTypes
PasswordField.defaultProps = defaultProps
