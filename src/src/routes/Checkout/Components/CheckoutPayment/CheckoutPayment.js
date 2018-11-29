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
    formErrors: PropTypes.object,
  }

  static defaultProps = {
    receiveRef: () => {},
    sectionName: 'payment',
    checkoutScriptReady: false,
    formErrors: {},
  }

  state = {
    isSubmitCardEnabled: false,
  }

  validateFormInput = () => {
    const { formErrors, touch, formName, sectionName } = this.props

    if (formErrors && formErrors.payment) {
      for (let formError in formErrors.payment) {
        touch(formName, `${sectionName}[${formError}]`)
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

  isValid = () => {
    const { formErrors } = this.props

    return !(formErrors && formErrors.payment)
  }

  handleClick = () => {
    this.validateFormInput()

    if (this.isValid()) {
      this.enableCardSubmission()
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
