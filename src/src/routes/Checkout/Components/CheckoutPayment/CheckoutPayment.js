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
    submit: PropTypes.func.isRequired,
    receiveRef: PropTypes.func,
    scrollToFirstMatchingRef: PropTypes.func,
    asyncValidate: PropTypes.func,
    trackingOrderPlace: PropTypes.func,
    touchInputsInForm: PropTypes.func,
    formErrors: PropTypes.object,
    sectionName: PropTypes.string,
    formName: PropTypes.string,
    checkoutScriptReady: PropTypes.bool,
  }

  static defaultProps = {
    receiveRef: () => {},
    scrollToFirstMatchingRef: () => {},
    asyncValidate: () => {},
    trackingOrderPlace: () => {},
    touchInputsInForm: () => {},
    formErrors: {},
    sectionName: 'payment',
    formName: 'checkout',
    checkoutScriptReady: false,
  }

  state = {
    isSubmitCardEnabled: false,
  }

  applyValidationErrors = () => {
    const { formErrors, touchInputsInForm, formName, sectionName } = this.props

    if (formErrors && formErrors[sectionName]) {
      touchInputsInForm(formErrors[sectionName], formName, sectionName)
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
    const { trackingOrderPlace } = this.props

    if (this.isFormValid()) {
      trackingOrderPlace(true, 'checkout')
      this.enableCardSubmission()
    } else {
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
    const { asyncValidate, checkoutScriptReady, receiveRef, scrollToFirstMatchingRef, sectionName } = this.props
    const { isSubmitCardEnabled } = this.state

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
                isSubmitCardEnabled={isSubmitCardEnabled}
                cardTokenReady={this.cardTokenReady}
                disableCardSubmission={this.disableCardSubmission}
              />
            </div>
            <BillingAddress
              asyncValidate={asyncValidate}
              receiveRef={receiveRef}
              scrollToFirstMatchingRef={scrollToFirstMatchingRef}
            />
          </FormSection>
        </div>
        <SubmitButton onClick={this.handleClick} />
      </div>
    )
  }
}
