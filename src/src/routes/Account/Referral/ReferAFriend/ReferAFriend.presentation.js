import React from 'react'
import PropTypes from 'prop-types'
import Form from 'Form'
import TextInput from 'Form/Input'
import { Button } from 'goustouicomponents'
import InputError from 'Form/InputError'
import css from './ReferAFriend.css'

const ReferAFriendPresentation = ({isEmailSent, handleSubmit, handleEmailChange, email, errorMessage, showEmailReferralForm }) => {
  return (
    <div>
      {
        !isEmailSent ? (
          <div>
            <p>Enter your friend&#8217;s email below:</p>
            <Form onSubmit={handleSubmit}>
              <div>
                <div className={css.emailInput}>
                  <TextInput
                    name="email"
                    color="primary"
                    textAlign="left"
                    placeholder="Your friend's email"
                    onChange={handleEmailChange}
                    value={email}
                  />
                  <InputError>{errorMessage}</InputError>
                </div>
                <div className={css.button}>
                  <Button
                    onClick={handleSubmit}
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
                onClick={showEmailReferralForm}
                className={css.button}
              >
                Invite another friend
              </Button>
            </div>)
      }
    </div>
  )
}

ReferAFriendPresentation.propTypes = {
  isEmailSent: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired, 
  email: PropTypes.string.isRequired, 
  errorMessage: PropTypes.string,
  showEmailReferralForm: PropTypes.func.isRequired,
}

export { ReferAFriendPresentation }
