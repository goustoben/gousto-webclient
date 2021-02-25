import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { RECAPTCHA_PUBLIC_KEY } from 'config/recaptcha'
import { PaymentMethod } from 'config/signup'
import ReCAPTCHA from 'components/Recaptcha'
import { Section } from 'Page/Elements'
import Svg from 'Svg'

import { BoxDetailsContainer } from '../BoxDetails'
import Summary from '../Summary'
import { SubmitButton } from '../SubmitButton'
import { ErrorMessage } from '../ErrorMessage'
import { Checkout3DSModal } from './Checkout3DSModal'
import { PaymentMethodSelector } from './PaymentMethodSelector'
import { CheckoutCardDetails } from './CheckoutCardDetails'
import { CheckoutPayPalDetails } from './CheckoutPayPalDetails'

import { SectionHeader } from '../SectionHeader'
import { PaymentFooter } from './PaymentFooter'
import { PaymentMethodSelectorCheckoutOverhaul } from './PaymentMethodSelectorCheckoutOverhaul'
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

  componentDidMount() {
    const { currentPaymentMethod, setCurrentPaymentMethod, isCheckoutOverhaulEnabled } = this.props
    if (currentPaymentMethod === null && !isCheckoutOverhaulEnabled) {
      setCurrentPaymentMethod(PaymentMethod.Card, { disableTracking: true })
    }
  }

  getSubmitButtonIsDisabledForCardPayment() {
    const { formErrors, sectionName } = this.props
    const { framesFieldsAreValid } = this.state

    const hasFramesFieldError = !framesFieldsAreValid

    const errors = formErrors && formErrors[sectionName] ? formErrors[sectionName] : {}

    const hasCardNameError = !!errors.cardName
    const hasBillingAddressError = !!(errors.houseNo || errors.street || errors.town)

    return hasCardNameError || hasBillingAddressError || hasFramesFieldError
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

  handleSubmitFromCardDetails = () => {
    const isDisabled = this.getSubmitButtonIsDisabledForCardPayment()
    if (isDisabled) {
      return
    }
    this.handleClick()
  }

  handleFramesValidationChanged = (isValid) => {
    this.setState({ framesFieldsAreValid: isValid })
  }

  getVariationContent = () => {
    const {
      isCheckoutCardDefaultEnabled,
      isCheckoutPayPalFirstEnabled,
      isPayPalReady,
      setCurrentPaymentMethod,
      currentPaymentMethod,
      isCheckoutCardFirstEnabled,
    } = this.props

    if (isCheckoutCardDefaultEnabled) {
      return (
        <PaymentMethodSelectorCheckoutOverhaul
          currentPaymentMethod={currentPaymentMethod}
          setCurrentPaymentMethod={setCurrentPaymentMethod}
          isPayPalReady={isPayPalReady}
          renderCardContent={() => this.renderCardContent()}
          renderPaypalContent={() => this.renderPaypalContent()}
        />
      )
    }

    const payPalButton = this.renderPayPalButton()
    const separator = this.renderSeparator()
    const cardDetails = this.renderCardContent()
    const startYourSubscriptionButton = this.renderStartYourSubscriptionButton()
    const error = this.renderErrorMessage()
    const hideClass = isPayPalReady ? css.hide : ''

    if (isCheckoutPayPalFirstEnabled) {
      return (
        <div className={hideClass}>
          {payPalButton}
          {separator}
          {cardDetails}
          {error}
          {startYourSubscriptionButton}
        </div>
      )
    }

    if (isCheckoutCardFirstEnabled) {
      return (
        <div className={hideClass}>
          {cardDetails}
          {error}
          {startYourSubscriptionButton}
          {separator}
          {payPalButton}
        </div>
      )
    }

    return null
  }

  renderBaseline() {
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
                  <BoxDetailsContainer />
                </Section>
              </div>
            )}
          </div>
        )}
        {is3DSEnabled && <Checkout3DSModal />}
      </div>
    )
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
      isCheckoutOverhaulEnabled,
    } = this.props

    const { isSubmitCardEnabled } = this.state

    const { cardTokenReady, disableCardSubmission } = this

    return (
      <CheckoutCardDetails
        hide={currentPaymentMethod !== PaymentMethod.Card && !isCheckoutOverhaulEnabled}
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
        isCheckoutOverhaulEnabled
        onFramesValidationChanged={this.handleFramesValidationChanged}
        onSubmitFromCardDetails={this.handleSubmitFromCardDetails}
      />
    )
  }

  renderPaypalContent = () => (
    <div className={css.paypalSetupBox}>
      <Svg className={css.paypalSetupIcon} fileName="paypal-setup" />
      <div className={css.paypalSetupInfo}>
        After clicking the PayPal button below, you will be redirected to PayPal to complete your purchase securely.
      </div>
    </div>
  )

  renderStartYourSubscriptionButton = () => {
    const { isPayPalReady, currentPaymentMethod } = this.props
    const isDisabled = currentPaymentMethod === PaymentMethod.PayPal ? !isPayPalReady : this.getSubmitButtonIsDisabledForCardPayment()

    return (
      <SubmitButton
        onClick={this.handleClick}
        isCheckoutOverhaulEnabled
        isDisabled={isDisabled}
      />
    )
  }

  renderErrorMessage() {
    const { currentPaymentMethod, onLoginClick } = this.props

    return (
      <ErrorMessage
        showPayPalErrors={currentPaymentMethod === PaymentMethod.PayPal}
        isCheckoutOverhaulEnabled
        onLoginClick={onLoginClick}
      />
    )
  }

  renderOuterContent() {
    const {
      currentPaymentMethod,
      isPayPalReady,
      prerender,
      isCheckoutCardDefaultEnabled,
      isCheckoutCardFirstEnabled,
      isCheckoutPayPalFirstEnabled,
    } = this.props

    const isCheckoutVariationEnabled = isCheckoutCardFirstEnabled || isCheckoutPayPalFirstEnabled || isCheckoutCardDefaultEnabled
    const showSubmitButton = currentPaymentMethod === PaymentMethod.Card && isCheckoutCardDefaultEnabled
      ? true
      : isPayPalReady && isCheckoutVariationEnabled

    return (
      <div className={classNames({ [css.hide]: prerender })}>
        {this.renderErrorMessage()}
        {isCheckoutCardDefaultEnabled && this.renderPayPalButton()}
        {showSubmitButton && this.renderStartYourSubscriptionButton()}
      </div>
    )
  }

  renderPayPalButton = () => {
    const { paypalScriptsReady, isCheckoutPayPalFirstEnabled, isCheckoutCardFirstEnabled, currentPaymentMethod } = this.props

    return (
      <CheckoutPayPalDetails
        isPaymentMethodVariationEnabled={isCheckoutPayPalFirstEnabled || isCheckoutCardFirstEnabled}
        isCheckoutOverhaulEnabled
        hide={!isCheckoutPayPalFirstEnabled && !isCheckoutCardFirstEnabled && currentPaymentMethod !== PaymentMethod.PayPal}
        paypalScriptsReady={paypalScriptsReady}
      />
    )
  }

  renderSeparator = () => (
    <div className={css.methodSeparatorContainer}>
      <div className={css.border} />
      <span className={css.content}>or</span>
      <div className={css.border} />
    </div>
  )

  renderExperimentVariation = () => {
    const { prerender, isPayPalReady, is3DSEnabled, isCheckoutCardDefaultEnabled } = this.props
    const variationContent = this.getVariationContent()

    return (
      <div className={classNames(css.checkoutOverhaulContainer, { [css.hide]: prerender })}>
        <SectionHeader title="Payment method" />
        {variationContent}
        {isPayPalReady && <PayPalConfirmation />}
        {(isCheckoutCardDefaultEnabled || isPayPalReady) && this.renderOuterContent()}
        <PaymentFooter />
        {is3DSEnabled && <Checkout3DSModal />}
      </div>
    )
  }

  render() {
    const { isCheckoutOverhaulEnabled } = this.props
    if (isCheckoutOverhaulEnabled) {
      return this.renderExperimentVariation()
    }

    return this.renderBaseline()
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
  isCheckoutOverhaulEnabled: PropTypes.bool,
  onLoginClick: PropTypes.func,
  isCheckoutPayPalFirstEnabled: PropTypes.bool,
  isCheckoutCardDefaultEnabled: PropTypes.bool,
  isCheckoutCardFirstEnabled: PropTypes.bool,
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
  isCheckoutOverhaulEnabled: false,
  onLoginClick: () => {},
  isCheckoutPayPalFirstEnabled: false,
  isCheckoutCardDefaultEnabled: false,
  isCheckoutCardFirstEnabled: false,
}

export { CheckoutPayment }
