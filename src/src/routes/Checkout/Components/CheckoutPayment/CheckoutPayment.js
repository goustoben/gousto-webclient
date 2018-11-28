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
    formName: PropTypes.string,
    checkoutScriptReady: PropTypes.bool,
    asyncValidate: PropTypes.func,
    scrollToFirstMatchingRef: PropTypes.func,
    isCardNameValid: PropTypes.bool,
    isBillingAddressValid: PropTypes.bool,
    formErrors: PropTypes.object,
  }

  static defaultProps = {
    receiveRef: () => {},
    sectionName: 'payment',
    checkoutScriptReady: false,
    formErrors: {},
  }

  state = {
    submitCheckoutFrame: false,
  }

  validateBillingAddress = () => {
    const { paymentForm } = this

    const valid = paymentForm.validate()

    console.log('valid', valid) //eslint-disable-line

  }

  validate = () => {
    const { formErrors, touch, formName, sectionName } = this.props
    console.log('in validate')//eslint-disable-line
    console.log('formErrors', formErrors)//eslint-disable-line
    console.log(typeof formErrors.payment)//eslint-disable-line

    if (formErrors && formErrors.payment) {
      for (let formError in formErrors.payment) {
        console.log(`${sectionName}[${formError}]`)//eslint-disable-line
        touch(formName, `${sectionName}[${formError}]`)
      }

      return false
    }

    return true
  }

  isSubmittable = () => {
    // const { isCardNameValid, isBillingAddressValid } = this.props

    return this.validate()
  }

  submitPayment = () => {
    const { submitCheckoutFrame } = this.state
    console.log('submitCheckoutFrame', submitCheckoutFrame) //eslint-disable-line

    if (this.isSubmittable()) {
      console.log('isSubmittable') //eslint-disable-line

      this.setState({
        submitCheckoutFrame: true,
      })
    }
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
        <div className={css.container}>
          <PaymentHeader />
          <FormSection name={sectionName}>
            <div className={css.wrapper}>
              <Field
                name="cardName"
                component={ReduxFormInput}
                inputType="Input"
                color="gray"
                label="Name"
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
