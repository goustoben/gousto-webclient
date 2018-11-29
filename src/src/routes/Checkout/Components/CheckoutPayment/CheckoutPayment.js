import React from 'react'
import PropTypes from 'prop-types'
import { Field, FormSection } from 'redux-form'

import ReduxFormInput from 'Form/ReduxFormInput'
import { BillingAddress } from '../BillingAddress'
import { PaymentHeader } from '../PaymentHeader'
import SubmitButton from '../SubmitButton'
import css from './CheckoutPayment.css'

import { CheckoutFrame } from './CheckoutFrame'

export class CheckoutPayment extends React.Component {
  static propTypes = {
    submit: PropTypes.func,
    receiveRef: PropTypes.func,
    sectionName: PropTypes.string,
    checkoutScriptReady: PropTypes.bool,
    asyncValidate: PropTypes.func,
    scrollToFirstMatchingRef: PropTypes.func,
  }

  static defaultProps = {
    receiveRef: () => {},
    sectionName: 'payment',
    checkoutScriptReady: false,
  }

  state = {
    submitCheckoutFrame: false,
  }

  submitPayment = () => {
    this.setState({
      submitCheckoutFrame: true,
    })
  }

  cardTokenReady = () => {
    const { submit } = this.props
    submit()
  }

  render() {
    const { asyncValidate, checkoutScriptReady, receiveRef, scrollToFirstMatchingRef, sectionName } = this.props
    const { submitCheckoutFrame } = this.state

    return (
      <div>
        <div className={css.container} data-testing="checkoutPaymentSection">
          <PaymentHeader />
          <FormSection name={sectionName}>
            <div className={css.wrapper}>
              <p className={css.cardDetails}>
                Card details
              </p>
              <Field
                name="cardName"
                component={ReduxFormInput}
                inputType="Input"
                placeholder="Name on card"
                color="gray"
                mask
                withRef
                ref={receiveRef}
                refId={`${sectionName}.cardName`}
                data-testing="checkoutCardNameInput"
              />
            </div>
            <div className={css.frame}>
              <CheckoutFrame
                checkoutScriptReady={checkoutScriptReady}
                submitCheckoutFrame={submitCheckoutFrame}
                cardTokenReady={this.cardTokenReady}
              />
            </div>
            <BillingAddress
              asyncValidate={asyncValidate}
              receiveRef={receiveRef}
              scrollToFirstMatchingRef={scrollToFirstMatchingRef}
            />
          </FormSection>
        </div>
        <SubmitButton onClick={this.submitPayment} />
      </div>
    )
  }
}
