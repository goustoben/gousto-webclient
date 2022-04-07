import PropTypes from 'prop-types'
import React from 'react'

import { CTA } from 'goustouicomponents'
import ReCAPTCHA from 'components/Recaptcha'
import { getRecaptchaPublicKey } from 'utils/isomorphicEnvironment'
import Input from 'Form/Input'
import configAuth from 'config/auth'
import Content from 'containers/Content'
import InputError from 'Form/InputError'
import { PageContent } from 'Page'
import css from './ResetPassword.css'
import { FormAlert } from './FormAlert'

const propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
  errorResetPassword: PropTypes.string,
  authResetPassword: PropTypes.func,
  isRecaptchaEnabled: PropTypes.bool.isRequired,
  changeRecaptcha: PropTypes.func
}

const defaultProps = {
  errorResetPassword: null,
  authResetPassword: () => {},
  changeRecaptcha: () => {}
}
export class ResetPassword extends React.PureComponent {
  static isPasswordLengthValid = (passwordValue) => (
    passwordValue.length >= configAuth.PASSWORD_MIN_LENGTH
  )

  constructor(props) {
    super(props)
    this.state = {
      passwordValue: '',
      isPasswordLengthError: false,
      recaptchaValue: null,
    }
  }

  componentDidMount() {
    const { changeRecaptcha } = this.props
    changeRecaptcha()
  }

  handlePasswordChange(passwordValue) {
    const { isPasswordLengthError } = this.state
    this.setState({ passwordValue })
    if (isPasswordLengthError) {
      this.validatePasswordLength(passwordValue)
    }
  }

  captchaChanges = (value) => {
    // only call processReset callback if the captcha value isn't null (otherwise this is being called due to the captcha expiring)
    const callback = value === null ? undefined : this.processReset

    this.setState({
      recaptchaValue: value
    }, callback)
  }

  validatePasswordLength(passwordValue) {
    const isPasswordLengthError = !ResetPassword.isPasswordLengthValid(passwordValue)
    this.setState({ isPasswordLengthError })

    return isPasswordLengthError
  }

  validateAndSubmit(passwordValue) {
    if (this.validatePasswordLength(passwordValue)) {
      return
    }
    this.setState({ passwordValue }, () => {
      const { recaptchaValue } = this.state
      if (this.recaptchaElement && recaptchaValue === null) {
        this.recaptchaElement.execute()
      } else {
        this.processReset()
      }
    })
  }

  processReset() {
    const {
      location: { query: { token } },
      authResetPassword,
    } = this.props
    const { passwordValue, recaptchaValue } = this.state

    authResetPassword(passwordValue, token, recaptchaValue)
  }

  render() {
    const { errorResetPassword, isRecaptchaEnabled } = this.props
    const { isPasswordLengthError, passwordValue } = this.state
    const isInputValueEmpty = passwordValue.length === 0

    return (
      <div className={css.wrapper}>
        <PageContent>
          <h1 className={css.resetFormTitle}>Reset your Password</h1>
          <FormAlert errorResetPassword={errorResetPassword} />
          <Input
            type="password"
            placeholder="Please enter a new password"
            value={passwordValue}
            autoFocus
            error={isPasswordLengthError}
            onChange={(inputValue) => this.handlePasswordChange(inputValue)}
            onBlur={() => this.validatePasswordLength(passwordValue)}
            onEnter={() => this.validateAndSubmit(passwordValue)}
          />
          {isPasswordLengthError ? (
            <InputError>
              <Content contentKeys="newPasswordForm.resetPassword.resetPassword.lengthError">
                <span>Password must be at least 8 characters</span>
              </Content>
            </InputError>
          ) : null}
          <div className={css.resetPasswordButton}>
            <CTA
              size="small"
              isFullWidth
              isDisabled={isInputValueEmpty}
              className={css.submitButton}
              onClick={() => this.validateAndSubmit(passwordValue)}
            >
              Reset Password
            </CTA>
          </div>
          {
            isRecaptchaEnabled
            && (
              <ReCAPTCHA
                ref={el => { this.recaptchaElement = el }}
                sitekey={getRecaptchaPublicKey()}
                size="invisible"
                onChange={this.captchaChanges}
              />
            )
          }
        </PageContent>
      </div>
    )
  }
}

ResetPassword.propTypes = propTypes
ResetPassword.defaultProps = defaultProps
