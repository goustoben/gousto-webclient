import React from 'react'
import PropTypes from 'prop-types'
import { Field, FormSection } from 'redux-form'

import ReduxFormInput from 'Form/ReduxFormInput'

import css from './CheckoutName.css'

export const CheckoutName = ({ sectionName, receiveRef, isCheckoutOverhaulEnabled }) => {
  if (isCheckoutOverhaulEnabled) {
    return (
      <FormSection name={sectionName}>
        <div className={css.checkoutOverhaulContainer}>
          <Field
            name="cardName"
            component={ReduxFormInput}
            inputType="Input"
            mask
            withRef
            ref={receiveRef}
            refId={`${sectionName}.cardName`}
            data-testing="checkoutCardNameInput"
            className={css.checkoutNameInputCheckoutOverhaul}
            isCheckoutOverhaulEnabled
          />
        </div>
      </FormSection>
    )
  } else {
    return (
      <FormSection name={sectionName}>
        <div className={css.wrapper}>
          <p className={css.cardDetails}>Card details</p>
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
  }
}

CheckoutName.propTypes = {
  sectionName: PropTypes.string.isRequired,
  receiveRef: PropTypes.func.isRequired,
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

CheckoutName.defaultProps = {
  isCheckoutOverhaulEnabled: false,
}
