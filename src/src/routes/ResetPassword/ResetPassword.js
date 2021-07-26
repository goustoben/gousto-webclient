import PropTypes from 'prop-types'
import React from 'react'

import { Button } from 'goustouicomponents'
import ReCAPTCHA from 'components/Recaptcha'
import { RECAPTCHA_PUBLIC_KEY } from 'config/recaptcha'
import Input from 'Form/Input'
import configAuth from 'config/auth'
import Content from 'containers/Content'
import InputError from 'Form/InputError'
import { PageContent, PageHeader } from 'Page'
import css from './ResetPassword.css'
import { FormAlert } from './FormAlert'

class ResetPassword extends React.PureComponent {
  static propTypes = {
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

  static defaultProps = {
    location: { query: { token: '' } },
    isValidPassword: true,
    errorResetPassword: null,
    authResetPassword: () => {},
    isRecaptchaEnabled: false,
    changeRecaptcha: () => {}
  }

  state = {
    passwordValue: '',
    isPasswordLengthError: false,
    recaptchaValue: null,
  }

  static isPasswordLengthValid = (passwordValue) => (
    passwordValue.length >= configAuth.PASSWORD_MIN_LENGTH
  )

  componentDidMount() {
    const { changeRecaptcha } = this.props
    changeRecaptcha()
  }

  validatePasswordLength(passwordValue) {
    const isPasswordLengthError = !ResetPassword.isPasswordLengthValid(passwordValue)
    this.setState({ isPasswordLengthError })

    return isPasswordLengthError
  }

  handlePasswordChange(passwordValue) {
    this.setState({ passwordValue })
    if (this.state.isPasswordLengthError) {
      this.validatePasswordLength(passwordValue)
    }
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

  captchaChanges = (value) => {
    // only call processReset callback if the captcha value isn't null (otherwise this is being called due to the captcha expiring)
    const callback = value === null ? undefined : this.processReset

    this.setState({
      recaptchaValue: value
    }, callback)
  }

  render() {
    const { errorResetPassword, isRecaptchaEnabled } = this.props
    const { isPasswordLengthError, passwordValue } = this.state

    return (
      <div className={css.wrapper}>
        <PageHeader title="Reset your Password" />
        <PageContent>
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
          <Button className={css.submitButton} onClick={() => this.validateAndSubmit(passwordValue)}>
            Reset password
          </Button>
          {
            isRecaptchaEnabled
            && (
              <ReCAPTCHA
                ref={el => { this.recaptchaElement = el }}
                sitekey={RECAPTCHA_PUBLIC_KEY}
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

export default ResetPassword
