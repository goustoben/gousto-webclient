import React from 'react'
import PropTypes from 'prop-types'
import { Field, FormSection } from 'redux-form'

import ReduxFormInput from 'Form/ReduxFormInput'
import { PaymentHeader } from '../PaymentHeader'
import SubmitButton from '../SubmitButton'
import css from './CheckoutPayment.css'

import { CheckoutFrame } from './CheckoutFrame'

const propTypes = {
  receiveRef: PropTypes.func,
  sectionName: PropTypes.string,
  submit: PropTypes.func,
}
const defaultProps = {
  receiveRef: () => {},
  sectionName: 'payment',
}

const CheckoutPayment = ({ receiveRef, sectionName, submit }) => (
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
        <CheckoutFrame />
      </div>
    </div>
    <SubmitButton onClick={submit} />
  </div>
)

CheckoutPayment.propTypes = propTypes
CheckoutPayment.defaultProps = defaultProps

export {
  CheckoutPayment,
}
