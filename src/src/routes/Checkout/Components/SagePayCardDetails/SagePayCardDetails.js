import React from 'react'
import PropTypes from 'prop-types'
import { Field, FormSection } from 'redux-form'

import Svg from 'Svg'
import config from 'config/checkout'
import { inferCardType } from 'utils/checkout'
import ReduxFormInput from 'Form/ReduxFormInput'
import { PaymentSecurityCode } from './PaymentSecurityCode'
import { PaymentExpiryDate } from './PaymentExpiryDate'
import { PaymentHeader } from '../PaymentHeader'
import { BillingAddress } from '../BillingAddress'
import css from './SagePayCardDetails.css'

class SagePayCardDetails extends React.PureComponent {
  static propTypes = {
    asyncValidate: PropTypes.func,
    change: PropTypes.func,
    untouch: PropTypes.func,
    form: PropTypes.string,
    formValues: PropTypes.object,
    formSectionName: PropTypes.string,
    clearErrors: PropTypes.func,
    receiveRef: PropTypes.func,
    scrollToFirstMatchingRef: PropTypes.func,
  }

  static defaultProps = {
    formSectionName: 'payment',
    clearErrors: () => {},
    receiveRef: () => {},
  }

  componentDidMount() {
    const { formSectionName, form, change, untouch, clearErrors } = this.props

    const clearFields = ['cardName', 'cardType', 'cardNumber', 'cv2', 'cardExpiryMonth', 'cardExpiryYear']
    clearFields.forEach((field) => {
      const fieldName = `${formSectionName}.${field}`
      change(form, fieldName, '')
      untouch(form, fieldName)
    })

    // redux-form removed values from delivery if this was set through initialValues
    change(form, `${formSectionName}.isBillingAddressDifferent`, false)

    // reset error msg
    clearErrors()
  }

  normalizeCardNumber = (value) => {
    if (!value) {
      return value
    }

    /**
     * return onlyNums
     */
    return value.replace(/[^\d]/g, '')
  }

  paymentOptions = () => (
    config.cardTypeOptions.map((option) => ({
      ...option,
      subLabel: (<span className={css[option.icon]} aria-hidden="true" />)
    }))
  )

  cardNumberUpdated = (value) => {
    if (!value) {
      return null
    }

    const { formValues, form, formSectionName, change } = this.props
    const cardNumber = Object.values(value).join('')

    if (!formValues.cardType) {
      const cardType = inferCardType(cardNumber)
      if (config.supportedCardTypes.indexOf(cardType) !== -1 || cardType === '') {
        const fieldName = `${formSectionName}.cardType`
        change(form, fieldName, cardType)
      }
    }

    return null
  }

  render() {
    const { formSectionName: sectionName, receiveRef, asyncValidate, scrollToFirstMatchingRef } = this.props

    return (
      <div>
        <FormSection name={sectionName}>
          <div className={css.paymentContainer} data-testing="checkoutPaymentSection">
            <PaymentHeader />
            <div className={css.wrapper}>
              <div className={css.icons}>
                <Svg fileName="icon-Maestro-dark" className={css.iconCardObverse} />
                <Svg fileName="icon-MasterCard-dark" className={css.iconCardObverse} />
                <Svg fileName="icon-Visa-dark" className={css.iconCardObverse} />
              </div>
              <div className={css.main}>
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
                <div className={css.cardDetails}>
                  <div className={css.cardNumberWrapper}>
                    <Field
                      name="cardNumber"
                      component={ReduxFormInput}
                      inputType="Input"
                      pattern="[0-9]*"
                      color="gray"
                      label="Card Number"
                      onChange={this.cardNumberUpdated}
                      normalize={this.normalizeCardNumber}
                      mask
                      withRef
                      ref={receiveRef}
                      refId={`${sectionName}.cardNumber`}
                      data-testing="checkoutCardNumberInput"
                    />
                  </div>
                  <div className={css.cardTypeWrapper}>
                    <Field
                      name="cardType"
                      component={ReduxFormInput}
                      inputType="DropDown"
                      options={this.paymentOptions()}
                      label="Card Type"
                      mask
                      withRef
                      ref={receiveRef}
                      refId={`${sectionName}.cardType`}
                    />
                  </div>
                </div>

                <PaymentSecurityCode receiveRef={receiveRef} sectionName={sectionName} />
                <PaymentExpiryDate receiveRef={receiveRef} sectionName={sectionName} />
              </div>
            </div>
            <BillingAddress
              asyncValidate={asyncValidate}
              receiveRef={receiveRef}
              scrollToFirstMatchingRef={scrollToFirstMatchingRef}
            />
          </div>
        </FormSection>
      </div>
    )
  }
}

export { SagePayCardDetails }
