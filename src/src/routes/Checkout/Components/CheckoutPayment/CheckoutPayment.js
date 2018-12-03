import React from 'react'
import PropTypes from 'prop-types'
import { Field, FormSection } from 'redux-form'

import Loading from 'Loading'
import { Section } from 'Page/Elements'
import ReduxFormInput from 'Form/ReduxFormInput'
import BoxDetails from '../BoxDetails'
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
    touch: PropTypes.func,
    formErrors: PropTypes.object,
    sectionName: PropTypes.string,
    browser: PropTypes.string,
    formName: PropTypes.string,
    checkoutScriptReady: PropTypes.bool,
  }

  static defaultProps = {
    receiveRef: () => {},
    scrollToFirstMatchingRef: () => {},
    asyncValidate: () => {},
    trackingOrderPlace: () => {},
    touch: () => {},
    formErrors: {},
    sectionName: 'payment',
    browser: 'mobile',
    formName: 'checkout',
    checkoutScriptReady: false,
  }

  state = {
    isSubmitCardEnabled: false,
    loading: true,
  }

  applyValidationErrors = () => {
    const { formErrors, touch, formName, sectionName } = this.props

    if (formErrors && formErrors[sectionName]) {
      for (const formError in formErrors[sectionName]) {
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

  checkoutFrameReady = () => {
    this.setState({
      loading: false,
    })
  }

  render() {
    const { asyncValidate, checkoutScriptReady, receiveRef, reloadCheckoutScript, scrollToFirstMatchingRef, sectionName, browser } = this.props
    const { isSubmitCardEnabled, loading } = this.state

    return (
      <div>
        <div className={css.container} data-testing="checkoutPaymentSection">
          {loading &&
            <div className={css.loading}>
              <Loading />
            </div>
          }
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
                reloadCheckoutScript={reloadCheckoutScript}
                cardTokenReady={this.cardTokenReady}
                disableCardSubmission={this.disableCardSubmission}
                checkoutFrameReady={this.checkoutFrameReady}
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
        { browser === 'mobile' ?
          <Section margin={{ top: 'LG' }}>
			      <BoxDetails />
          </Section>
          :
          null
        }
      </div>
    )
  }
}
