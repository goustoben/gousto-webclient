import { connect } from 'react-redux'
import { change, getFormValues } from 'redux-form'

import { getDeliveryFormName } from 'selectors/checkout'
import { getIsCheckoutOverhaulEnabled } from 'selectors/features'
import { form, sectionName } from './config'

import { BillingAddress } from './BillingAddress'

const getDeliveryAddress = (state) => {
  const deliveryFormName = getDeliveryFormName(state)

  return state.form[deliveryFormName] ? state.form[deliveryFormName].values.delivery : {}
}

const mapStateToProps = (state) => {
  const formValues = getFormValues(form)(state)

  return {
    form,
    sectionName,
    formValues,
    deliveryAddress: getDeliveryAddress(state),
    isCheckoutOverhaulEnabled: getIsCheckoutOverhaulEnabled(state),
  }
}

const mapDispatchToProps = {
  change,
}

export const BillingAddressContainer = connect(mapStateToProps, mapDispatchToProps)(BillingAddress)
