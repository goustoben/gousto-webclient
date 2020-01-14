import React from 'react'
import PropTypes from 'prop-types'

import logger from 'utils/logger'
import { hasPropUpdated } from 'utils/react'
import { actionTypes } from 'actions/actionTypes'
import { publicKey } from '../config'
import { getErrorType } from './utils'

import css from './CheckoutFrame.css'

/* global Frames */
class CheckoutFrame extends React.Component {
  static propTypes = {
    change: PropTypes.func,
    fireCheckoutError: PropTypes.func,
    checkoutClearErrors: PropTypes.func,
    disableCardSubmission: PropTypes.func,
    reloadCheckoutScript: PropTypes.func,
    cardTokenReady: PropTypes.func,
    billingAddress: PropTypes.object,
    cardName: PropTypes.string,
    sectionName: PropTypes.string,
    checkoutScriptReady: PropTypes.bool,
    checkoutFrameReady: PropTypes.func,
    isSubmitCardEnabled: PropTypes.bool,
    hasCheckoutError: PropTypes.bool,
    fireCheckoutPendingEvent: PropTypes.func,
    trackingCardTokenisationSuccessfully: PropTypes.func,
    trackingCardTokenisationFailed: PropTypes.func,

  }

  static defaultProps = {
    change: () => {},
    fireCheckoutError: () => {},
    checkoutClearErrors: () => {},
    disableCardSubmission: () => {},
    cardTokenReady: () => {},
    reloadCheckoutScript: () => {},
    checkoutFrameReady: () => {},
    billingAddress: {},
    cardName: '',
    sectionName: 'payment',
    checkoutScriptReady: false,
    isSubmitCardEnabled: false,
    hasCheckoutError: false,
  }

  componentDidMount() {
    const { checkoutScriptReady } = this.props

    if (checkoutScriptReady) {
      this.initFrames()
    }
  }

  componentDidUpdate(prevProps) {
    const { billingAddress, cardName, checkoutScriptReady, isSubmitCardEnabled, hasCheckoutError } = this.props

    if (hasPropUpdated(checkoutScriptReady, prevProps.checkoutScriptReady)) {
      this.initFrames()
    }

    if (checkoutScriptReady && hasPropUpdated(cardName, prevProps.cardName)) {
      Frames.setCustomerName(cardName)
    }

    if (checkoutScriptReady && hasPropUpdated(billingAddress, prevProps.billingAddress)) {
      Frames.setBillingDetails(billingAddress)
    }

    if(checkoutScriptReady && hasPropUpdated(hasCheckoutError, prevProps.hasCheckoutError)) {
      Frames.unblockFields()
    }

    if (hasPropUpdated(isSubmitCardEnabled, prevProps.isSubmitCardEnabled)){
      this.submitCard()
    }
  }

  componentWillUnmount() {
    const { reloadCheckoutScript } = this.props

    if (Frames) {
      Frames = undefined // eslint-disable-line no-global-assign
    }

    reloadCheckoutScript()
  }

  initFrames = () => {
    const { paymentForm } = this
    const { checkoutClearErrors } = this.props

    Frames.init({
      publicKey,
      style: checkoutStyle,
      containerSelector: `.${css.framesContainer}`,
      localisation: {
        cardNumberPlaceholder: 'Card number',
      },
      cardSubmitted: () => {
        checkoutClearErrors()
      },
      cardTokenised: (e) => {
        this.cardTokenised(e, paymentForm)
      },
      cardTokenisationFailed: (e) => {
        this.cardTokenisationFailed(e)
      },
      frameActivated: this.frameActivated
    })
  }

  setPaymentFormRef = element => {
    this.paymentForm = element
  }

  submitCard = () => {
    const { disableCardSubmission, fireCheckoutError, fireCheckoutPendingEvent } = this.props

    fireCheckoutPendingEvent(actionTypes.CHECKOUT_CARD_SUBMIT, true)
    Frames.submitCard()
      .catch(() => {
        fireCheckoutError(actionTypes.VALID_CARD_DETAILS_NOT_PROVIDED)
        fireCheckoutPendingEvent(actionTypes.CHECKOUT_CARD_SUBMIT, false)
      })

    disableCardSubmission()
  }

  cardTokenised = (event, paymentForm) => {
    const { cardToken } = event.data
    const { change, cardTokenReady, sectionName, fireCheckoutPendingEvent, trackingCardTokenisationSuccessfully } = this.props

    Frames.addCardToken(paymentForm, cardToken)
    fireCheckoutPendingEvent(actionTypes.CHECKOUT_CARD_SUBMIT, false)
    change(sectionName, `${sectionName}.token`, cardToken)
    cardTokenReady()
    trackingCardTokenisationSuccessfully()
  }

  frameActivated = () => {
    const { billingAddress, cardName, checkoutFrameReady } = this.props

    checkoutFrameReady()

    if (cardName) {
      Frames.setCustomerName(cardName)
    }
    if (billingAddress) {
      Frames.setBillingDetails(billingAddress)
    }
  }

  cardTokenisationFailed = (event) => {
    const { fireCheckoutError, fireCheckoutPendingEvent, trackingCardTokenisationFailed } = this.props
    const errorMessage = event ? event.data.message : ''
    const errorType = getErrorType(event.data.errorCode)

    logger.error('card tokenisation failure')
    fireCheckoutPendingEvent(actionTypes.CHECKOUT_CARD_SUBMIT, false)
    fireCheckoutError(errorType)
    trackingCardTokenisationFailed(errorMessage)
  }

  render() {
    return (
      <form ref={this.setPaymentFormRef} id="payment-form" name="payment-form">
        <div className={css.framesContainer} />
      </form>
    )
  }
}

const checkoutStyle = {
  '.embedded .card-form .input-group .input-control': {
    fontSize: '18px'
  },
  '.embedded .card-form .input-group label.icon+*': {
    paddingLeft: '15px'
  },
  '.embedded .card-form .input-group': {
    borderRadius: '5px',
    border: '1px solid #D2D6D9',
    margin: '10px 0'
  },
  '.embedded .card-form .input-group.focus:not(.error)': {
    border: '1px solid #C0C5C9'
  },
  '.embedded .card-form .input-group .icon': {
    display: 'none'
  },
  '.embedded .card-form .input-group.error': {
    border: '1px solid #C20026',
    background: '#FBF4F4'
  },
  '.embedded .card-form .input-group.error .hint.error-message': {
    color: '#fff'
  },
  '.embedded .card-form .input-group.error .hint-icon:hover': {
    color: '#C20026'
  },
  '.embedded .card-form .input-group.focus': {
    backgroundColor: '#fff'
  },
  '.embedded .card-form .input-group.focus input': {
    color: '#333D49',
    borderColor: '#C0C5C9'
  },
  '.embedded .card-form .input-group.error input': {
    color: '#C20026'
  },
  '.embedded .card-form .input-group input::-webkit-input-placeholder': {
    fontStyle: 'normal'
  },
  '.embedded .card-form .input-group input::-moz-placeholder': {
    fontStyle: 'normal'
  },
  '.embedded .card-form .input-group input:-ms-input-placeholder': {
    fontStyle: 'normal'
  },
  '.embedded .card-form .input-group input:-moz-placeholder': {
    fontStyle: 'normal'
  },
}

export { CheckoutFrame }
