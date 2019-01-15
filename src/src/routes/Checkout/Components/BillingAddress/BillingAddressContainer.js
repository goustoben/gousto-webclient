import { connect } from 'react-redux'
import { change, getFormValues } from 'redux-form'

import { form, sectionName } from './config'

import { BillingAddress } from './BillingAddress'

const getDeliveryAddress = (state) => (
  state.form.delivery ? state.form.delivery.values.delivery : {}
)

const mapStateToProps = (state) => {
  const formValues = getFormValues(form)(state)

  return {
    form,
    sectionName,
    formValues,
    deliveryAddress: getDeliveryAddress(state),
  }
}

const mapDispatchToProps = {
  change,
}

export const BillingAddressContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BillingAddress)
