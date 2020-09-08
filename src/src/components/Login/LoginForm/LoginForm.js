import PropTypes from 'prop-types'
import React from 'react'
import ReCAPTCHA from 'components/Recaptcha'
import { RECAPTCHA_PUBLIC_KEY } from 'config/recaptcha'
import { CTA, InputField } from 'goustouicomponents'
import CheckBox from 'Form/CheckBox'
import Form from 'Form'
import config from 'config'
import css from './LoginForm.css'

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

class LoginForm extends React.PureComponent {
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

  componentWillMount() {
    const { rememberMeDefault } = this.props

    this.setState({ remember: rememberMeDefault })
  }

  async componentDidMount() {
    const { changeRecaptcha } = this.props
    await changeRecaptcha()
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.statusText) {
      this.setState({ showValidationError: true })
    }
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
    const { onSubmit } = this.props

    if (emailValid && passwordValid) {
      onSubmit({ email, password, rememberMe: remember, recaptchaToken: recaptchaValue })
    }
  }

  emailChanges = ({ isValid, value }) => {
    this.setState({ email: value })
    if (isValid) {
      this.setState({ emailValid: true })
    } else {
      this.setState({ emailValid: false })
    }
  }

  passwordChanges = ({ isValid, value }) => {
    this.setState({ password: value })
    if (isValid) {
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
    const { remember, showValidationError } = this.state

    return (
      <Form onSubmit={this.handleSubmit} method="post" data-testing="loginForm">
        <div className={css.inputContainer}>
          <InputField
            id="email"
            label="Email"
            onUpdate={this.emailChanges}
            placeholder="Your email"
            required
            type="email"
            testingSelector="inputLoginEmail"
          />
        </div>
        <div className={css.inputContainer}>
          <InputField
            id="password"
            label="Password"
            onUpdate={this.passwordChanges}
            placeholder="Your password"
            required
            type="password"
            testingSelector="inputLoginPassword"
          />
        </div>
        <div className={css.loginOptionsContainer}>
          <div className={css.resetFormContainer}>
            <a href={config.routes.client.resetForm} className={css.link}>Forgot your password?</a>
          </div>
          <div className={css.rememberMe}>
            <CheckBox
              data-testing="loginCheckbox"
              label="Remember me"
              textSize="Medium"
              onChange={this.checkboxChanges}
              checked={remember}
            />
          </div>
        </div>
        {
          showValidationError
          && (
            <div className={css.error} data-testing="loginErrMsg">
              <span className={css.errorIcon} />
              {statusText}
            </div>
          )
        }
        {
          isRecaptchaEnabled
          && (
            <div>
              <ReCAPTCHA
                ref={el => { this.recaptchaElement = el }}
                sitekey={RECAPTCHA_PUBLIC_KEY}
                size="invisible"
                onChange={this.captchaChanges}
              />
            </div>
          )
        }
        <CTA
          testingSelector="loginFormSubmit"
          onClick={this.handleSubmit}
          isLoading={isAuthenticating}
          isFullWidth
        >
          Log in
        </CTA>
      </Form>
    )
  }

  render() {
    const { isAuthenticated } = this.props

    return (
      <div data-testing="loginModal">
        {(isAuthenticated) ? this.renderConfirmMessage() : this.renderLoginForm()}
      </div>
    )
  }
}

LoginForm.propTypes = {
  changeRecaptcha: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  isAuthenticating: PropTypes.bool,
  isRecaptchaEnabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  rememberMeDefault: PropTypes.bool,
  statusText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ])
}

LoginForm.defaultProps = {
  changeRecaptcha: () => { },
  isAuthenticated: false,
  isAuthenticating: false,
  rememberMeDefault: false,
  statusText: '',
}

export {
  LoginForm
}
