import { connect } from 'react-redux'
import { change, getFormValues } from 'redux-form'

import { form, sectionName } from './config'

import { BillingAddress } from './BillingAddress'

const getDeliveryAddress = (formValues) => (
  formValues && formValues.delivery ? formValues.delivery : {}
)

const mapStateToProps = (state) => {
  const formValues = getFormValues(form)(state)

  return {
    form,
    sectionName,
    formValues,
    deliveryAddress: getDeliveryAddress(formValues),
  }
}

const mapDispatchToProps = {
  change,
}

export const BillingAddressContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BillingAddress)
