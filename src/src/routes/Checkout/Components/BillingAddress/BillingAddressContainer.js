import { connect } from 'react-redux'
import { change, getFormValues } from 'redux-form'

import { getDeliveryFormName } from 'selectors/checkout'
import { form, sectionName } from './config'

import { BillingAddress } from './BillingAddress'

const getDeliveryAddress = (state) => {
  const deliveryFormName = getDeliveryFormName(state)
  const address = state.form[deliveryFormName] ? state.form[deliveryFormName].values.delivery : {}
  
  return address
}

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
