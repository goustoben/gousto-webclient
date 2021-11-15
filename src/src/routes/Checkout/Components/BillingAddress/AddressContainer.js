import { connect } from 'react-redux'
import {
  getFormSyncErrors,
  getFormAsyncErrors,
  change,
  untouch,
  touch,
  registerField,
} from 'redux-form'
import { Address } from '../Address'
import { checkoutAddressLookup } from "actions/checkout/checkoutAddressLookup"

function mapStateToProps(state, ownProps) {
  return {
    addresses: state.checkout.get('billingAddresses'),
    addressDetail: state.checkout.get('deliveryAddress'),
    selectedAddress: state.checkout.get('selectedBillingAddress'),
    addressesPending: state.pending.get('CHECKOUT_ADDRESSES_RECEIVE', false),
    formValues: ownProps.formValues,
    formErrors: {
      ...getFormSyncErrors(ownProps.formName)(state),
      ...getFormAsyncErrors(ownProps.formName)(state),
    },
    sectionName: ownProps.sectionName,
    addressEdited: state.checkout.get('billingAddressEdited'),
    touchPostcode: false,
  }
}

const BillingAddressContainer = connect(mapStateToProps, {
  checkoutAddressLookup,
  change,
  untouch,
  touch,
  registerField,
})(Address)

export { BillingAddressContainer }
