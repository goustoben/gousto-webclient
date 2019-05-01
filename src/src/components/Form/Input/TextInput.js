import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import formsCss from 'styles/forms.css'
import InputWrapper from 'Form/InputWrapper'
import css from './input.css'

export class TextInput extends React.Component {

	static propTypes = {
	  additionalProps: PropTypes.object,
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
	  autocompleteOff: PropTypes.bool,
	  autoFocus: PropTypes.bool,
	  value: PropTypes.string.isRequired,
	  type: PropTypes.oneOf(['password', 'text', 'email', 'tel', 'number']),
	  pattern: PropTypes.string,
	  'data-testing': PropTypes.string,
	  error: PropTypes.bool,
	}

	static defaultProps = {
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
	}

	componentWillReceiveProps(nextProps) {
	  if (nextProps.autoFocus && !this.props.autoFocus) {
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
	  const newValue = e.target.value
	  let validated = true
	  if (this.props.validator) {
	    validated = this.props.validator(newValue)
	  }
	  if (validated && this.props.onChange) {
	    this.props.onChange(newValue, e)
	  }
	  if (e.keyCode && e.keyCode === 13 && this.props.onEnter) {
	    this.props.onEnter()
	  }
	}

	handleKeyDown = (e) => {
	  this.props.onKeyDown(e)
	}

	handleBlur = (e) => {
	  if (this.props.isFixed) {
	    this.scrollEnable()
	  }
	  const newValue = e.target.value
	  let validated = true
	  if (this.props.validator) {
	    validated = this.props.validator(newValue)
	  }
	  if (validated && this.props.onBlur) {
	    this.props.onBlur(newValue)
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
	  const { color, className, disabled, error, textAlign } = this.props

	  return (
			<span>
				<input
				  {...this.props.additionalProps}
				  className={classNames(
				    formsCss.input,
				    className,
				    {
				      [formsCss[color]]: formsCss[color],
				      [formsCss.inputError]: error,
				      [formsCss.disabled]: disabled,
				      [css[textAlign]]: css[textAlign],
				    },
				  )}
				  placeholder={this.props.placeholder}
				  name={this.props.name}
				  disabled={this.props.disabled}
				  onInput={this.handleChange}
				  onKeyUp={this.handleChange}
				  onKeyDown={this.handleKeyDown}
				  maxLength={this.props.maxLength}
				  value={this.props.value}
				  required={this.props.required}
				  type={this.props.type}
				  pattern={this.props.pattern || null}
				  autoComplete={(this.props.autocompleteOff) ? 'off' : 'on'}
				  onFocus={(this.props.isFixed) ? this.scrollDisable : () => {}}
				  onBlur={this.handleBlur}
				  autoFocus={this.props.autoFocus}
				  ref={input => { this.input = input }}
				  data-testing={this.props['data-testing']}
				/>
			</span>
	  )
	}
}

export default InputWrapper(TextInput)
