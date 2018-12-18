import React from 'react'
import PropTypes from 'prop-types'

import { Section } from 'Page/Elements'
import BoxDetails from '../BoxDetails'
import Summary from '../Summary'

import { PaymentHeader } from '../PaymentHeader'
import SubmitButton from '../SubmitButton'
import css from './CheckoutPayment.css'

import { CheckoutName } from './CheckoutName'
import { CheckoutFrame } from './CheckoutFrame'
import { CheckoutAddress } from './CheckoutAddress'

export class CheckoutPayment extends React.Component {
  static propTypes = {
    submit: PropTypes.func.isRequired,
    receiveRef: PropTypes.func,
    scrollToFirstMatchingRef: PropTypes.func,
    asyncValidate: PropTypes.func,
    trackingOrderPlaceAttempt: PropTypes.func,
    trackingOrderPlaceAttemptFailed: PropTypes.func,
    trackingOrderPlaceAttemptSucceeded: PropTypes.func,
    touch: PropTypes.func,
    formErrors: PropTypes.object,
    sectionName: PropTypes.string,
    browser: PropTypes.string,
    checkoutScriptReady: PropTypes.bool,
    reloadCheckoutScript: PropTypes.func,
    /* prerender - We allow the iFrame to initialize before this component is shown by pre-rendering with CheckoutFrame only */
    prerender: PropTypes.bool,
  }

  static defaultProps = {
    receiveRef: () => {},
    scrollToFirstMatchingRef: () => {},
    asyncValidate: () => {},
    trackingOrderPlaceAttempt: () => {},
    trackingOrderPlaceAttemptFailed: () => {},
    trackingOrderPlaceAttemptSucceeded: () => {},
    reloadCheckoutScript: () => {},
    touch: () => {},
    formErrors: {},
    sectionName: 'payment',
    browser: 'mobile',
    checkoutScriptReady: false,
  }

  state = {
    isSubmitCardEnabled: false,
  }

  applyValidationErrors = () => {
    const { formErrors, touch, sectionName } = this.props

    if (formErrors && formErrors[sectionName]) {
      for (const formError in formErrors[sectionName]) {
        touch(sectionName, `${sectionName}[${formError}]`)
      }
    }
  }

  enableCardSubmission = () => {
    this.setState({
      isSubmitCardEnabled: true,
    })
  }

  disableCardSubmission = () => {
    this.setState({
      isSubmitCardEnabled: false,
    })
  }

  isFormValid = () => {
    const { formErrors, sectionName } = this.props

    return !(formErrors && formErrors[sectionName])
  }

  handleClick = () => {
    const { trackingOrderPlaceAttempt, trackingOrderPlaceAttemptFailed, trackingOrderPlaceAttemptSucceeded } = this.props
    trackingOrderPlaceAttempt()

    if (this.isFormValid()) {
      trackingOrderPlaceAttemptSucceeded(true)
      this.enableCardSubmission()
    } else {
      trackingOrderPlaceAttemptFailed()
      this.applyValidationErrors()
    }
  }

  cardTokenReady = () => {
    this.submitForm()
  }

  submitForm = () => {
    const { submit } = this.props
    submit()
  }

  render() {
    const { asyncValidate, browser, checkoutScriptReady, prerender, receiveRef, reloadCheckoutScript, scrollToFirstMatchingRef, sectionName } = this.props
    const { isSubmitCardEnabled } = this.state

    return (
      <div className={(prerender) ? css.hide : ''}>
        <div className={css.container} data-testing="checkoutPaymentSection">
          <PaymentHeader />
          {prerender ? null : (
            <CheckoutName
              receiveRef={receiveRef}
              sectionName={sectionName}
            />
          )}
          <div className={css.frame}>
            <CheckoutFrame
              checkoutScriptReady={checkoutScriptReady}
              isSubmitCardEnabled={isSubmitCardEnabled}
              reloadCheckoutScript={reloadCheckoutScript}
              cardTokenReady={this.cardTokenReady}
              disableCardSubmission={this.disableCardSubmission}
            />
          </div>
          {prerender ? null : (
            <CheckoutAddress
              sectionName={sectionName}
              asyncValidate={asyncValidate}
              receiveRef={receiveRef}
              scrollToFirstMatchingRef={scrollToFirstMatchingRef}
            />
          )}
        </div>
        {(prerender) ? null : (
          <div>
            <SubmitButton onClick={this.handleClick} />
            {(browser === 'mobile') ? (
              <div>
                <Summary />
                <Section margin={{ top: 'LG' }}>
                  <BoxDetails />
                </Section>
              </div>
            ) : null}
          </div>
        )}
      </div>
    )
  }
}
