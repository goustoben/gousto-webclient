import React from 'react'
import classNames from 'classnames'
import css from './input.css'
import formsCss from 'styles/forms.css'
import InputWrapper from 'Form/InputWrapper'

export class TextInput extends React.Component {

	static propTypes = {
	  additionalProps: React.PropTypes.object,
	  onChange: React.PropTypes.func,
	  onBlur: React.PropTypes.func,
	  onKeyUp: React.PropTypes.func,
	  onKeyDown: React.PropTypes.func,
	  onEnter: React.PropTypes.func,
	  className: React.PropTypes.string,
	  color: React.PropTypes.oneOf(['primary', 'secondary']),
	  textAlign: React.PropTypes.oneOf(['left', 'center', 'right']),
	  disabled: React.PropTypes.bool,
	  placeholder: React.PropTypes.string,
	  name: React.PropTypes.string,
	  maxLength: React.PropTypes.number,
	  validator: React.PropTypes.func,
	  required: React.PropTypes.bool,
	  isFixed: React.PropTypes.bool,
	  autocompleteOff: React.PropTypes.bool,
	  autoFocus: React.PropTypes.bool,
	  value: React.PropTypes.string.isRequired,
	  type: React.PropTypes.oneOf(['password', 'text', 'email', 'tel', 'number']),
	  pattern: React.PropTypes.string,
	  'data-testing': React.PropTypes.string,
	  error: React.PropTypes.bool,
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
