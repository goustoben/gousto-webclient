import React from 'react'
import PropTypes from 'prop-types'

import logger from 'utils/logger'
import { hasPropUpdated } from 'utils/react'
import { actionTypes } from 'actions/actionTypes'
import InputError from 'Form/InputError'
import { publicKey } from '../config'
import { getErrorType } from './utils'
import { checkoutStyles } from './checkoutStyles'

import css from './CheckoutFrame.css'

/* global Frames */
class CheckoutFrame extends React.Component {
  constructor() {
    super()

    this.state = {
      showCardNumberError: false,
      showExpiryDateError: false,
      showCVVError: false,
    }
  }

  componentDidMount() {
    const { checkoutScriptReady } = this.props

    if (checkoutScriptReady) {
      this.initFrames()
    }
  }

  componentDidUpdate(prevProps) {
    const { billingAddress, cardName, checkoutScriptReady, isSubmitCardEnabled, hasCheckoutError } = this.props

    if (checkoutScriptReady) {
      if (hasPropUpdated(checkoutScriptReady, prevProps.checkoutScriptReady)) {
        this.initFrames()
      }

      if (hasPropUpdated(cardName, prevProps.cardName)
        || hasPropUpdated(billingAddress, prevProps.billingAddress)) {
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
      billingAddress: {
        addressLine1,
        addressLine2,
        city,
        postcode: zip,
      },
      cardName: name
    } = this.props

    return {
      name,
      billingAddress: {
        addressLine1,
        addressLine2,
        city,
        zip,
      }
    }
  }

  frameValidationChanged = (event) => {
    let newState = {}

    switch (event.element) {
    case 'card-number':
      newState = { showCardNumberError: !event.isValid }
      break
    case 'expiry-date':
      newState = { showExpiryDateError: !event.isValid }
      break
    case 'cvv':
      newState = { showCVVError: !event.isValid }
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
    const { change, cardTokenReady, sectionName, fireCheckoutPendingEvent, trackingCardTokenizationSuccessfully } = this.props
    const { token } = event

    Frames.addCardToken(paymentForm, token)
    fireCheckoutPendingEvent(actionTypes.CHECKOUT_CARD_SUBMIT, false)
    change(sectionName, `${sectionName}.token`, token)
    cardTokenReady()
    trackingCardTokenizationSuccessfully()
  }

  cardTokenizationFailed = (event) => {
    const { fireCheckoutError, fireCheckoutPendingEvent, trackingCardTokenizationFailed } = this.props
    const errorMessage = event ? event.data.message : ''
    const errorType = getErrorType(event.data.errorCode)

    logger.error('card tokenization failure')
    fireCheckoutPendingEvent(actionTypes.CHECKOUT_CARD_SUBMIT, false)
    fireCheckoutError(errorType)
    trackingCardTokenizationFailed(errorMessage)
  }

  submitCard() {
    const { disableCardSubmission, fireCheckoutError, fireCheckoutPendingEvent } = this.props

    fireCheckoutPendingEvent(actionTypes.CHECKOUT_CARD_SUBMIT, true)
    Frames.submitCard()
      .catch(() => {
        fireCheckoutError(actionTypes.VALID_CARD_DETAILS_NOT_PROVIDED)
        fireCheckoutPendingEvent(actionTypes.CHECKOUT_CARD_SUBMIT, false)
      })

    disableCardSubmission()
  }

  initFrames() {
    Frames.init({
      publicKey,
      style: checkoutStyles,
      cardNumber: {
        frameSelector: `.${css.cardNumberFramesContainer} [data-frames]`,
      },
      expiryDate: {
        frameSelector: `.${css.expiryDateFramesContainer} [data-frames]`,
      },
      cvv: {
        frameSelector: `.${css.cvvFramesContainer} [data-frames]`,
      },
      localization: {
        cardNumberPlaceholder: 'Card number',
        expiryMonthPlaceholder: 'MM',
        expiryYearPlaceholder: 'YY',
        cvvPlaceholder: 'CVV',
      },
      cardholder: this.getCardholderDetails(),
      frameValidationChanged: this.frameValidationChanged,
      cardSubmitted: this.cardSubmitted,
      cardTokenized: this.cardTokenized,
      cardTokenizationFailed: this.cardTokenizationFailed,
    })
  }

  render() {
    const { showCardNumberError, showExpiryDateError, showCVVError } = this.state

    return (
      <form ref={this.setPaymentFormRef} id="payment-form" name="payment-form" className={css.framesForm}>
        <div className={css.cardNumberFramesContainer}>
          <div data-frames className={css.framesContainer} />
          <div>{showCardNumberError && (<InputError>Please enter a valid card number</InputError>)}</div>
        </div>
        <div className={css.expiryDateFramesContainer}>
          <div data-frames className={css.framesContainer} />
          <div>{showExpiryDateError && (<InputError>Please enter a valid expiry date</InputError>)}</div>
        </div>
        <div className={css.cvvFramesContainer}>
          <div data-frames className={css.framesContainer} />
          <div>{showCVVError && (<InputError>Please enter a valid CVV code</InputError>)}</div>
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
  billingAddress: {
    addressLine1: '',
    addressLine2: '',
    postcode: '',
    city: ''
  },
  cardName: '',
  sectionName: 'payment',
  checkoutScriptReady: false,
  isSubmitCardEnabled: false,
  hasCheckoutError: false,
}

export { CheckoutFrame }
