import React from 'react'
import PropTypes from 'prop-types'
import { Field, FormSection } from 'redux-form'

import ReduxFormInput from 'Form/ReduxFormInput'
import { BillingAddress } from '../BillingAddress'
import { PaymentHeader } from '../PaymentHeader'
import SubmitButton from '../SubmitButton'
import css from './CheckoutPayment.css'

import { CheckoutFrame } from './CheckoutFrame'

const propTypes = {
  submit: PropTypes.func,
  receiveRef: PropTypes.func,
  sectionName: PropTypes.string,
  checkoutScriptReady: PropTypes.bool,
  asyncValidate: PropTypes.func,
  scrollToFirstMatchingRef: PropTypes.func,
}

const defaultProps = {
  receiveRef: () => {},
  sectionName: 'payment',
  checkoutScriptReady: false,
}

const CheckoutPayment = ({ checkoutScriptReady, receiveRef, sectionName, submit, asyncValidate, scrollToFirstMatchingRef }) => (
  <div>
    <div className={css.container}>
      <PaymentHeader />
      <div className={css.wrapper}>
        <FormSection name={sectionName}>
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
        </FormSection>
      </div>
      <div className={css.frame}>
        <CheckoutFrame checkoutScriptReady={checkoutScriptReady} />
      </div>
      <BillingAddress
        asyncValidate={asyncValidate}
        receiveRef={receiveRef}
        scrollToFirstMatchingRef={scrollToFirstMatchingRef}
      />
    </div>
    <SubmitButton onClick={submit} />
  </div>
)

CheckoutPayment.propTypes = propTypes
CheckoutPayment.defaultProps = defaultProps

export {
  CheckoutPayment,
}
