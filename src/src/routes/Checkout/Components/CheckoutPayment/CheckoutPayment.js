import React from 'react'
import PropTypes from 'prop-types'
import { Field, FormSection } from 'redux-form'

import ReduxFormInput from 'Form/ReduxFormInput'

const propTypes = {
  receiveRef: PropTypes.func,
  sectionName: PropTypes.string,
}
const defaultProps = {
  receiveRef: () => {},
  sectionName: 'payment',
}

const CheckoutPayment = ({ receiveRef, sectionName }) => (
  <div>
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
)

CheckoutPayment.propTypes = propTypes
CheckoutPayment.defaultProps = defaultProps

export {
  CheckoutPayment,
}
