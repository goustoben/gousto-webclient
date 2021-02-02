import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
// eslint-disable-next-line import/no-unresolved
import formsCss from 'styles/forms.css'
import InputWrapper from 'Form/InputWrapper'
import css from './input.css'
import redesignCss from '../../../routes/Checkout/CheckoutRedesignContainer.css'

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
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  maxLength: PropTypes.number,
  validator: PropTypes.func,
  required: PropTypes.bool,
  isFixed: PropTypes.bool,
  autocompleteOff: PropTypes.bool,
  value: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['password', 'text', 'email', 'tel', 'number']),
  pattern: PropTypes.string,
  'data-testing': PropTypes.string,
  error: PropTypes.bool,
  isCheckoutOverhaulEnabled: PropTypes.bool,
  inputPrefix: PropTypes.node,
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
  autoFocus: false,
  isFixed: false,
  autocompleteOff: false,
  onKeyDown: () => {},
  error: false,
  isCheckoutOverhaulEnabled: false,
  inputPrefix: null,
}

export class TextInput extends Component {
  componentWillReceiveProps(nextProps) {
    const { autoFocus } = this.props

    if (nextProps.autoFocus && !autoFocus) {
      if (this.focusTimer) {
        clearTimeout(this.focusTimer)
      }
      this.focusTimer = setTimeout(() => {
        if (this.input && this.input.focus) {
          this.input.focus()
        }
      }, 100)
    }
  }

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

  render = () => {
    const { additionalProps, autocompleteOff, color, className, disabled, error, isFixed, maxLength, name, pattern, placeholder, required, textAlign, type, value, 'data-testing': dataTesting, isCheckoutOverhaulEnabled, inputPrefix } = this.props

    return (
      <div className={classNames({ [redesignCss.relative]: isCheckoutOverhaulEnabled && inputPrefix })}>
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
              [redesignCss.inputRedesign]: isCheckoutOverhaulEnabled,
              [redesignCss.inputErrorRedesign]: error && isCheckoutOverhaulEnabled,
              [redesignCss.prefixPadding]: isCheckoutOverhaulEnabled && inputPrefix,
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
          autoComplete={(autocompleteOff) ? 'off' : 'on'}
          onFocus={(isFixed) ? this.scrollDisable : () => {}}
          onBlur={this.handleBlur}
          ref={input => { this.input = input }}
          data-testing={dataTesting}
          onChange={() => {}}
        />
        {isCheckoutOverhaulEnabled && inputPrefix}
      </div>
    )
  }
}

TextInput.propTypes = propTypes

TextInput.defaultProps = defaultProps

export default InputWrapper(TextInput)
