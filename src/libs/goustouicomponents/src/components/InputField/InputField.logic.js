import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import css from './InputField.module.css'
import { InputErrorMessage } from '../InputErrorMessage'
import { InputLabel } from '../InputLabel'
import { validateEmail, validatePhone } from '../../utils/typeValidation'

const propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'tel', 'email', 'password']),
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  subCopy: PropTypes.string,
  disabled: PropTypes.bool,
  phonePrefix: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
  required: PropTypes.bool,
  testingSelector: PropTypes.string,
  value: PropTypes.string,
}

const defaultProps = {
  type: 'text',
  label: null,
  subCopy: null,
  disabled: false,
  phonePrefix: false,
  required: false,
  testingSelector: null,
  value: '',
}

class InputField extends Component {
  constructor(props) {
    super(props)

    const { value } = props

    this.state = {
      inputError: null,
      value,
    }
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props

    if (prevProps.value !== value) {
      this.setState({ value })
    }
  }

  handleOnChange = (event) => {
    const { id, onUpdate, required } = this.props
    const { type, value } = event.target

    const inputError = this.getInputValidation(type, value, required)
    const isValid = inputError === null

    onUpdate({ id, value, isValid })

    this.setState((prevState) => ({
      ...prevState,
      inputError,
      value,
    }))
  }

  getInputValidation = (type, value, required) => {
    if (!value && required) {
      return 'This field is required'
    }
    if (value) {
      if (type === 'email' && !validateEmail(value)) {
        return 'Please enter a valid email address'
      }

      if (type === 'tel' && !validatePhone(value)) {
        return 'Please enter a valid phone number'
      }
    }

    return null
  }

  render() {
    const {
      id,
      type,
      placeholder,
      label,
      subCopy,
      disabled,
      phonePrefix,
      required,
      testingSelector,
    } = this.props
    const {
      inputError,
      value,
    } = this.state

    const inputFieldClasses = classnames(
      css.inputField,
      {
        input: disabled,
        [css.inputError]: inputError,
        [css.inputPrefix]: phonePrefix,
      },
    )

    return (
      <div className={css.inputFieldContainer}>
        <InputLabel
          inputId={id}
        >
          {label}
        </InputLabel>
        {subCopy && <div className={css.subCopy}>{subCopy}</div>}
        <div className={css.inputPrefixContainer}>
          {phonePrefix && <span className={css.phonePrefix}>+44 (0)</span>}
          <input
            data-testing={testingSelector}
            id={id}
            type={type}
            placeholder={placeholder}
            onChange={this.handleOnChange}
            className={inputFieldClasses}
            disabled={disabled}
            value={value}
            required={required}
          />
        </div>
        {(inputError) && (
          <InputErrorMessage>
            {inputError}
          </InputErrorMessage>
        )}
      </div>
    )
  }
}

InputField.defaultProps = defaultProps
InputField.propTypes = propTypes

export { InputField }
