import React from 'react'
import PropTypes from 'prop-types'
import ReCAPTCHA from 'components/recaptcha'
import { RECAPTCHA_PUBLIC_KEY } from 'config/recaptcha'

import { Section } from 'Page/Elements'
import BoxDetails from '../BoxDetails'
import Summary from '../Summary'

import { PaymentHeader } from '../PaymentHeader'
import SubmitButton from '../SubmitButton'
import css from './CheckoutPayment.css'

import { CheckoutName } from './CheckoutName'
import { CheckoutFrame } from './CheckoutFrame'
import { CheckoutAddress } from './CheckoutAddress'

export class CheckoutPayment extends React.Component {
  static propTypes = {
    submit: PropTypes.func.isRequired,
    receiveRef: PropTypes.func,
    scrollToFirstMatchingRef: PropTypes.func,
    asyncValidate: PropTypes.func,
    trackingOrderPlaceAttempt: PropTypes.func,
    trackingOrderPlaceAttemptFailed: PropTypes.func,
    trackingOrderPlaceAttemptSucceeded: PropTypes.func,
    touch: PropTypes.func,
    formErrors: PropTypes.object,
    sectionName: PropTypes.string,
    browser: PropTypes.string,
    checkoutScriptReady: PropTypes.bool,
    reloadCheckoutScript: PropTypes.func,
    /* prerender - We allow the iFrame to initialize before this component is shown by pre-rendering with CheckoutFrame only */
    prerender: PropTypes.bool,
    isRecaptchaEnabled: PropTypes.bool,
    storeSignupRecaptchaToken: PropTypes.func,
    recaptchaValue: PropTypes.string.isRequired,
  }

  static defaultProps = {
    receiveRef: () => {},
    scrollToFirstMatchingRef: () => {},
    asyncValidate: () => {},
    trackingOrderPlaceAttempt: () => {},
    trackingOrderPlaceAttemptFailed: () => {},
    trackingOrderPlaceAttemptSucceeded: () => {},
    reloadCheckoutScript: () => {},
    touch: () => {},
    formErrors: {},
    sectionName: 'payment',
    browser: 'mobile',
    checkoutScriptReady: false,
    isRecaptchaEnabled: false,
    storeSignupRecaptchaToken: () => {},
  }

  state = {
    isSubmitCardEnabled: false,
  }

  applyValidationErrors = () => {
    const { formErrors, touch, sectionName } = this.props

    if (formErrors && formErrors[sectionName]) {
      for (const formError in formErrors[sectionName]) {
        touch(sectionName, `${sectionName}[${formError}]`)
      }
    }
  }

  enableCardSubmission = () => {
    this.setState({
      isSubmitCardEnabled: true,
    })
  }

  disableCardSubmission = () => {
    this.setState({
      isSubmitCardEnabled: false,
    })
  }

  isFormValid = () => {
    const { formErrors, sectionName } = this.props

    return !(formErrors && formErrors[sectionName])
  }

  handleClick = () => {
    const { recaptchaValue } = this.props
    const captchaPassed = recaptchaValue !== null

    if (this.recaptchaElement && !captchaPassed) {
      this.recaptchaElement.execute()
    } else {
      this.processSignup()
    }
  }

  processSignup = () => {
    const { trackingOrderPlaceAttempt, trackingOrderPlaceAttemptFailed, trackingOrderPlaceAttemptSucceeded, isRecaptchaEnabled, recaptchaValue } = this.props

    trackingOrderPlaceAttempt()

    if (this.isFormValid()) {
      trackingOrderPlaceAttemptSucceeded()
      this.enableCardSubmission()
    } else {
      trackingOrderPlaceAttemptFailed()
      this.applyValidationErrors()
    }
  }

  cardTokenReady = () => {
    this.submitForm()
  }

  submitForm = () => {
    const { submit } = this.props
    submit()
  }

  handleRecaptchaChange = (value) => {
    const { storeSignupRecaptchaToken } = this.props

    storeSignupRecaptchaToken(value)
    if (value !== null) {
      this.processSignup()
    }
  }

  render() {
    const { asyncValidate, browser, checkoutScriptReady, prerender, receiveRef, reloadCheckoutScript, scrollToFirstMatchingRef, sectionName, isRecaptchaEnabled } = this.props
    const { isSubmitCardEnabled } = this.state

    return (
      <div className={(prerender) ? css.hide : ''}>
        <div className={css.container} data-testing="checkoutPaymentSection">
          <PaymentHeader />
          {prerender ? null : (
            <CheckoutName
              receiveRef={receiveRef}
              sectionName={sectionName}
            />
          )}
          <div className={css.frame}>
            <CheckoutFrame
              checkoutScriptReady={checkoutScriptReady}
              isSubmitCardEnabled={isSubmitCardEnabled}
              reloadCheckoutScript={reloadCheckoutScript}
              cardTokenReady={this.cardTokenReady}
              disableCardSubmission={this.disableCardSubmission}
            />
          </div>
          <div className={css.row}>
            {prerender ? null : (
              <div className={css.addressContainer}>
                <CheckoutAddress
                  sectionName={sectionName}
                  asyncValidate={asyncValidate}
                  receiveRef={receiveRef}
                  scrollToFirstMatchingRef={scrollToFirstMatchingRef}
                />
              </div>
            )}
            {
              !prerender
              && isRecaptchaEnabled
              && (
                <div className={css.recaptchaContainer}>
                  <ReCAPTCHA
                    ref={el => { this.recaptchaElement = el }}
                    sitekey={RECAPTCHA_PUBLIC_KEY}
                    onChange={this.handleRecaptchaChange}
                    size="invisible"
                  />
                </div>
              )
            }
          </div>
        </div>
        {(prerender) ? null : (
          <div>
            <SubmitButton onClick={this.handleClick} />
            {(browser === 'mobile') ? (
              <div>
                <Summary />
                <Section margin={{ top: 'LG' }}>
                  <BoxDetails />
                </Section>
              </div>
            ) : null}
          </div>
        )}
      </div>
    )
  }
}
