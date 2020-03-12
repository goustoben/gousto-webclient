import PropTypes from 'prop-types'
import React from 'react'
import ReCAPTCHA from 'components/Recaptcha'
import { RECAPTCHA_PUBLIC_KEY } from 'config/recaptcha'
import TextInput from 'Form/Input'
import CheckBox from 'Form/CheckBox'
import Label from 'Form/Label'
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
  string.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)
)

const isSecretPingdomEmail = (email) => (
  email
  && email.length === secretPingdomEmailLength
  && email.endsWith(secretPingdomEmailSuffix)
  && quickStringHash(email) === secretPingdomEmailQuickHash
)

class Login extends React.PureComponent {
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
    const { rememberMeDefault } = this.props

    this.setState({ remember: rememberMeDefault })
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

    if (this.captchaNeedsExecuting()) {
      this.recaptchaElement.execute()
    } else {
      this.processLogin()
    }
  }

  processLogin = () => {
    // shouldn't reach here, but just in case
    if (this.captchaNeedsExecuting()) {
      return
    }

    const { email, password, remember, emailValid, passwordValid, recaptchaValue } = this.state
    const { onSubmit, onInvalid } = this.props

    if (emailValid && passwordValid) {
      onSubmit({ email, password, rememberMe: remember, recaptchaToken: recaptchaValue })
    } else {
      onInvalid({ email, password })
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
      <span className={css.confirm} />
    </div>
  )

  captchaNeedsExecuting = () => {
    const { email, recaptchaValue } = this.state
    const { isRecaptchaEnabled } = this.props

    const featureFlagIsOff = isRecaptchaEnabled === false
    const secretEmailEntered = isSecretPingdomEmail(email)

    // prevent errors from breaking the page if the captcha isn't loaded for whatever reason
    const captchaElementNotOnPage = !this.recaptchaElement

    if (featureFlagIsOff || secretEmailEntered || captchaElementNotOnPage) {
      return false
    }

    const captchaIsEmpty = (recaptchaValue === null)

    return captchaIsEmpty
  }

  renderLoginForm = () => {
    const { isAuthenticating, isRecaptchaEnabled, statusText } = this.props
    const { email, password, remember, showValidationError } = this.state

    return (
      <Form onSubmit={this.handleSubmit} method="post" data-testing="loginForm">
        <div className={classnames({ [css.hide]: !showValidationError }, css.error)} data-testing="loginErrMsg">
          {statusText}
        </div>
        <div>
          <Label label="Email" />
          <TextInput
            name="email"
            color="gray"
            textAlign="left"
            type="email"
            required
            onChange={this.emailChanges}
            value={email}
            className={css.input}
            mask
          />
          <Label label="Password" />
          <TextInput
            color="gray"
            textAlign="left"
            type="password"
            name="password"
            required
            onChange={this.passwordChanges}
            value={password}
            className={css.input}
            mask
          />
        </div>
        <div className={css.row}>
          <div className={css.rememberMe}>
            <CheckBox
              data-testing="loginCheckbox"
              label="Remember me"
              textSize="Medium"
              onChange={this.checkboxChanges}
              checked={remember}
            />
          </div>
          <a href={config.routes.client.resetForm} className={css.link}>Forgot your password?</a>
        </div>
        {
          isRecaptchaEnabled
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
        <Button
          data-testing="loginFormSubmit"
          disabledClick={this.disabledClick}
          onClick={this.handleSubmit}
          pending={isAuthenticating}
          width="full"
        >
          Login
        </Button>
      </Form>
    )
  }

  render() {
    const { isAuthenticated } = this.props

    return (
      <div className={css.modalContent} data-testing="loginModal">
        <h4 className={css.heading}>Login</h4>
        {(isAuthenticated) ? this.renderConfirmMessage() : this.renderLoginForm()}
      </div>
    )
  }
}

Login.propTypes = {
  changeRecaptcha: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  isAuthenticating: PropTypes.bool,
  isRecaptchaEnabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInvalid: PropTypes.func,
  rememberMeDefault: PropTypes.bool,
  statusText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
}

Login.defaultProps = {
  changeRecaptcha: () => { },
  isAuthenticated: false,
  isAuthenticating: false,
  onInvalid: () => {},
  rememberMeDefault: false,
  statusText: '',
}

export default Login
