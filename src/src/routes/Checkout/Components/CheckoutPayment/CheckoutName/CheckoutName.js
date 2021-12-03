import React from 'react'
import PropTypes from 'prop-types'
import { Field, FormSection } from 'redux-form'

import { ReduxFormInput } from 'Form/ReduxFormInput'

import css from './CheckoutName.module.css'

export const CheckoutName = ({ sectionName, receiveRef }) => (
  <FormSection name={sectionName}>
    <div className={css.container}>
      <Field
        name="cardName"
        component={ReduxFormInput}
        inputType="Input"
        mask
        forwardRef
        ref={receiveRef}
        refId={`${sectionName}.cardName`}
        dataTesting="checkoutCardNameInput"
        className={css.nameInput}
        autoComplete="cc-name"
      />
    </div>
  </FormSection>
)

CheckoutName.propTypes = {
  sectionName: PropTypes.string.isRequired,
  receiveRef: PropTypes.func.isRequired,
}
