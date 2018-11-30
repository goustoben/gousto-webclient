import React from 'react'
import PropTypes from 'prop-types'

import actionTypes from 'actions/actionTypes'
import logger from 'utils/logger'
import { publicKey } from '../config'
import { hasPropUpdated } from './utils'

import css from './CheckoutFrame.css'

/* global Frames */
class CheckoutFrame extends React.Component {
  static propTypes = {
    change: PropTypes.func,
    fireCheckoutError: PropTypes.func,
    checkoutClearErrors: PropTypes.func,
    disableCardSubmission: PropTypes.func,
    cardTokenReady: PropTypes.func,
    billingAddress: PropTypes.object,
    cardName: PropTypes.string,
    formName: PropTypes.string,
    sectionName: PropTypes.string,
    checkoutScriptReady: PropTypes.bool,
    isSubmitCardEnabled: PropTypes.bool,
    hasCheckoutError: PropTypes.bool,
    trackingCardTokenizationSuccessful: PropTypes.func,
    trackingCardTokenisationFailed: PropTypes.func,

  }

  static defaultProps = {
    change: () => {},
    fireCheckoutError: () => {},
    checkoutClearErrors: () => {},
    disableCardSubmission: () => {},
    cardTokenReady: () => {},
    billingAddress: {},
    cardName: '',
    formName: 'checkout',
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
    const { billingAddress, cardName, isSubmitCardEnabled, hasCheckoutError } = this.props

    if (hasPropUpdated(cardName, prevProps.cardName)) {
      Frames.setCustomerName(cardName)
    }

    if (hasPropUpdated(billingAddress, prevProps.billingAddress)) {
      Frames.setBillingDetails(billingAddress)
    }

    if(hasPropUpdated(hasCheckoutError, prevProps.hasCheckoutError) && hasCheckoutError) {
      Frames.unblockFields()
    }

    if (hasPropUpdated(isSubmitCardEnabled, prevProps.isSubmitCardEnabled) && isSubmitCardEnabled){
      this.submitCard()
    }
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
    const { disableCardSubmission, fireCheckoutError } = this.props

    Frames.submitCard()
      .catch(() => {
        fireCheckoutError(actionTypes.VALID_CARD_DETAILS_NOT_PROVIDED)
      })

    disableCardSubmission()
  }

  cardTokenised = (event, paymentForm) => {
    const { cardToken } = event.data
    const { change, cardTokenReady, formName, sectionName, trackingCardTokenizationSuccessful } = this.props

    Frames.addCardToken(paymentForm, cardToken)
    change(formName, `${sectionName}.token`, cardToken)
    cardTokenReady()
    trackingCardTokenizationSuccessful()

  }

  frameActivated = () => {
    const { cardName, billingAddress } = this.props

    if (cardName) {
      Frames.setCustomerName(cardName)
    }
    if (billingAddress) {
      Frames.setBillingDetails(billingAddress)
    }
  }

  cardTokenisationFailed = (e) => {
    const { fireCheckoutError, trackingCardTokenisationFailed } = this.props
    const errorMessage = e.data.message
    logger.error('card tokenisation failure')
    fireCheckoutError(actionTypes.CARD_TOKENISATION_FAILED)
    trackingCardTokenisationFailed(errorMessage)
  }

  render() {
    return (
      <form ref={this.setPaymentFormRef} id="payment-form" name="payment-form" >
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
    border: '1px solid #d6d8da',
    margin: '10px 0'
  },
  '.embedded .card-form .input-group.focus:not(.error)': {
    border: '1px solid #999EA3'
  },
  '.embedded .card-form .input-group .icon': {
    display: 'none'
  },
  '.embedded .card-form .input-group.error': {
    border: '1px solid #B6252E',
    background: '#FBF4F4'
  },
  '.embedded .card-form .input-group.error .hint.error-message': {
    color: '#fff'
  },
  '.embedded .card-form .input-group.error .hint-icon:hover': {
    color: '#B6252E'
  },
  '.embedded .card-form .input-group.focus': {
    backgroundColor: '#fff'
  },
  '.embedded .card-form .input-group.focus input': {
    color: '#333D49',
    borderColor: '#999ea3'
  },
  '.embedded .card-form .input-group.error input': {
    color: '#B6252E'
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
