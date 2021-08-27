import PropTypes from 'prop-types'
import React, { Component, createRef } from 'react'
import classNames from 'classnames'
import checkoutCss from '../../../Checkout.css'

const propTypes = {
  name: PropTypes.string,
  passwordValue: PropTypes.string,
  type: PropTypes.oneOf(['password', 'text']),
  dataTesting: PropTypes.string,
  passwordErrors: PropTypes.arrayOf(PropTypes.string),
  onFocus: PropTypes.func,
  onCustomPasswordBlur: PropTypes.func,
  validatePassword: PropTypes.func,
  isMobile: PropTypes.bool,
  inputSuffix: PropTypes.node,
}

const defaultProps = {
  name: '',
  type: 'text',
  passwordErrors: [],
  onFocus: () => {},
  onCustomPasswordBlur: () => {},
  validatePassword: () => {},
  isMobile: true,
  dataTesting: '',
  inputSuffix: null,
  passwordValue: '',
}

export class PasswordField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      touched: false,
      value: props.passwordValue,
    }
    this.inputRef = createRef()
  }

  handleChange = (e) => {
    const { validatePassword } = this.props
    const { value: newValue } = e.target

    this.setState({ value: newValue })

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout)
    }

    this.debounceTimeout = setTimeout(() => validatePassword(newValue), 300)
  }

  handleBlur = () => {
    const { onCustomPasswordBlur } = this.props

    this.setState({
      touched: true,
    })

    onCustomPasswordBlur()
  }

  handleFocus = () => {
    const { onFocus, isMobile } = this.props

    onFocus()
    if (isMobile) {
      window.scrollTo({
        top: this.inputRef.current.getBoundingClientRect().top,
        left: 0,
        behavior: 'smooth',
      })
    }
  }

  render = () => {
    const { name, type, dataTesting, inputSuffix, passwordErrors } = this.props
    const { touched, value } = this.state

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
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            data-testing={dataTesting}
            onChange={this.handleChange}
            ref={this.inputRef}
            autoComplete="new-password"
          />
          {inputSuffix}
        </label>
      </div>
    )
  }
}

PasswordField.propTypes = propTypes
PasswordField.defaultProps = defaultProps
