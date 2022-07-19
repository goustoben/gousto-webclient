import React from 'react'
import PropTypes from 'prop-types'
import Form from 'components/Form'
import TextInput from 'Form/Input'
import { Button } from 'goustouicomponents'
import InputError from 'Form/InputError'
import { getRecaptchaRAFPublicKey } from 'utils/isomorphicEnvironment'
import { Recaptcha } from 'components/Recaptcha'
import css from './ReferAFriend.css'

const propTypes = {
  captchaChanges: PropTypes.func.isRequired,
  isRecaptchaEnabled: PropTypes.bool.isRequired,
  isEmailSent: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  refCaptcha: PropTypes.func.isRequired,
  showEmailReferralForm: PropTypes.func.isRequired,
}

const ReferAFriendPresentation = ({
  captchaChanges,
  isEmailSent,
  isRecaptchaEnabled,
  handleSubmit,
  handleEmailChange,
  email,
  errorMessage,
  refCaptcha,
  showEmailReferralForm,
}) => (
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
              {
                isRecaptchaEnabled
                && (
                  <div>
                    <Recaptcha
                      ref={refCaptcha}
                      sitekey={getRecaptchaRAFPublicKey()}
                      onChange={captchaChanges}
                    />
                  </div>
                )
              }
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
        <div>
          <p className={css.emailSentNotification}>An invitation has been sent to your friend!</p>
          <Button
            onClick={showEmailReferralForm}
            className={css.button}
          >
            Invite another friend
          </Button>
        </div>
      )
    }
  </div>
)

ReferAFriendPresentation.propTypes = propTypes

export { ReferAFriendPresentation }
