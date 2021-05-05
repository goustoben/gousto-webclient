import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Field } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import checkoutCss from '../../Checkout.css'

const AddressInputs = ({ receiveRef, sectionName }) => (
  <Fragment>
    <div className={checkoutCss.inputContainer}>
      <Field
        name="houseNo"
        component={ReduxFormInput}
        inputType="Input"
        placeholder=""
        required
        color="gray"
        label="House number or name"
        mask
        withRef
        ref={receiveRef}
        refId={`${sectionName}.houseNo`}
        data-testing="houseNo"
      />
    </div>
    <div className={checkoutCss.inputContainer}>
      <Field
        name="street"
        component={ReduxFormInput}
        inputType="Input"
        placeholder=""
        required
        color="gray"
        label="Street"
        mask
        withRef
        ref={receiveRef}
        refId={`${sectionName}.street`}
        data-testing="street"
      />
    </div>
    <div className={checkoutCss.inputContainer}>
      <Field
        name="town"
        component={ReduxFormInput}
        inputType="Input"
        placeholder=""
        required
        color="gray"
        label="City"
        mask
        withRef
        ref={receiveRef}
        refId={`${sectionName}.town`}
        data-testing="town"
      />
    </div>
  </Fragment>
)

AddressInputs.propTypes = {
  receiveRef: PropTypes.func,
  sectionName: PropTypes.string,
}

AddressInputs.defaultProps = {
  receiveRef: () => {},
  sectionName: '',
}

export { AddressInputs }
