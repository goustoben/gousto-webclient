import React from 'react'
import PropTypes from 'prop-types'
import { Field, FormSection } from 'redux-form'

import ReduxFormInput from 'Form/ReduxFormInput'

import css from './CheckoutName.css'

const propTypes = {
  sectionName: PropTypes.string,
  receiveRef: PropTypes.func,
}

const CheckoutName = ({ sectionName, receiveRef }) => (
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
  </FormSection>
)

CheckoutName.propTypes = propTypes

export {
  CheckoutName,
}
