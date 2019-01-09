import React from 'react'
import PropTypes from 'prop-types'
import Form from 'Form'
import config from 'config/home'
import TextInput from 'Form/Input'
import { Button } from 'goustouicomponents'
import { validateEmail } from 'utils/auth'
import InputError from 'Form/InputError'
import css from './ReferAFriend.css'

class ReferAFriend extends React.PureComponent {

  static propTypes = {
    userReferAFriend: PropTypes.func.isRequired,
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
    event.preventDefault()
    const { isEmailValid } = this.state
    if (isEmailValid) {
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
      <div>
        {
          !isEmailSent ? (
            <div>
              <p>Enter your friend&#8217;s email below:</p>
              <Form onSubmit={this.handleSubmit}>
                <div>
                  <div className={css.emailInput}>
                    <TextInput
                      name="email"
                      color="primary"
                      textAlign="left"
                      placeholder="Your friend's email"
                      onChange={this.handleEmailChange}
                      value={email}
                    />
                    <InputError>{errorMessage}</InputError>
                  </div>
                  <div className={css.button}>
                    <Button
                      onClick={this.handleSubmit}
                    >
                      Send Email
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          ) : (
              <div >
                <p className={css.emailSentNotification}>An invitation has been sent to your friend!</p>
                <Button
                  onClick={this.showEmailReferralForm}
                  className={css.button}
                >
                  Invite another friend
                </Button>
              </div>)
        }
      </div>
    )
  }
}

export { ReferAFriend } 
