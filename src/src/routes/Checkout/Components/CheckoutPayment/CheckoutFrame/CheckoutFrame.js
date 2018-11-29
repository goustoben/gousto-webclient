import React from 'react'
import PropTypes from 'prop-types'

import logger from 'utils/logger'
import { publicKey } from '../config'
import { hasPropUpdated } from './utils'
import shallowCompare from 'react-addons-shallow-compare'

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
    isSubmitCardEnabled: PropTypes.bool,
    disableCardSubmission: PropTypes.func,
    validCardDetailsNotProvided: PropTypes.func,
    hasCheckoutError: PropTypes.bool,
  }

  componentDidMount() {
    const { checkoutScriptReady } = this.props

    if (checkoutScriptReady) {
      console.log('initFrames in componentDidMount') // eslint-disable-line
      this.initFrames()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { hasCheckoutError } = this.props

    if (hasCheckoutError && hasCheckoutError !== nextProps.hasCheckoutError) {
      return false
    }

    return shallowCompare(this, nextProps, nextState)
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
        .catch(err => {
          console.log('err', err) //eslint-disable-line
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
      containerSelector: '.frames-container',
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
        <div className="frames-container" />
      </form>
    )
  }
}
