import React from 'react'
import PropTypes from 'prop-types'

import { publicKey } from '../config'
import { hasPropUpdated } from './utils'

/* global Frames */
export class CheckoutFrame extends React.Component {
  static propTypes = {
    change: PropTypes.func,
    cardName: PropTypes.string,
    formName: PropTypes.string,
    sectionName: PropTypes.string,
    billingAddress: PropTypes.object,
    checkoutScriptReady: PropTypes.bool,
    submitCheckoutFrame: PropTypes.bool,
  }

  componentDidMount() {
    const { checkoutScriptReady } = this.props

    if (checkoutScriptReady ) {
      this.initFrames()
    }
  }

  componentDidUpdate(prevProps) {
    const { billingAddress, cardName, checkoutScriptReady, submitCheckoutFrame } = this.props

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
      Frames.submitCard()
    }
  }

  initFrames = () => {
    const { paymentForm } = this
    const { cardName, change, billingAddress, formName, sectionName } = this.props

    Frames.init({
      publicKey: publicKey,
      containerSelector: '.frames-container',
      customerName: cardName,
      billingDetails: billingAddress,
      cardValidationChanged: () => {},
      cardSubmitted: () => {},
      cardTokenised: (e) => {
        const { cardToken } = e.data

        Frames.addCardToken(paymentForm, cardToken)
        change(formName, `${sectionName}.token"`, cardToken)
      },
      cardTokenisationFailed: () => {}
    })
  }

  setPaymentFormRef = element => {
    this.paymentForm = element
  }

  render() {
    return (
      <form ref={this.setPaymentFormRef} id="payment-form" name="payment-form" >
        <div className="frames-container" />
      </form>
    )
  }
}
