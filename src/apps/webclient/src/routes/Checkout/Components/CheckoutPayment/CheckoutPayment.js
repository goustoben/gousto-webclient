import React from 'react'

import { Box, Text, Icon, Space, Display } from '@gousto-internal/citrus-react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { logLevels } from 'actions/log'
import { HotjarTrigger } from 'components/HotjarTrigger'
import { Recaptcha } from 'components/Recaptcha'
import { RibbonTriggerContainer } from 'components/RibbonTrigger'
import { PaymentMethod } from 'routes/Signup/signupConfig'

import { ErrorMessage } from '../ErrorMessage'
import { SectionHeader } from '../SectionHeader'
import { SubmitButton } from '../SubmitButton'
import { Checkout3DSModal } from './Checkout3DSModal'
import { CheckoutCardDetails } from './CheckoutCardDetails'
import { CheckoutPayPalDetailsContainer } from './CheckoutPayPalDetails'
import { PayPalConfirmation } from './PayPalConfirmation'
import { PaymentFooter } from './PaymentFooter'
import { PaymentMethodSelector } from './PaymentMethodSelector'

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

  submitCheckingRecaptcha = () => {
    const { feLoggingLogEvent, recaptchaValue } = this.props
    const captchaPassed = recaptchaValue !== null

    feLoggingLogEvent(logLevels.info, 'submitCheckingRecaptcha', {
      recaptchaElementExists: !!this.recaptchaElement,
      recaptchaValue,
    })

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
      pricingHookResponse,
    } = this.props

    const { pricing } = pricingHookResponse

    trackingOrderPlaceAttempt({ pricing })

    if (currentPaymentMethod === PaymentMethod.Card) {
      if (this.isFormValid()) {
        trackingOrderPlaceAttemptSucceeded({ pricing })
        this.enableCardSubmission()
      } else {
        trackingOrderPlaceAttemptFailed()
        this.applyValidationErrors()
      }
    } else {
      // nothing to validate for PayPal
      trackingOrderPlaceAttemptSucceeded({ pricing })
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
    const { feLoggingLogEvent, storeSignupRecaptchaToken } = this.props

    feLoggingLogEvent(logLevels.info, 'handleRecaptchaChange', {
      value,
    })

    storeSignupRecaptchaToken(value)

    if (value === null) {
      // here execution delayed because for some reason it doesn't work if the method execute() is called right away
      setTimeout(() => this.recaptchaElement.execute(), 0)
    } else {
      this.processSignup()
    }
  }

  setRecaptchaElement = (el) => {
    this.recaptchaElement = el
  }

  handleSubmitFromCardDetails = () => {
    this.submitCheckingRecaptcha()
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
      <>
        <Box display={isCard || isPayPalReady ? Display.None : Display.Flex}>
          <Icon name="secure" minWidth="1.5rem" minHeight="1.5rem" />
          <Space size={2} direction="horizontal" />

          <Text size={2}>
            You will be prompted by PayPal for payment details to securely set up your subscription.
          </Text>
        </Box>
        <Space size={[3, 5]} direction="vertical" />
      </>
    )
  }

  renderStartYourSubscriptionButton = () => {
    const { pricingHookResponse, isPayPalReady, currentPaymentMethod, signupLoginError } =
      this.props

    if (signupLoginError) {
      // The Login CTA in the Alert is what we want the user to press.
      return null
    }
    const { isPending } = pricingHookResponse

    const isDisabled = currentPaymentMethod === PaymentMethod.PayPal ? !isPayPalReady : isPending

    return <SubmitButton onClick={this.submitCheckingRecaptcha} isDisabled={isDisabled} />
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
      <CheckoutPayPalDetailsContainer
        hide={currentPaymentMethod !== PaymentMethod.PayPal}
        paypalScriptsReady={paypalScriptsReady}
        submitCheckingRecaptcha={this.submitCheckingRecaptcha}
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
      hotjarTriggerName,
      isGoustoOnDemandEnabled,
      isFreeBox,
      pricingHookResponse: { pricing },
    } = this.props
    const sectionSubtitle =
      isGoustoOnDemandEnabled && isFreeBox ? (
        <span>
          Payment details will only be used for surcharge recipes or items from the Gousto Market.{' '}
          <span className={css.bold}>If you don’t add these, no payment will be taken.</span>
        </span>
      ) : null

    return (
      <div
        className={classNames(css.paymentContainer, { [css.hide]: prerender })}
        data-testing="checkoutPaymentSection"
      >
        <SectionHeader title="Payment method" subtitle={sectionSubtitle} />
        {!isGoustoOnDemandEnabled && (
          <PaymentMethodSelector
            currentPaymentMethod={currentPaymentMethod}
            setCurrentPaymentMethod={setCurrentPaymentMethod}
            isPayPalReady={isPayPalReady}
          />
        )}
        {this.renderCardContent()}
        {this.renderPaypalContent()}
        <div className={css.row}>
          {!prerender && isRecaptchaEnabled && (
            <div className={css.recaptchaContainer}>
              <Recaptcha ref={this.setRecaptchaElement} onChange={this.handleRecaptchaChange} />
            </div>
          )}
        </div>
        {isPayPalReady && <PayPalConfirmation />}
        {this.renderOuterContent()}
        <PaymentFooter
          isGoustoOnDemandEnabled={isGoustoOnDemandEnabled}
          isDeliveryFree={pricing?.isDeliveryFree}
        />
        <Checkout3DSModal />
        {!prerender && <HotjarTrigger name={hotjarTriggerName} shouldInvoke />}
        {!prerender && <RibbonTriggerContainer name="checkout-payment" />}
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
  hotjarTriggerName: PropTypes.string,
  isGoustoOnDemandEnabled: PropTypes.bool,
  isFreeBox: PropTypes.bool,
  pricingHookResponse: PropTypes.object,
  signupLoginError: PropTypes.string,
  feLoggingLogEvent: PropTypes.func.isRequired,
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
  hotjarTriggerName: '',
  isGoustoOnDemandEnabled: false,
  isFreeBox: false,
  // eslint-disable-next-line react/forbid-prop-types
  pricingHookResponse: {},
  signupLoginError: null,
}

export { CheckoutPayment }
