import React from 'react'
import PropTypes from 'prop-types'

import { RECAPTCHA_PUBLIC_KEY } from 'config/recaptcha'
import { PaymentMethod } from 'config/signup'
import ReCAPTCHA from 'components/Recaptcha'
import { Section } from 'Page/Elements'

import BoxDetails from '../BoxDetails'
import Summary from '../Summary'
import { SubmitButton } from '../SubmitButton'
import { ErrorMessage } from '../ErrorMessage'
import { Checkout3DSModal } from './Checkout3DSModal'
import { PaymentMethodSelector } from './PaymentMethodSelector'
import { CheckoutCardDetails } from './CheckoutCardDetails'
import { CheckoutPayPalDetails } from './CheckoutPayPalDetails'

import css from './CheckoutPayment.css'

class CheckoutPayment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSubmitCardEnabled: false,
    }
  }

  applyValidationErrors = () => {
    const { formErrors, touch, sectionName } = this.props

    if (formErrors && formErrors[sectionName]) {
      Object.keys(formErrors[sectionName]).forEach((formErrorName) => {
        touch(sectionName, `${sectionName}[${formErrorName}]`)
      })
    }
  }

  enableCardSubmission = () => {
    this.setState({
      isSubmitCardEnabled: true
    })
  }

  disableCardSubmission = () => {
    this.setState({
      isSubmitCardEnabled: false
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
    const {
      trackingOrderPlaceAttempt,
      trackingOrderPlaceAttemptFailed,
      trackingOrderPlaceAttemptSucceeded,
      currentPaymentMethod,
      submitOrder,
    } = this.props

    trackingOrderPlaceAttempt()

    if (currentPaymentMethod === PaymentMethod.Card) {
      if (this.isFormValid()) {
        trackingOrderPlaceAttemptSucceeded()
        this.enableCardSubmission()
      } else {
        trackingOrderPlaceAttemptFailed()
        this.applyValidationErrors()
      }
    } else {
      // nothing to validate for PayPal
      trackingOrderPlaceAttemptSucceeded()
      submitOrder()
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

  setRecaptchaElement = (el) => {
    this.recaptchaElement = el
  }

  render() {
    const {
      asyncValidate,
      browser,
      canSubmit,
      checkoutScriptReady,
      paypalScriptsReady,
      prerender,
      receiveRef,
      reloadCheckoutScript,
      scrollToFirstMatchingRef,
      sectionName,
      isRecaptchaEnabled,
      is3DSEnabled,
      isPayPalReady,
      currentPaymentMethod,
      setCurrentPaymentMethod,
    } = this.props

    const { isSubmitCardEnabled } = this.state

    return (
      <div className={prerender ? css.hide : ''}>
        <div
          className={css.container}
          data-testing="checkoutPaymentSection"
        >
          <PaymentMethodSelector
            currentPaymentMethod={currentPaymentMethod}
            onPaymentMethodChanged={setCurrentPaymentMethod}
            showSelector={!isPayPalReady}
          />
          <CheckoutCardDetails
            hide={currentPaymentMethod !== PaymentMethod.Card}
            prerender={prerender}
            receiveRef={receiveRef}
            sectionName={sectionName}
            checkoutScriptReady={checkoutScriptReady}
            reloadCheckoutScript={reloadCheckoutScript}
            asyncValidate={asyncValidate}
            scrollToFirstMatchingRef={scrollToFirstMatchingRef}
            isSubmitCardEnabled={isSubmitCardEnabled}
            cardTokenReady={this.cardTokenReady}
            disableCardSubmission={this.disableCardSubmission}
          />
          <CheckoutPayPalDetails
            hide={currentPaymentMethod !== PaymentMethod.PayPal}
            paypalScriptsReady={paypalScriptsReady}
          />
          <div className={css.row}>
            {!prerender && isRecaptchaEnabled && (
              <div className={css.recaptchaContainer}>
                <ReCAPTCHA
                  ref={this.setRecaptchaElement}
                  sitekey={RECAPTCHA_PUBLIC_KEY}
                  onChange={this.handleRecaptchaChange}
                  size="invisible"
                />
              </div>
            )}
          </div>
        </div>
        {!prerender && (
          <div>
            <ErrorMessage showPayPalErrors={currentPaymentMethod === PaymentMethod.PayPal} />
            {canSubmit && <SubmitButton onClick={this.handleClick} />}
            {browser === 'mobile' && (
              <div>
                <Summary />
                <Section margin={{ top: 'LG' }}>
                  <BoxDetails />
                </Section>
              </div>
            )}
          </div>
        )}
        {is3DSEnabled && <Checkout3DSModal />}
      </div>
    )
  }
}

CheckoutPayment.propTypes = {
  submit: PropTypes.func.isRequired,
  receiveRef: PropTypes.func,
  scrollToFirstMatchingRef: PropTypes.func,
  asyncValidate: PropTypes.func,
  trackingOrderPlaceAttempt: PropTypes.func,
  trackingOrderPlaceAttemptFailed: PropTypes.func,
  trackingOrderPlaceAttemptSucceeded: PropTypes.func,
  touch: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  formErrors: PropTypes.object,
  sectionName: PropTypes.string,
  browser: PropTypes.string,
  // we allow the iFrame to initialize before this component is shown by pre-rendering with CheckoutFrame only
  prerender: PropTypes.bool,
  canSubmit: PropTypes.bool,
  checkoutScriptReady: PropTypes.bool,
  reloadCheckoutScript: PropTypes.func,
  paypalScriptsReady: PropTypes.bool,
  is3DSEnabled: PropTypes.bool,
  isPayPalReady: PropTypes.bool,
  isRecaptchaEnabled: PropTypes.bool,
  recaptchaValue: PropTypes.string,
  submitOrder: PropTypes.func,
  storeSignupRecaptchaToken: PropTypes.func,
  currentPaymentMethod: PropTypes.string.isRequired,
  setCurrentPaymentMethod: PropTypes.func,
}

CheckoutPayment.defaultProps = {
  receiveRef: () => {},
  scrollToFirstMatchingRef: () => {},
  asyncValidate: () => {},
  trackingOrderPlaceAttempt: () => {},
  trackingOrderPlaceAttemptFailed: () => {},
  trackingOrderPlaceAttemptSucceeded: () => {},
  touch: () => {},
  formErrors: {},
  sectionName: 'payment',
  browser: 'mobile',
  prerender: false,
  canSubmit: true,
  checkoutScriptReady: false,
  reloadCheckoutScript: () => {},
  paypalScriptsReady: false,
  is3DSEnabled: false,
  isPayPalReady: false,
  isRecaptchaEnabled: false,
  recaptchaValue: '',
  submitOrder: () => {},
  storeSignupRecaptchaToken: () => {},
  setCurrentPaymentMethod: () => {},
}

export { CheckoutPayment }
