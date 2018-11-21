import React from 'react'
import PropTypes from 'prop-types'

import { publicKey } from '../config'

/* global Frames */
export class CheckoutFrame extends React.Component {
  static propTypes = {
    checkoutScriptReady: PropTypes.bool,
  }

  componentDidMount() {
    const { checkoutScriptReady } = this.props

    if (checkoutScriptReady) {
      this.initFrames()
    }
  }

  componentDidUpdate(prevProps) {
    const { checkoutScriptReady } = this.props

    if (checkoutScriptReady && prevProps.checkoutScriptReady !== checkoutScriptReady) {
      this.initFrames()
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
        const { cardToken } = e.data
        Frames.addCardToken(paymentForm, cardToken)
        paymentForm.submit(() => false)
      },
      cardTokenisationFailed: () => {}
    })
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault()
      Frames.submitCard()
    })
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
      </form>
    )
  }
}
