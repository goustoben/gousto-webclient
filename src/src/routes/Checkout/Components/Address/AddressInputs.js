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
        forwardRef
        ref={receiveRef}
        refId={`${sectionName}.houseNo`}
        dataTesting="houseNo"
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
        forwardRef
        ref={receiveRef}
        refId={`${sectionName}.street`}
        dataTesting="street"
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
        forwardRef
        ref={receiveRef}
        refId={`${sectionName}.town`}
        dataTesting="town"
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
