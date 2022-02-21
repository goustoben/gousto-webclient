import React, { useState } from 'react'
import classNames from 'classnames'

import { RECAPTCHA_PUBLIC_KEY } from 'config/recaptcha'
import { PaymentMethod } from 'config/signup'
import ReCAPTCHA from 'components/Recaptcha'
import { HotjarTrigger } from 'HotjarTrigger'
import { RibbonTriggerContainer } from 'RibbonTrigger'
import Svg from 'Svg'
import { formatOrderPrice } from 'utils/pricing'
import { usePricing, Pricing } from 'routes/Menu/domains/pricing'
import { SubmitButton } from '../SubmitButton'
import { ErrorMessage } from '../ErrorMessage'
import { Checkout3DSModal } from './Checkout3DSModal'
import { PaymentMethodSelector } from './PaymentMethodSelector'
import { CheckoutCardDetails } from './CheckoutCardDetails'
import { CheckoutPayPalDetailsWrapper } from './CheckoutPayPalDetails'

import { SectionHeader } from '../SectionHeader'
import { PaymentFooter } from './PaymentFooter'
import { PayPalConfirmation } from './PayPalConfirmation'

import css from './CheckoutPayment.css'
type Props = {
  submit: () => void
  receiveRef: () => void
  scrollToFirstMatchingRef: () => void
  asyncValidate: () => void
  trackingOrderPlaceAttempt: ({ pricing }: { pricing?: Pricing | null }) => void
  trackingOrderPlaceAttemptFailed: () => void
  trackingOrderPlaceAttemptSucceeded: ({ pricing }: { pricing?: Pricing | null }) => void
  touch: (ev: string, element: any) => void
  formErrors: any
  sectionName: string
  prerender: boolean
  checkoutScriptReady: boolean
  reloadCheckoutScript: () => void
  paypalScriptsReady: boolean
  isPayPalReady: boolean
  isRecaptchaEnabled: boolean
  recaptchaValue: string
  submitOrder: () => void
  storeSignupRecaptchaToken: (v: any) => void
  currentPaymentMethod: string
  setCurrentPaymentMethod: () => void
  onLoginClick: () => void
  ribbonTriggerName: string
  hotjarTriggerName: string
  isGoustoOnDemandEnabled: boolean
}

const CheckoutPayment = ({
  prerender,
  isPayPalReady,
  currentPaymentMethod,
  setCurrentPaymentMethod,
  isRecaptchaEnabled,
  ribbonTriggerName,
  hotjarTriggerName,
  isGoustoOnDemandEnabled,
  formErrors,
  touch,
  sectionName,
  recaptchaValue,
  trackingOrderPlaceAttempt,
  trackingOrderPlaceAttemptFailed,
  trackingOrderPlaceAttemptSucceeded,
  submitOrder,
  submit,
  storeSignupRecaptchaToken,
  receiveRef,
  checkoutScriptReady,
  reloadCheckoutScript,
  asyncValidate,
  scrollToFirstMatchingRef,
  onLoginClick,
  paypalScriptsReady,
}: Props) => {
  const [isSubmitCardEnabled, setIsSubmitCardEnabled] = useState(false)
  const [framesFieldsAreValid, setFramesFieldsAreValid] = useState(false)
  const [isStartSubscriptionSubmitted, setIsStartSubscriptionSubmitted] = useState(false)
  const recaptchaElement = React.useRef<any>()
  const { pricing } = usePricing()
  const isFreeBox: boolean = formatOrderPrice(pricing?.total) === 'FREE'

  const applyValidationErrors = () => {
    if (formErrors && formErrors[sectionName]) {
      Object.keys(formErrors[sectionName]).forEach((formErrorName) => {
        touch(sectionName, `${sectionName}[${formErrorName}]`)
      })
    }
  }

  const enableCardSubmission = () => {
    setIsSubmitCardEnabled(true)
  }

  const disableCardSubmission = () => {
    setIsSubmitCardEnabled(false)
  }

  const isFormValid = () => {
    setIsStartSubscriptionSubmitted(!framesFieldsAreValid)

    return !(formErrors && formErrors[sectionName])
  }

  const processSignup = () => {
    trackingOrderPlaceAttempt({ pricing })

    if (currentPaymentMethod === PaymentMethod.Card) {
      if (isFormValid()) {
        trackingOrderPlaceAttemptSucceeded({ pricing })
        enableCardSubmission()
      } else {
        trackingOrderPlaceAttemptFailed()
        applyValidationErrors()
      }
    } else {
      // nothing to validate for PayPal
      trackingOrderPlaceAttemptSucceeded({ pricing })
      submitOrder()
    }
  }

  const handleClick = () => {
    const captchaPassed = recaptchaValue !== null
    if (recaptchaElement && !captchaPassed) {
      if (recaptchaElement.current) recaptchaElement.current.execute()
    } else {
      processSignup()
    }
  }

  const submitForm = () => {
    submit()
  }

  const cardTokenReady = () => {
    submitForm()
  }

  const handleRecaptchaChange = (value: any) => {
    storeSignupRecaptchaToken(value)
    if (value !== null) {
      processSignup()
    }
  }

  const handleSubmitFromCardDetails = () => {
    handleClick()
  }

  const handleFramesValidationChanged = (isValid: boolean) => {
    setFramesFieldsAreValid(isValid)
  }

  const renderCardContent = () => {
    const isCard = currentPaymentMethod === PaymentMethod.Card

    return (
      <CheckoutCardDetails
        hide={!isCard}
        receiveRef={receiveRef}
        sectionName={sectionName}
        checkoutScriptReady={checkoutScriptReady}
        reloadCheckoutScript={reloadCheckoutScript}
        asyncValidate={asyncValidate}
        scrollToFirstMatchingRef={scrollToFirstMatchingRef}
        isSubmitCardEnabled={isSubmitCardEnabled}
        cardTokenReady={cardTokenReady}
        disableCardSubmission={disableCardSubmission}
        onFramesValidationChanged={handleFramesValidationChanged}
        onSubmitFromCardDetails={handleSubmitFromCardDetails}
        isStartSubscriptionSubmitted={isStartSubscriptionSubmitted}
      />
    )
  }

  const renderPaypalContent = () => {
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

  const renderStartYourSubscriptionButton = () => {
    const isDisabled = currentPaymentMethod === PaymentMethod.PayPal ? !isPayPalReady : false

    return <SubmitButton onClick={handleClick} isDisabled={isDisabled} submitting={false} />
  }

  const renderErrorMessage = () => (
    <ErrorMessage
      showPayPalErrors={currentPaymentMethod === PaymentMethod.PayPal}
      onLoginClick={onLoginClick}
    />
  )

  const renderPayPalButton = () => (
    <CheckoutPayPalDetailsWrapper
      hide={currentPaymentMethod !== PaymentMethod.PayPal}
      paypalScriptsReady={paypalScriptsReady}
    />
  )

  const renderOuterContent = () => {
    const showSubmitButton = currentPaymentMethod === PaymentMethod.Card ? true : isPayPalReady

    return (
      <div className={classNames({ [css.hide]: prerender })}>
        {renderErrorMessage()}
        {renderPayPalButton()}
        {showSubmitButton && renderStartYourSubscriptionButton()}
      </div>
    )
  }

  const sectionSubtitle = isGoustoOnDemandEnabled && isFreeBox ? (
    <span>
      Payment details will only be used for surcharge recipes or items from the Gousto Market.
      {' '}
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
      {renderCardContent()}
      {renderPaypalContent()}
      <div className={css.row}>
        {!prerender && isRecaptchaEnabled && (
          <div className={css.recaptchaContainer}>
            <ReCAPTCHA
              ref={recaptchaElement}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              sitekey={RECAPTCHA_PUBLIC_KEY}
              onChange={handleRecaptchaChange}
              size="invisible"
            />
          </div>
        )}
      </div>
      {isPayPalReady && <PayPalConfirmation />}
      {renderOuterContent()}
      <PaymentFooter isGoustoOnDemandEnabled={isGoustoOnDemandEnabled} />
      <Checkout3DSModal />
      <RibbonTriggerContainer name={ribbonTriggerName} probabilityPercentage={50} />
      {!prerender && <HotjarTrigger name={hotjarTriggerName} shouldInvoke />}
    </div>
  )
}

export { CheckoutPayment }
