import React from 'react'
import PropTypes from 'prop-types'

import logger from 'utils/logger'
import { publicKey } from '../config'
import { hasPropUpdated } from './utils'

/* global Frames */
export class CheckoutFrame extends React.Component {
  static propTypes = {
    change: PropTypes.func,
    cardTokenisationFailed: PropTypes.func,
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
      containerSelector: '.frames-container',
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
        <div className="frames-container" />
      </form>
    )
  }
}
