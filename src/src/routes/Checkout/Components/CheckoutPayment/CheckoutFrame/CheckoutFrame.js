import React from 'react'
import PropTypes from 'prop-types'

import logger from 'utils/logger'
import { publicKey } from '../config'
import { hasPropUpdated } from './utils'

import css from './CheckoutFrame.css'

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
    margin: '5px 0'
  },
  '.embedded .card-form .input-group.focus:not(.error)': {
    border: '1px solid green'
  },
  '.embedded .card-form .input-group .icon': {
    display: 'none'
  },
  '.embedded .card-form .input-group.error': {
    border: '1px solid red',
    background: '#FBF4F4'
  },
  '.embedded .card-form .input-group.error .hint.error-message': {
    color: 'red'
  },
  '.embedded .card-form .input-group.error .hint-icon:hover': {
    color: 'red'
  },
  '.embedded .card-form .input-group.focus': {
    backgroundColor: '#fff'
  },
  '.embedded .card-form .input-group.focus input': {
    color: '#333D49',
    borderColor: '#999ea3'
  },
  '.embedded .card-form .input-group.error input': {
    color: 'red'
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
  }
}

/* global Frames */
export class CheckoutFrame extends React.Component {
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
    submitCheckoutFrame: PropTypes.bool,
  }

  componentDidMount() {
    const { checkoutScriptReady } = this.props

    if (checkoutScriptReady) {
      this.initFrames()
    }
  }

  componentDidUpdate(prevProps) {
    const { billingAddress, cardName, checkoutScriptReady, submitCheckoutFrame, checkoutClearErrors } = this.props

    if (hasPropUpdated(cardName, prevProps.cardName)) {
      Frames.setCustomerName(cardName)
    }

    if (hasPropUpdated(billingAddress, prevProps.billingAddress)) {
      Frames.setBillingDetails(billingAddress)
    }

    if (hasPropUpdated(checkoutScriptReady, prevProps.checkoutScriptReady)) {
      this.initFrames()
    }

    if (hasPropUpdated(submitCheckoutFrame, prevProps.submitCheckoutFrame)) {
      checkoutClearErrors()
      Frames.submitCard()
    }
  }

  initFrames = () => {
    const { paymentForm } = this

    Frames.init({
      publicKey,
      style: checkoutStyle,
      containerSelector: `.${css.framesContainer}`,
      localisation: {
        cardNumberPlaceholder: 'Card number'
      },
      cardValidationChanged: () => {},
      cardSubmitted: () => {},
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
    const { cardTokenisationFailed } = this.props

    logger.error('card tokenisation failure')
    cardTokenisationFailed()
  }

  render() {
    return (
      <form ref={this.setPaymentFormRef} id="payment-form" name="payment-form" >
        <div className={css.framesContainer} />
      </form>
    )
  }
}
