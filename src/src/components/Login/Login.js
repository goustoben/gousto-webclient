import PropTypes from 'prop-types'
import React from 'react'
import TextInput from 'Form/Input'
import CheckBox from 'Form/CheckBox'
import { Button } from 'goustouicomponents'
import Form from 'Form'
import classnames from 'classnames'
import config from 'config'
import { validateEmail } from 'utils/auth'
import { getWindow } from 'utils/window'
import css from './Login.css'

class Login extends React.PureComponent {
	static propTypes = {
	  onSubmit: PropTypes.func.isRequired,
	  onInvalid: PropTypes.func,
	  isOpen: PropTypes.bool,
	  isAuthenticated: PropTypes.bool,
	  isAuthenticating: PropTypes.bool,
	  statusText: PropTypes.oneOfType([
	    PropTypes.string,
	    PropTypes.bool,
	  ]),
	}

	static defaultProps = {
	  onInvalid: () => {},
	  isOpen: false,
	  isAuthenticated: false,
	  isAuthenticating: false,
	  statusText: '',
	}

	constructor() {
	  super()
	  this.state = {
	    email: '',
	    password: '',
	    remember: true,
	    emailValid: false,
	    passwordValid: false,
	    showValidationError: false,
	  }
	}
	componentWillReceiveProps = (nextProps) => {
	  if (nextProps.statusText) {
	    this.setState({ showValidationError: true })
	  }
	}
	componentWillMount() {
	  this.setState({ remember: this.props.rememberMeDefault })
	}
	componentWillUnmount = () => {
	  this.setState({ showValidationError: false })
	}

	handleSubmit = (e) => {
	  e.preventDefault()
	  const email = this.state.email
	  const password = this.state.password
	  const remember = this.state.remember
	  if (this.state.emailValid && this.state.passwordValid) {
	    this.props.onSubmit(email, password, remember)
	  } else {
	    this.props.onInvalid({ email, password })
	  }
	}

	emailChanges = (value) => {
	  this.setState({ email: value })
	  if (value.length > 0 && validateEmail(value)) {
	    this.setState({ emailValid: true })
	  } else {
	    this.setState({ emailValid: false })
	  }
	}

	passwordChanges = (value) => {
	  this.setState({ password: value })
	  if (value.length > 0) {
	    this.setState({ passwordValid: true })
	  } else {
	    this.setState({ passwordValid: false })
	  }
	}

	checkboxChanges = (checked) => {
	  this.setState({ remember: checked })
	}

	disabledClick = () => {
	  this.setState({ showValidationError: true })
	  getWindow().setTimeout(() => { this.setState({ showValidationError: false }) }, 3000)
	}

	renderConfirmMessage = () => (
		<div className={css.confirmMsg}>
			You are now Logged in <span className={css.confirm} />
		</div>
	)

	renderLoginForm = () => (
		<Form onSubmit={this.handleSubmit} method="post" data-testing="loginForm">
			<div className={classnames({ [css.hide]: !this.state.showValidationError }, css.error)} data-testing="loginErrMsg">
				{this.props.statusText}
			</div>
			<div>
				<TextInput
				  autoFocus={this.props.isOpen}
				  name="email"
				  color="gray"
				  textAlign="left"
				  type="email"
				  placeholder="Enter email"
				  required
				  onChange={this.emailChanges}
				  value={this.state.email}
				  className={css.input}
				  mask
				/>
				<TextInput
				  color="gray"
				  textAlign="left"
				  type="password"
				  name="password"
				  placeholder="Password"
				  required
				  onChange={this.passwordChanges}
				  value={this.state.password}
				  className={css.input}
				  mask
				/>
			</div>
			<div className={css.row}>
				<CheckBox
				  data-testing="loginCheckbox"
				  label="Remember me"
				  onChange={this.checkboxChanges}
				  checked={this.state.remember}
				/>
			</div>
			<div className={css.flex}>
				<a href={config.routes.client.resetForm} className={css.link}>Forgot your password?</a>
				<Button
				  data-testing="loginFormSubmit"
				  disabledClick={this.disabledClick}
				  onClick={this.handleSubmit}
				  pending={this.props.isAuthenticating}
				>
					Go
				</Button>
			</div>
		</Form>
	)

	render() {
	  return (
			<div className={css.modalContent} data-testing="loginModal">
				<h4 className={css.heading}>Login</h4>
				{(this.props.isAuthenticated) ? this.renderConfirmMessage() : this.renderLoginForm()}
			</div>
	  )
	}
}

export default Login
