import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { InputCheckPresentation } from './InputCheck.presentation'

const propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.bool,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['default', 'tile']),
  disabled: PropTypes.bool,
  testingSelector: PropTypes.string,
}

const defaultProps = {
  defaultValue: false,
  onChange: () => { },
  type: 'default',
  disabled: false,
  testingSelector: 'input-check',
}

const InputCheck = ({
  id,
  label,
  onChange,
  defaultValue,
  type,
  disabled,
  testingSelector,
}) => {
  const [isChecked, updateIsChecked] = useState(false)
  const defaultEstablished = useRef(false)

  const onChangeHandler = () => {
    updateIsChecked(!isChecked)
  }

  useEffect(() => {
    if (defaultEstablished.current) {
      onChange(id, isChecked)
    }
  }, [isChecked])

  // defaultValue may be assigned by an async action,
  // therefore we need to listen to changes
  useEffect(() => {
    updateIsChecked(defaultValue)

    if (!defaultEstablished.current) {
      defaultEstablished.current = true
    }
  }, [defaultValue])

  useEffect(() => {
    if (disabled) {
      updateIsChecked(false)
    }
  }, [disabled])

  return (
    <InputCheckPresentation
      id={id}
      label={label}
      isChecked={isChecked}
      onChange={onChangeHandler}
      type={type}
      disabled={disabled}
      testingSelector={testingSelector}
    />
  )
}

InputCheck.propTypes = propTypes
InputCheck.defaultProps = defaultProps

export {
  InputCheck,
}
