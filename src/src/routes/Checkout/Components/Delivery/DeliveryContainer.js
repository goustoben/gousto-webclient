import { connect } from 'react-redux'
import { getFormValues, submit, getFormMeta } from 'redux-form'
import { deliveryFormName } from 'selectors/checkout'
import { getIsPaymentBeforeChoosingEnabled } from 'selectors/features'
import { actions } from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { trackUTMAndPromoCode } from 'actions/tracking'

import { Delivery } from './Delivery'

export function mapStateToProps(sectionName) {
  return (state) => ({
    formName: deliveryFormName,
    sectionName,
    addressDetail: state.checkout.get('selectedAddress'),
    addresses: state.checkout.get('deliveryAddresses'),
    addressId: state.checkout.get('selectedAddressId'),
    deliveryDaysError: state.error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE),
    deliveryAddress: state.checkout.get('deliveryAddress'),
    addressesPending: state.pending.get('CHECKOUT_ADDRESSES_RECEIVE', false),

    formValues: getFormValues(deliveryFormName)(state),
    formFields: getFormMeta(deliveryFormName)(state),
    deliveryDays: state.boxSummaryDeliveryDays,
    date: state.basket.get('date'),
    slotId: state.basket.get('slotId'),
    aboutYouErrors:
      state.form.account &&
      state.form.account.syncErrors &&
      state.form.account.syncErrors.account &&
      state.request.get('browser') === 'mobile',
    isPaymentBeforeChoosingEnabled: getIsPaymentBeforeChoosingEnabled(state),
  })
}

const connectComponent = (sectionName) =>
  connect(mapStateToProps(sectionName), {
    manualSubmit: submit,
    clearErrors: actions.checkoutClearErrors,
    trackUTMAndPromoCode,
  })(Delivery)

export const DeliveryContainer = (sectionName) => connectComponent(sectionName)

export function validationMessages(sectionName) {
  return {
    [`${sectionName}.phone`]: 'Please provide a valid UK phone number',
    [`${sectionName}.addressId`]: 'Please select an address',
  }
}

export const getInitialValues = (state, sectionName) => ({
  [sectionName]: {
    addressId: 'placeholder',
    notFound: false,
    addressType: 'home',
    deliveryInstruction: 'Please select an option',
    phone: state.basket.get('phone', ''),
    addresses: [],
    confirmed: false,
    firstName: '',
    lastName: '',
  },
})

export function addInitialValues(Component, { sectionName }) {
  return connect(
    (state, ownProps) => {
      const delivery = state.form[deliveryFormName]
      const initialValues = delivery && delivery.initial ? delivery.initial : {}

      return {
        // needed for hacked custom validation in validation/delivery.js
        formValues: getFormValues(deliveryFormName)(state),
        formFields: getFormMeta(deliveryFormName)(state),
        sectionName,

        initialValues: {
          ...ownProps.initialValues,
          ...initialValues,
          ...getInitialValues(state, sectionName),
        },
      }
    },
    { trackUTMAndPromoCode }
  )(Component)
}
