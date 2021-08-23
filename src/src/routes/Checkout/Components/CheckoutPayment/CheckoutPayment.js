import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { RECAPTCHA_PUBLIC_KEY } from 'config/recaptcha'
import { PaymentMethod } from 'config/signup'
import ReCAPTCHA from 'components/Recaptcha'
import { HotjarTrigger } from 'HotjarTrigger'
import { RibbonTriggerContainer } from 'RibbonTrigger'
import Svg from 'Svg'
import { SubmitButton } from '../SubmitButton'
import { ErrorMessage } from '../ErrorMessage'
import { Checkout3DSModal } from './Checkout3DSModal'
import { PaymentMethodSelector } from './PaymentMethodSelector'
import { CheckoutCardDetails } from './CheckoutCardDetails'
import { CheckoutPayPalDetails } from './CheckoutPayPalDetails'

import { SectionHeader } from '../SectionHeader'
import { PaymentFooter } from './PaymentFooter'
import { PayPalConfirmation } from './PayPalConfirmation'

import css from './CheckoutPayment.css'

class CheckoutPayment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSubmitCardEnabled: false,
      framesFieldsAreValid: false,
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
    const { framesFieldsAreValid } = this.state
    this.setState({ isStartSubscriptionSubmitted: !framesFieldsAreValid })

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

  handleSubmitFromCardDetails = () => {
    this.handleClick()
  }

  handleFramesValidationChanged = (isValid) => {
    this.setState({ framesFieldsAreValid: isValid })
  }

  renderCardContent() {
    const {
      currentPaymentMethod,
      prerender,
      receiveRef,
      sectionName,
      checkoutScriptReady,
      reloadCheckoutScript,
      asyncValidate,
      scrollToFirstMatchingRef,
    } = this.props

    const { isSubmitCardEnabled, isStartSubscriptionSubmitted } = this.state
    const { cardTokenReady, disableCardSubmission } = this
    const isCard = currentPaymentMethod === PaymentMethod.Card

    return (
      <CheckoutCardDetails
        hide={!isCard}
        prerender={prerender}
        receiveRef={receiveRef}
        sectionName={sectionName}
        checkoutScriptReady={checkoutScriptReady}
        reloadCheckoutScript={reloadCheckoutScript}
        asyncValidate={asyncValidate}
        scrollToFirstMatchingRef={scrollToFirstMatchingRef}
        isSubmitCardEnabled={isSubmitCardEnabled}
        cardTokenReady={cardTokenReady}
        disableCardSubmission={disableCardSubmission}
        onFramesValidationChanged={this.handleFramesValidationChanged}
        onSubmitFromCardDetails={this.handleSubmitFromCardDetails}
        isStartSubscriptionSubmitted={isStartSubscriptionSubmitted}
      />
    )
  }

  renderPaypalContent = () => {
    const { isPayPalReady, currentPaymentMethod } = this.props
    const isCard = currentPaymentMethod === PaymentMethod.Card

    return (
      <div
        className={classNames({
          [css.hide]: isCard || isPayPalReady,
          [css.paypalSetupBox]: !isCard && !isPayPalReady,
        })}
      >
        <Svg fileName="icon-checkout-lock" className={css.padlockIcon} />
        <div className={css.paypalSetupInfo}>
          You will be prompted by PayPal for payment details to securely set up your subscription.
        </div>
      </div>
    )
  }

  renderStartYourSubscriptionButton = () => {
    const { isPayPalReady, currentPaymentMethod } = this.props
    const isDisabled = currentPaymentMethod === PaymentMethod.PayPal ? !isPayPalReady : false

    return <SubmitButton onClick={this.handleClick} isDisabled={isDisabled} />
  }

  renderErrorMessage() {
    const { currentPaymentMethod, onLoginClick } = this.props

    return (
      <ErrorMessage
        showPayPalErrors={currentPaymentMethod === PaymentMethod.PayPal}
        onLoginClick={onLoginClick}
      />
    )
  }

  renderOuterContent() {
    const { currentPaymentMethod, isPayPalReady, prerender } = this.props

    const showSubmitButton = currentPaymentMethod === PaymentMethod.Card ? true : isPayPalReady

    return (
      <div className={classNames({ [css.hide]: prerender })}>
        {this.renderErrorMessage()}
        {this.renderPayPalButton()}
        {showSubmitButton && this.renderStartYourSubscriptionButton()}
      </div>
    )
  }

  renderPayPalButton = () => {
    const { paypalScriptsReady, currentPaymentMethod } = this.props

    return (
      <CheckoutPayPalDetails
        hide={currentPaymentMethod !== PaymentMethod.PayPal}
        paypalScriptsReady={paypalScriptsReady}
      />
    )
  }

  render() {
    const {
      prerender,
      isPayPalReady,
      currentPaymentMethod,
      setCurrentPaymentMethod,
      isRecaptchaEnabled,
      ribbonTriggerName,
      hotjarTriggerName,
    } = this.props

    return (
      <div
        className={classNames(css.paymentContainer, { [css.hide]: prerender })}
        data-testing="checkoutPaymentSection"
      >
        <SectionHeader title="Payment method" />
        <PaymentMethodSelector
          currentPaymentMethod={currentPaymentMethod}
          setCurrentPaymentMethod={setCurrentPaymentMethod}
          isPayPalReady={isPayPalReady}
        />
        {this.renderCardContent()}
        {this.renderPaypalContent()}
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
        {isPayPalReady && <PayPalConfirmation />}
        {this.renderOuterContent()}
        <PaymentFooter />
        <Checkout3DSModal />
        <RibbonTriggerContainer name={ribbonTriggerName} probabilityPercentage={50} />
        {!prerender && <HotjarTrigger name={hotjarTriggerName} shouldInvoke />}
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
  // we allow the iFrame to initialize before this component is shown by pre-rendering with CheckoutFrame only
  prerender: PropTypes.bool,
  checkoutScriptReady: PropTypes.bool,
  reloadCheckoutScript: PropTypes.func,
  paypalScriptsReady: PropTypes.bool,
  isPayPalReady: PropTypes.bool,
  isRecaptchaEnabled: PropTypes.bool,
  recaptchaValue: PropTypes.string,
  submitOrder: PropTypes.func,
  storeSignupRecaptchaToken: PropTypes.func,
  currentPaymentMethod: PropTypes.string.isRequired,
  setCurrentPaymentMethod: PropTypes.func,
  onLoginClick: PropTypes.func,
  ribbonTriggerName: PropTypes.string,
  hotjarTriggerName: PropTypes.string,
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
  prerender: false,
  checkoutScriptReady: false,
  reloadCheckoutScript: () => {},
  paypalScriptsReady: false,
  isPayPalReady: false,
  isRecaptchaEnabled: false,
  recaptchaValue: '',
  submitOrder: () => {},
  storeSignupRecaptchaToken: () => {},
  setCurrentPaymentMethod: () => {},
  onLoginClick: () => {},
  ribbonTriggerName: '',
  hotjarTriggerName: '',
}

export { CheckoutPayment }
