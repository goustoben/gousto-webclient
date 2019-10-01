import { connect } from 'react-redux'
import { getFormSyncErrors, getFormAsyncErrors, change, untouch, touch, registerField } from 'redux-form'

import { checkoutAddressDetailLookup, checkoutAddressLookup } from 'actions/checkout'

import Address from '../Address'

function mapStateToProps(state, ownProps) {
  return {
    addresses: state.checkout.get('billingAddresses'),
    addressDetail: state.checkout.get('deliveryAddress'),
    selectedAddress: state.checkout.get('selectedBillingAddress'),
    addressesPending: state.pending.get('CHECKOUT_ADDRESSES_RECEIVE', false),
    formValues: ownProps.formValues,
    formErrors: Object.assign({}, getFormSyncErrors(ownProps.formName)(state), getFormAsyncErrors(ownProps.formName)(state)),
    sectionName: ownProps.sectionName,
    addressEdited: state.checkout.get('billingAddressEdited'),
    touchPostcode: false,
    isNDDExperiment: state.features.getIn('ndd', 'value')
  }
}

const BillingAddressContainer = connect(mapStateToProps, {
  checkoutAddressLookup,
  checkoutAddressDetailLookup,
  change,
  untouch,
  touch,
  registerField,
})(Address)

export default BillingAddressContainer
