import React from 'react'
import PropTypes from 'prop-types'
import logger from 'utils/logger'
import { hasPropUpdated } from 'utils/react'
import { actionTypes } from 'actions/actionTypes'
import { getCheckoutComPublicKey } from 'utils/isomorphicEnvironment'

import { getErrorType } from './utils'
import { checkoutStyles } from './checkoutStyles'
import { CheckoutName } from '../CheckoutName'
import { FrameField } from './FrameField'

import css from './CheckoutFrame.css'
import checkoutCss from '../../../Checkout.css'

/* global Frames */
class CheckoutFrame extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showCardNumberError: false,
      showExpiryDateError: false,
      showCVVError: false,
      isStartSubscriptionSubmitted: false,
      isCardNumberEmpty: true,
      isExpiryEmpty: true,
      isCVVEmpty: true,
    }
  }

  componentDidMount() {
    const { checkoutScriptReady } = this.props

    if (checkoutScriptReady) {
      this.initFrames()
    }
  }

  componentDidUpdate(prevProps) {
    const { billingAddress, cardName, checkoutScriptReady, isSubmitCardEnabled, hasCheckoutError } =
      this.props

    if (checkoutScriptReady) {
      if (hasPropUpdated(checkoutScriptReady, prevProps.checkoutScriptReady)) {
        this.initFrames()
      }

      if (
        hasPropUpdated(cardName, prevProps.cardName) ||
        hasPropUpdated(billingAddress, prevProps.billingAddress)
      ) {
        Frames.cardholder = this.getCardholderDetails()
      }

      if (hasPropUpdated(hasCheckoutError, prevProps.hasCheckoutError)) {
        Frames.enableSubmitForm()
      }

      if (hasPropUpdated(isSubmitCardEnabled, prevProps.isSubmitCardEnabled)) {
        this.submitCard()
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isStartSubscriptionSubmitted } = nextProps
    const {
      showCardNumberError,
      showCVVError,
      showExpiryDateError,
      isCardNumberEmpty,
      isExpiryEmpty,
      isCVVEmpty,
    } = prevState
    if (prevState.isStartSubscriptionSubmitted !== isStartSubscriptionSubmitted) {
      return {
        showCardNumberError: isCardNumberEmpty || showCardNumberError,
        showExpiryDateError: isExpiryEmpty || showExpiryDateError,
        showCVVError: isCVVEmpty || showCVVError,
        isStartSubscriptionSubmitted,
      }
    }

    return null
  }

  componentWillUnmount() {
    const { reloadCheckoutScript } = this.props

    delete window.Frames

    reloadCheckoutScript()
  }

  setPaymentFormRef = (ref) => {
    this.paymentForm = ref
  }

  getCardholderDetails() {
    const {
      billingAddress: { addressLine1, addressLine2, city, postcode: zip },
      cardName: name,
    } = this.props

    return {
      name,
      billingAddress: {
        addressLine1,
        addressLine2,
        city,
        zip,
      },
    }
  }

  frameValidationChanged = (event) => {
    let newState = {}
    const { element, isValid, isEmpty } = event

    switch (element) {
      case 'card-number':
        newState = { showCardNumberError: !isValid, isCardNumberEmpty: isEmpty }
        break
      case 'expiry-date':
        newState = { showExpiryDateError: !isValid, isExpiryEmpty: isEmpty }
        break
      case 'cvv':
        newState = { showCVVError: !isValid, isCVVEmpty: isEmpty }
        break
      default:
    }

    this.setState(newState)
  }

  cardSubmitted = () => {
    const { checkoutClearErrors } = this.props

    checkoutClearErrors()
  }

  cardTokenized = (event) => {
    const { paymentForm } = this
    const {
      change,
      cardTokenReady,
      sectionName,
      fireCheckoutPendingEvent,
      trackingCardTokenizationSuccessfully,
    } = this.props
    const { token } = event

    Frames.addCardToken(paymentForm, token)
    fireCheckoutPendingEvent(actionTypes.CHECKOUT_CARD_SUBMIT, false)
    change(sectionName, `${sectionName}.token`, token)
    cardTokenReady()
    trackingCardTokenizationSuccessfully()
  }

  cardTokenizationFailed = (event) => {
    const {
      fireCheckoutError,
      fireCheckoutPendingEvent,
      trackingCardTokenizationFailed,
      trackFailedCheckoutFlow,
    } = this.props
    const errorMessage = event ? event.data.message : ''
    const errorType = getErrorType(event.data.errorCode)

    logger.error('card tokenization failure')
    trackFailedCheckoutFlow('Checkout card tokenization failed', new Error(errorMessage))
    fireCheckoutPendingEvent(actionTypes.CHECKOUT_CARD_SUBMIT, false)
    fireCheckoutError(errorType)
    trackingCardTokenizationFailed(errorMessage)
  }

  handleCardValidationChanged = (event) => {
    const { onFramesValidationChanged } = this.props
    onFramesValidationChanged(event.isValid)
  }

  handleSubmit = (event) => {
    const { onSubmitFromCardDetails } = this.props
    // When Enter is pressed in the CheckoutName field, report back to
    // CheckoutPayment so it tries to submit the overall payment form.
    event.preventDefault()
    onSubmitFromCardDetails()
  }

  submitCard() {
    const { disableCardSubmission, fireCheckoutError, fireCheckoutPendingEvent } = this.props

    fireCheckoutPendingEvent(actionTypes.CHECKOUT_CARD_SUBMIT, true)
    Frames.submitCard().catch(() => {
      fireCheckoutError(actionTypes.VALID_CARD_DETAILS_NOT_PROVIDED)
      fireCheckoutPendingEvent(actionTypes.CHECKOUT_CARD_SUBMIT, false)
    })

    disableCardSubmission()
  }

  initFrames() {
    Frames.init({
      publicKey: getCheckoutComPublicKey(),
      style: checkoutStyles,
      cardNumber: {
        frameSelector: '[data-frames="cardNumber"]',
      },
      expiryDate: {
        frameSelector: '[data-frames="expiryDate"]',
      },
      cvv: {
        frameSelector: '[data-frames="cvv"]',
      },
      localization: {
        cardNumberPlaceholder: 'Card number',
        expiryMonthPlaceholder: 'MM',
        expiryYearPlaceholder: 'YY',
        cvvPlaceholder: 'CVV',
      },
      cardholder: this.getCardholderDetails(),
      frameValidationChanged: this.frameValidationChanged,
      cardValidationChanged: this.handleCardValidationChanged,
      cardSubmitted: this.cardSubmitted,
      cardTokenized: this.cardTokenized,
      cardTokenizationFailed: this.cardTokenizationFailed,
    })
  }

  render() {
    const { receiveRef, sectionName } = this.props
    const { showCardNumberError, showExpiryDateError, showCVVError } = this.state

    return (
      <form
        ref={this.setPaymentFormRef}
        id="payment-form"
        name="payment-form"
        onSubmit={this.handleSubmit}
      >
        <div className={css.row}>
          <FrameField
            header="Card number"
            hasLockIcon
            dataFrames="cardNumber"
            errorDataTesting="checkoutFrameCardNoError"
            showError={showCardNumberError}
            errorMessage="Please enter a valid card number"
          />
        </div>
        <div className={css.row}>
          <div className={css.fieldContainer}>
            <div className={checkoutCss.fieldHeader}>Name on card</div>
            <CheckoutName receiveRef={receiveRef} sectionName={sectionName} />
          </div>
        </div>
        <div className={css.row}>
          <FrameField
            header={
              <div>
                Expiry
                <br className={css.forceLineBreakOnSmallScreens} /> (MM/YY)
              </div>
            }
            dataFrames="expiryDate"
            errorDataTesting="checkoutFrameExpiryError"
            showError={showExpiryDateError}
            errorMessage="Please enter a valid expiry date"
          />
          <FrameField
            header="Security code (CVV)"
            dataFrames="cvv"
            errorDataTesting="checkoutFrameCVVError"
            showError={showCVVError}
            errorMessage="Please enter a valid CVV code"
          />
        </div>
      </form>
    )
  }
}

CheckoutFrame.propTypes = {
  change: PropTypes.func,
  fireCheckoutError: PropTypes.func,
  fireCheckoutPendingEvent: PropTypes.func,
  checkoutClearErrors: PropTypes.func,
  disableCardSubmission: PropTypes.func,
  reloadCheckoutScript: PropTypes.func,
  cardTokenReady: PropTypes.func,
  trackingCardTokenizationSuccessfully: PropTypes.func,
  trackingCardTokenizationFailed: PropTypes.func,
  trackFailedCheckoutFlow: PropTypes.func,
  billingAddress: PropTypes.shape({
    addressLine1: PropTypes.string,
    addressLine2: PropTypes.string,
    postcode: PropTypes.string,
    city: PropTypes.string,
  }),
  cardName: PropTypes.string,
  sectionName: PropTypes.string,
  checkoutScriptReady: PropTypes.bool,
  isSubmitCardEnabled: PropTypes.bool,
  hasCheckoutError: PropTypes.bool,
  onFramesValidationChanged: PropTypes.func,
  onSubmitFromCardDetails: PropTypes.func,
  receiveRef: PropTypes.func,
  isStartSubscriptionSubmitted: PropTypes.bool,
}

CheckoutFrame.defaultProps = {
  change: () => {},
  fireCheckoutError: () => {},
  fireCheckoutPendingEvent: () => {},
  checkoutClearErrors: () => {},
  disableCardSubmission: () => {},
  reloadCheckoutScript: () => {},
  cardTokenReady: () => {},
  trackingCardTokenizationSuccessfully: () => {},
  trackingCardTokenizationFailed: () => {},
  trackFailedCheckoutFlow: () => {},
  billingAddress: {
    addressLine1: '',
    addressLine2: '',
    postcode: '',
    city: '',
  },
  cardName: '',
  sectionName: 'payment',
  checkoutScriptReady: false,
  isSubmitCardEnabled: false,
  hasCheckoutError: false,
  onFramesValidationChanged: () => {},
  onSubmitFromCardDetails: () => {},
  receiveRef: () => {},
  isStartSubscriptionSubmitted: false,
}

export { CheckoutFrame }
