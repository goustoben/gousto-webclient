import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from 'config/home'
import { validateEmail } from 'utils/auth'
import { ReferAFriendPresentation } from './ReferAFriend.presentation'

class ReferAFriend extends PureComponent {

  static propTypes = {
    userReferAFriend: PropTypes.func.isRequired,
    trackingReferFriendLinkShared: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    isEmailValid: false,
    errorMessage: ''
  }

  referAFriend = () => {
    const { email } = this.state
    const { userReferAFriend } = this.props

    userReferAFriend(email)
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
    const { trackingReferFriendLinkShared } = this.props

    event.preventDefault()
    const { isEmailValid } = this.state
    if (isEmailValid) {
      trackingReferFriendLinkShared('Email')
      this.setState({
        isEmailSent: true,
        errorMessage: ''
      })
      this.referAFriend()
    } else {
      this.setState({ errorMessage: config.emailForm.emailRequired })
    }
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
    const {isEmailSent, email, errorMessage} = this.state

    return (
      <ReferAFriendPresentation
        isEmailSent={isEmailSent}
        handleSubmit={this.handleSubmit}
        handleEmailChange={this.handleEmailChange}
        email={email}
        errorMessage={errorMessage}
        showEmailReferralForm={this.showEmailReferralForm}
      />

    )
  }
}

export { ReferAFriend }
