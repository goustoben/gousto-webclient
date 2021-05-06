import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'config/home'
import { validateEmail } from 'utils/auth'
import { actionTypes } from 'actions/actionTypes'
import { isSecretPingdomEmail } from 'utils/recaptcha'
import { ReferAFriendPresentation } from './ReferAFriend.presentation'

const propTypes = {
  changeRecaptcha: PropTypes.func.isRequired,
  isRecaptchaEnabled: PropTypes.bool.isRequired,
  userReferAFriend: PropTypes.func.isRequired,
  trackingReferFriendSocialSharing: PropTypes.func.isRequired,
}

class ReferAFriend extends PureComponent {
  constructor(props) {
    super(props)

    this.recaptchaElement = null

    this.state = {
      email: '',
      isEmailSent: false,
      isEmailValid: false,
      errorMessage: '',
      recaptchaToken: null,
    }
  }

  async componentDidMount() {
    const { changeRecaptcha } = this.props
    await changeRecaptcha()
  }

  captchaChanges = (value) => {
    // only call referAFriend callback if the captcha value isn't null (otherwise this is being called due to the captcha expiring)
    const callback = value === null ? undefined : this.processReferAFriend

    this.setState({
      recaptchaToken: value
    }, callback)
  }

  captchaNeedsExecuting = () => {
    const { email, recaptchaToken } = this.state
    const { isRecaptchaEnabled } = this.props

    const featureFlagIsOff = isRecaptchaEnabled === false
    const secretEmailEntered = isSecretPingdomEmail(email)

    // prevent errors from breaking the page if the captcha isn't loaded for whatever reason
    const captchaElementNotOnPage = !this.recaptchaElement
    if (featureFlagIsOff || secretEmailEntered || captchaElementNotOnPage) {
      return false
    }

    const captchaIsEmpty = (recaptchaToken === null)

    return captchaIsEmpty
  }

  referAFriend = () => {
    const { email, recaptchaToken } = this.state
    const { userReferAFriend } = this.props

    userReferAFriend(email, recaptchaToken)
  }

  handleEmailChange = (value) => {
    this.setState({ email: value })
    if (value.length > 0 && validateEmail(value)) {
      this.setState({ isEmailValid: true })
    } else {
      this.setState({ isEmailValid: false })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { isEmailValid } = this.state

    if (!isEmailValid) {
      this.setState({ errorMessage: config.emailForm.emailRequired })
    } else if (this.captchaNeedsExecuting()) {
      this.recaptchaElement.execute()
    } else {
      this.processReferAFriend()
    }
  }

  processReferAFriend = () => {
    const { trackingReferFriendSocialSharing } = this.props
    trackingReferFriendSocialSharing(actionTypes.REFER_FRIEND_LINK_SHARED, 'ReferFriendLink Shared', 'Email')

    this.setState({ isEmailSent: true, errorMessage: '' })
    this.referAFriend()
  }

  setCaptchaRef = (el) => {
    this.recaptchaElement = el
  }

  showEmailReferralForm = () => {
    this.setState({
      email: '',
      isEmailSent: false,
      isEmailValid: false,
      errorMessage: '',
    })
  }

  render() {
    const { isEmailSent, email, errorMessage } = this.state
    const { isRecaptchaEnabled } = this.props

    return (
      <ReferAFriendPresentation
        captchaChanges={this.captchaChanges}
        isRecaptchaEnabled={isRecaptchaEnabled}
        isEmailSent={isEmailSent}
        handleSubmit={this.handleSubmit}
        handleEmailChange={this.handleEmailChange}
        email={email}
        errorMessage={errorMessage}
        refCaptcha={this.setCaptchaRef}
        showEmailReferralForm={this.showEmailReferralForm}
      />

    )
  }
}

ReferAFriend.propTypes = propTypes

export { ReferAFriend }
