import React from 'react'
import PropTypes from 'prop-types'

import { publicKey } from '../config'

/* global Frames */
export class CheckoutFrame extends React.Component {
  static propTypes = {
    checkoutReady: PropTypes.bool,
  }

  componentDidMount() {
    const { checkoutReady } = this.props

    if (checkoutReady) {
      this.initFrames()
    }
  }

  componentDidUpdate(prevProps) {
    const { checkoutReady } = this.props

    if (checkoutReady && prevProps.checkoutReady !== checkoutReady) {
      this.initFrames()
    }
  }

  initFrames = () => {
    const { paymentButton, paymentForm } = this

    Frames.init({
      publicKey,
      containerSelector: '.frames-container',
      cardValidationChanged: () => {
        paymentButton.disabled = !Frames.isCardValid()
      },
      cardSubmitted: () => {
        paymentButton.disabled = true
      },
      cardTokenised: (e) => {
        const { cardToken } = e.data
        Frames.addCardToken(paymentForm, cardToken)
        paymentForm.submit(() => false)
      },
      cardTokenisationFailed: (err) => {}
    })
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault()
      Frames.submitCard()
    })
  }

  setPaymentButtonRef = element => {
    this.paymentButton = element
  }

  setPaymentFormRef = element => {
    this.paymentForm = element
  }

  submitCard = e => {
    e.preventDefault()
    document.forms['payment-form'].submit()
  }

  render() { 
    return (
      <form ref={this.setPaymentFormRef} id="payment-form" name="payment-form" method="POST" action="https://merchant.com/charge-card">
        <div className="frames-container" />
        <button ref={this.setPaymentButtonRef} type="submit" onClick={this.submitCard}>Submit Checkout Request</button>
      </form>
    )
  }
}
