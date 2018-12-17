import { connect } from 'react-redux'
import { getFormValues, submit, getFormMeta, change } from 'redux-form'

import actions from 'actions'
import actionTypes from 'actions/actionTypes'

import Delivery from './Delivery'

function mapStateToProps(sectionName) {

  return state => ({
    formName: state.request.get('browser') === 'mobile' ? 'yourDetails' : 'delivery',
    sectionName,
    addressDetail: state.checkout.get('selectedAddress'),
    addresses: state.checkout.get('deliveryAddresses'),
    addressId: state.checkout.get('selectedAddressId'),
    deliveryDaysError: state.error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE),
    deliveryAddress: state.checkout.get('deliveryAddress'),
    addressesPending: state.pending.get('CHECKOUT_ADDRESSES_RECEIVE', false),

    formValues: getFormValues(state.request.get('browser') === 'mobile' ? 'yourDetails' : 'delivery')(state),
    formFields: getFormMeta(state.request.get('browser') === 'mobile' ? 'yourDetails' : 'delivery')(state),
  })
}

const connectComponent = sectionName => connect(mapStateToProps(sectionName), {
  manualSubmit: submit,
  clearErrors: actions.checkoutClearErrors,
  change,
})(Delivery)

export default sectionName => connectComponent(sectionName)

export function validationMessages(sectionName) {
  return ({
    [`${sectionName}.phone`]: 'Please provide a valid UK phone number',
    [`${sectionName}.addressId`]: 'Please select an address',
  })
}

export function addInitialValues(Component, { sectionName }) {
  return connect(
    (state, ownProps) => {
      const formName = state.request.get('browser') === 'mobile' ? 'yourDetails' : 'delivery'
      const delivery = state.form[formName]

      const initialValues = delivery && delivery.initial ? delivery.initial : {}

      return {
        // needed for hacked custom validation in validation/delivery.js
        formValues: getFormValues(formName)(state),
        formFields: getFormMeta(formName)(state),
        sectionName,

        initialValues: {
          ...ownProps.initialValues,
          ...initialValues,
          [sectionName]: {
            addressId: 'placeholder',
            notFound: false,
            addressType: 'home',
            deliveryInstruction: 'Front Porch',
            phone: state.basket.get('phone', ''),
            addresses: [],
            confirmed: false,
          },
        },
      }
    }
    , {})(Component)
}
