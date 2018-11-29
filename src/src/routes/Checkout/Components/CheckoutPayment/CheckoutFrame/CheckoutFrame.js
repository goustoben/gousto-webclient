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
      console.log('iniitFrames in componentDidMount') // eslint-disable-line
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
      checkoutClearErrors,
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
      console.log('iniitFrames in componentDidUpdate') // eslint-disable-line

      this.initFrames()
    }

    // console.log('isSubmitCardEnabled', isSubmitCardEnabled) //eslint-disable-line
    if (hasPropUpdated(isSubmitCardEnabled, prevProps.isSubmitCardEnabled) && isSubmitCardEnabled){
      console.log('submitting card') //eslint-disable-line
      console.log('isSubmitCardEnabled', isSubmitCardEnabled) //eslint-disable-line

      Frames.removeAllEventHandlers(Events.CARD_TOKENISED)
      Frames.removeAllEventHandlers(Events.CARD_SUBMITTED)
      this.initFrames()
      console.log('is card valid', Frames.isCardValid()) //eslint-disable-line

      //checkoutClearErrors()
      Frames.submitCard()
        .then(data => {
          console.log('sybmit card succeeded') // eslint-disable-line
          console.log('data', data) // eslint-disable-line
        })
        .catch(err => {
          console.log('err', err) //eslint-disable-line
          validCardDetailsNotProvided()
        })
      disableCardSubmission()
    }

    // if (hasCheckoutError) {
    //
    // }

  }

  initFrames = () => {
    const { paymentForm } = this
    const { checkoutClearErrors } = this.props

    Frames.init({
      publicKey,
      containerSelector: '.frames-container',
      cardValidationChanged: () => {},
      cardSubmitted: () => {
        // clear tokenisation errors
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

    console.log('success card submit') //eslint-disable-line

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
