import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
// eslint-disable-next-line import/no-unresolved
import formsCss from 'styles/forms.css'
import InputWrapper from 'Form/InputWrapper'
import css from './input.css'
import checkoutCss from '../../../routes/Checkout/Checkout.css'

const propTypes = {
  additionalProps: PropTypes.shape({}),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  onEnter: PropTypes.func,
  className: PropTypes.string,
  color: PropTypes.string,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  maxLength: PropTypes.number,
  validator: PropTypes.func,
  required: PropTypes.bool,
  isFixed: PropTypes.bool,
  autoComplete: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['password', 'text', 'email', 'tel', 'number']),
  pattern: PropTypes.string,
  'data-testing': PropTypes.string,
  error: PropTypes.bool,
  isInCheckout: PropTypes.bool,
  inputPrefix: PropTypes.node,
  onFocus: PropTypes.func,
}

const defaultProps = {
  additionalProps: {},
  color: 'primary',
  className: '',
  name: '',
  disabled: false,
  type: 'text',
  pattern: '',
  required: false,
  textAlign: 'left',
  isFixed: false,
  onKeyDown: () => {},
  error: false,
  isInCheckout: false,
  inputPrefix: null,
  onFocus: () => {},
}

export class TextInput extends Component {
  handleChange = (e) => {
    const { validator, onChange, onEnter } = this.props
    const { target: { value: newValue }, keyCode} = e

    let validated = true
    if (validator) {
      validated = validator(newValue)
    }
    if (validated && onChange) {
      onChange(newValue, e)
    }
    if (keyCode && keyCode === 13 && onEnter) {
      onEnter()
    }
  }

  handleKeyDown = (e) => {
    const { onKeyDown } = this.props
    onKeyDown(e)
  }

  handleBlur = (e) => {
    const { onBlur, isFixed, validator } = this.props
    const { target: { value: newValue }} = e

    if (isFixed) {
      this.scrollEnable()
    }

    let validated = true
    if (validator) {
      validated = validator(newValue)
    }
    if (validated && onBlur) {
      onBlur(newValue)
    }
  }

  scrollDisable = () => {
    if (navigator.userAgent.match(/iPad/i) != null) {
      document.body.setAttribute('class', css.preventScroll)
      document.documentElement.setAttribute('class', css.preventScroll)
    }
  }

  scrollEnable = () => {
    if (navigator.userAgent.match(/iPad/i) != null) {
      document.body.removeAttribute('class')
      document.documentElement.removeAttribute('class')
    }
  }

  handleFocus = () => {
    const { isFixed } = this.props

    if (isFixed) {
      this.scrollDisable()
    }
  }

  render = () => {
    const { additionalProps, autoComplete, color, className, disabled, error, maxLength, name, pattern, placeholder, required, textAlign, type, value, 'data-testing': dataTesting, isInCheckout, inputPrefix } = this.props

    return (
      <div className={classNames({ [checkoutCss.relative]: isInCheckout && inputPrefix })}>
        <input
          { ...additionalProps }
          className={classNames(
            formsCss.input,
            className,
            {
              [formsCss[color]]: formsCss[color],
              [formsCss.inputError]: error,
              [formsCss.disabled]: disabled,
              [css[textAlign]]: css[textAlign],
              [checkoutCss.checkoutInput]: isInCheckout,
              [checkoutCss.checkoutInputError]: error && isInCheckout,
              [checkoutCss.prefixPadding]: isInCheckout && inputPrefix,
            },
          )}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
          onInput={this.handleChange}
          onKeyUp={this.handleChange}
          onKeyDown={this.handleKeyDown}
          maxLength={maxLength}
          value={value}
          required={required}
          type={type}
          pattern={pattern || null}
          autoComplete={autoComplete}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={input => { this.input = input }}
          data-testing={dataTesting}
          onChange={() => {}}
        />
        {isInCheckout && inputPrefix}
      </div>
    )
  }
}

TextInput.propTypes = propTypes

TextInput.defaultProps = defaultProps

export default InputWrapper(TextInput)
