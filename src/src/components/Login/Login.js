import PropTypes from 'prop-types'
import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { RECAPTCHA_PUBLIC_KEY } from 'config/recaptcha'
import TextInput from 'Form/Input'
import CheckBox from 'Form/CheckBox'
import { Button } from 'goustouicomponents'
import Form from 'Form'
import classnames from 'classnames'
import config from 'config'
import { validateEmail } from 'utils/auth'
import { getWindow } from 'utils/window'
import css from './Login.css'

const secretPingdomEmailLength = 31
const secretPingdomEmailSuffix = '@gmail.com'
const secretPingdomEmailQuickHash = 294722922

// from StackOverflow [user: lordvlad] https://stackoverflow.com/a/15710692/1916362
// so we disable eslint
const quickStringHash = string => (
  // eslint-disable-next-line
  string.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)
)

const isSecretPingdomEmail = (email) => (
  email.length === secretPingdomEmailLength
    && email.endsWith(secretPingdomEmailSuffix)
    && quickStringHash(email) === secretPingdomEmailQuickHash
)

class Login extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isRecaptchaEnabled: PropTypes.bool.isRequired,
    onInvalid: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    isAuthenticating: PropTypes.bool,
    statusText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    rememberMeDefault: PropTypes.bool,
    changeRecaptcha: PropTypes.func
  }

  static defaultProps = {
    onInvalid: () => { },
    isOpen: false,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: '',
    changeRecaptcha: () => {}
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
      recaptchaValue: null
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

  async componentDidMount() {
    const { changeRecaptcha } = this.props
    await changeRecaptcha()
  }

  componentWillUnmount = () => {
    this.setState({ showValidationError: false })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.recaptchaElement && this.state.recaptchaValue === null) {
      this.recaptchaElement.execute()
    } else {
      this.processLogin()
    }
  }

  processLogin = () => {
    if (this.canSubmit() === false) {
      return
    }

    const { email, password, remember, recaptchaValue } = this.state
    if (this.state.emailValid && this.state.passwordValid) {
      this.props.onSubmit({ email, password, rememberMe: remember, recaptchaToken: recaptchaValue })
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

  captchaChanges = (value) => {
    // only call processLogin callback if the captcha value isn't null (otherwise this is being called due to the captcha expiring)
    const callback = value === null ? undefined : this.processLogin

    this.setState({
      recaptchaValue: value
    }, callback)
  }

  disabledClick = () => {
    this.setState({ showValidationError: true })
    getWindow().setTimeout(() => { this.setState({ showValidationError: false }) }, 3000)
  }

  renderConfirmMessage = () => (
    <div className={css.confirmMsg}>
      You are now Logged in
      {' '}
      <span className={css.confirm} />
    </div>
  )

  canSubmit = () => {
    const { email, recaptchaValue } = this.state
    const { isRecaptchaEnabled } = this.props

    const captchaPassed = recaptchaValue !== null

    return (
      isSecretPingdomEmail(email)
      || (isRecaptchaEnabled === false || captchaPassed)
    )
  }

  renderLoginForm = () => (
    <Form onSubmit={this.handleSubmit} method="post" data-testing="loginForm">
      <div className={classnames({ [css.hide]: !this.state.showValidationError }, css.error)} data-testing="loginErrMsg">
        {this.props.statusText}
      </div>
      <div>
        <TextInput
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
      {
        this.props.isRecaptchaEnabled
        && (
          <div>
            <ReCAPTCHA
              ref={el => { this.recaptchaElement = el }}
              sitekey={RECAPTCHA_PUBLIC_KEY}
              size='invisible'
              onChange={this.captchaChanges}
            />
          </div>
        )
      }
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
