import React from 'react'

import { ReduxFormInput } from 'Form/ReduxFormInput'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import { phoneValidator } from 'utils/forms'

import checkoutCss from '../../Checkout.css'
import css from './Delivery.css'

export const DeliveryPhoneNumber = ({ receiveRef, sectionName }) => (
  <div className={css.deliveryFieldWrapper}>
    <div className={css.row}>
      <div className={checkoutCss.inputContainer}>
        <Field
          name="phone"
          component={ReduxFormInput}
          inputType="Input"
          autoComplete="tel"
          type="tel"
          subLabel="Used to update you on your delivery"
          label="UK phone number"
          mask
          withRef
          ref={receiveRef}
          refId={`${sectionName}.phone`}
          dataTesting="checkoutPhoneNumberInput"
          validate={phoneValidator}
        />
      </div>
    </div>
  </div>
)

DeliveryPhoneNumber.propTypes = {
  receiveRef: PropTypes.func,
  sectionName: PropTypes.string,
}

DeliveryPhoneNumber.defaultProps = {
  receiveRef: () => {},
  sectionName: 'delivery',
}
