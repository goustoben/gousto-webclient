import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { RECAPTCHA_PUBLIC_KEY } from 'config/recaptcha'
import { PaymentMethod } from 'config/signup'
import ReCAPTCHA from 'components/Recaptcha'
import { Section } from 'Page/Elements'

import BoxDetails from '../BoxDetails'
import { PaymentHeader } from '../PaymentHeader'
import Summary from '../Summary'
import SubmitButton from '../SubmitButton'
import { Checkout3DSModal } from './Checkout3DSModal'
import { PaymentMethodSelector } from './PaymentMethodSelector'
import { CheckoutCardDetails } from './CheckoutCardDetails'
import { CheckoutPaypalDetails } from './CheckoutPaypalDetails'

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
      trackingOrderPlaceAttemptSucceeded
    } = this.props

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

  setRecaptchaElement = (el) => {
    this.recaptchaElement = el
  }

  render() {
    const {
      asyncValidate,
      browser,
      checkoutScriptReady,
      prerender,
      receiveRef,
      reloadCheckoutScript,
      scrollToFirstMatchingRef,
      sectionName,
      isRecaptchaEnabled,
      is3DSEnabled,
      isCheckoutRedesignEnabled,
      isPayWithPaypalEnabled,
      currentPaymentMethod,
      setCurrentPaymentMethod
    } = this.props

    const { isSubmitCardEnabled } = this.state

    return (
      <div className={prerender ? css.hide : ''}>
        <div
          className={classNames(css.container, {
            [css.payWithPaypalAutosizeContainer]: isPayWithPaypalEnabled
          })}
          data-testing="checkoutPaymentSection"
        >
          {isPayWithPaypalEnabled ? (
            <PaymentMethodSelector
              currentPaymentMethod={currentPaymentMethod}
              onPaymentMethodChanged={setCurrentPaymentMethod}
            />
          ) : (
            <PaymentHeader />
          )}
          <CheckoutCardDetails
            hide={isPayWithPaypalEnabled ? currentPaymentMethod !== PaymentMethod.Card : false}
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
          {isPayWithPaypalEnabled ? (
            <CheckoutPaypalDetails hide={currentPaymentMethod !== PaymentMethod.Paypal} />
          ) : null}
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
        {prerender ? null : (
          <div
            className={classNames({
              [css.hide]: isPayWithPaypalEnabled
                ? currentPaymentMethod !== PaymentMethod.Card
                : false
            })}
          >
            <SubmitButton onClick={this.handleClick} />
            {browser === 'mobile' && !isCheckoutRedesignEnabled ? (
              <div>
                <Summary />
                <Section margin={{ top: 'LG' }}>
                  <BoxDetails />
                </Section>
              </div>
            ) : null}
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
  checkoutScriptReady: PropTypes.bool,
  reloadCheckoutScript: PropTypes.func,
  is3DSEnabled: PropTypes.bool,
  isRecaptchaEnabled: PropTypes.bool,
  recaptchaValue: PropTypes.string,
  storeSignupRecaptchaToken: PropTypes.func,
  isCheckoutRedesignEnabled: PropTypes.bool,
  isPayWithPaypalEnabled: PropTypes.bool,
  currentPaymentMethod: PropTypes.string.isRequired,
  setCurrentPaymentMethod: PropTypes.func.isRequired
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
  checkoutScriptReady: false,
  reloadCheckoutScript: () => {},
  is3DSEnabled: false,
  isRecaptchaEnabled: false,
  recaptchaValue: '',
  storeSignupRecaptchaToken: () => {},
  isCheckoutRedesignEnabled: false,
  isPayWithPaypalEnabled: false
}

export { CheckoutPayment }
