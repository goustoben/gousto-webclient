import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'

const AddressInputs = ({ receiveRef, sectionName }) => (
  <div>
    <br />
    <div>
      <Field
        name="houseNo"
        component={ReduxFormInput}
        inputType="Input"
        placeholder="House number or name"
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
    <br />
    <div>
      <Field
        name="street"
        component={ReduxFormInput}
        inputType="Input"
        placeholder="Enter Street name"
        required
        color="gray"
        label="Street"
        mask
        withRef
        ref={receiveRef}
        refId={`${sectionName}.street`}
      />
    </div>
    <br />
    <div>
      <Field
        name="town"
        component={ReduxFormInput}
        inputType="Input"
        placeholder="Enter Town"
        required
        color="gray"
        label="Town"
        mask
        withRef
        ref={receiveRef}
        refId={`${sectionName}.town`}
      />
    </div>
    <br />
    <div>
      <Field
        name="county"
        component={ReduxFormInput}
        inputType="Input"
        placeholder="Enter County"
        required
        color="gray"
        label="County"
        mask
        withRef
        ref={receiveRef}
        refId={`${sectionName}.county`}
      />
    </div>
    <br />
    <div>
      <Field
        name="postcode"
        component={ReduxFormInput}
        inputType="Input"
        placeholder="Enter Postcode"
        required
        color="gray"
        label="Postcode"
        mask
        disabled
        withRef
        ref={receiveRef}
        refId={`${sectionName}.postcode`}
      />
    </div>
    <br />
  </div>
)

AddressInputs.propTypes = {
  receiveRef: PropTypes.func,
  sectionName: PropTypes.string,
}

AddressInputs.defaultProps = {
  receiveRef: () => {},
}

export default AddressInputs
