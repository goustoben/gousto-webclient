import React from 'react'
import PropTypes from 'prop-types'

import logger from 'utils/logger'
import { publicKey } from '../config'
import { hasPropUpdated } from './utils'

import css from './CheckoutFrame.css'

/* global Frames */
class CheckoutFrame extends React.Component {
  static propTypes = {
    change: PropTypes.func,
    cardTokenisationFailed: PropTypes.func,
    checkoutClearErrors: PropTypes.func,
    cardName: PropTypes.string,
    formName: PropTypes.string,
    sectionName: PropTypes.string,
    billingAddress: PropTypes.object,
    cardTokenReady: PropTypes.func,
    checkoutScriptReady: PropTypes.bool,
    isSubmitCardEnabled: PropTypes.bool,
    disableCardSubmission: PropTypes.func,
    validCardDetailsNotProvided: PropTypes.func,
    hasCheckoutError: PropTypes.bool,
  }

  componentDidMount() {
    const { checkoutScriptReady } = this.props

    if (checkoutScriptReady) {
      this.initFrames()
    }
  }

  componentDidUpdate(prevProps) {
    const {
      billingAddress,
      cardName,
      checkoutScriptReady,
      isSubmitCardEnabled,
      disableCardSubmission,
      validCardDetailsNotProvided,
      hasCheckoutError
    } = this.props

    if (hasPropUpdated(cardName, prevProps.cardName)) {
      Frames.setCustomerName(cardName)
    }

    if (hasPropUpdated(billingAddress, prevProps.billingAddress)) {
      Frames.setBillingDetails(billingAddress)
    }

    if (hasPropUpdated(checkoutScriptReady, prevProps.checkoutScriptReady)) {
      this.initFrames()
    }

    if(hasPropUpdated(hasCheckoutError, prevProps.hasCheckoutError) && hasCheckoutError) {
      Frames.unblockFields()
    }

    if (hasPropUpdated(isSubmitCardEnabled, prevProps.isSubmitCardEnabled) && isSubmitCardEnabled){
      Frames.submitCard()
        .catch(() => {
          validCardDetailsNotProvided()
        })

      disableCardSubmission()
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
      cardValidationChanged: () => {},
      cardSubmitted: () => {
        checkoutClearErrors()
      },
      cardTokenised: (e) => {
        this.cardTokenised(e, paymentForm)
      },
      cardTokenisationFailed: () => {
        this.cardTokenisationFailed()
      },
      frameActivated: this.frameActivated
    })
  }

  setPaymentFormRef = element => {
    this.paymentForm = element
  }

  cardTokenised = (event, paymentForm) => {
    const { cardToken } = event.data
    const { change, cardTokenReady, formName, sectionName } = this.props

    Frames.addCardToken(paymentForm, cardToken)
    change(formName, `${sectionName}.token`, cardToken)
    cardTokenReady()
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

  cardTokenisationFailed = () => {
    const { cardTokenisationFailed, disableCardSubmission } = this.props

    logger.error('card tokenisation failure')
    cardTokenisationFailed()
    Frames.unblockFields()
    disableCardSubmission()
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
