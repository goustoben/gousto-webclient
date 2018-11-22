import React from 'react'
import PropTypes from 'prop-types'

import { publicKey } from '../config'

/* global Frames */
export class CheckoutFrame extends React.Component {
  static propTypes = {
    change: PropTypes.func,
    cardName: PropTypes.string,
    formName: PropTypes.string,
    sectionName: PropTypes.string,
    billingAddress: PropTypes.object,
    checkoutScriptReady: PropTypes.bool,
  }

  componentDidMount() {
    const { checkoutScriptReady } = this.props

    if (checkoutScriptReady ) {
      this.initFrames()
    }
  }

  componentDidUpdate(prevProps) {
    const { billingAddress, cardName, checkoutScriptReady } = this.props

    if (cardName && prevProps.cardName !== cardName) {
      Frames.setCustomerName(cardName)
    }

    if (billingAddress && prevProps.billingAddress !== billingAddress) {
      Frames.setBillingDetails(billingAddress)
    }

    if (checkoutScriptReady && prevProps.checkoutScriptReady !== checkoutScriptReady) {
      this.initFrames()
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
    paymentForm.addEventListener('submit', this.submitCard)
  }

  setPaymentFormRef = element => {
    this.paymentForm = element
  }

  submitCard = (e) => {
    e.preventDefault()
    Frames.submitCard()
  }

  render() {
    return (
      <form ref={this.setPaymentFormRef} id="payment-form" name="payment-form">
        <div className="frames-container" />
        <button type="submit">Checkout Now</button>
      </form>
    )
  }
}
