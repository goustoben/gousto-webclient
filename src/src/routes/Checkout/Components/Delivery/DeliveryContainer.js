import { connect } from 'react-redux'
import { getFormValues, submit, getFormMeta, change } from 'redux-form'
import { getDeliveryFormName } from 'selectors/checkout'
import { getIsCheckoutOverhaulEnabled, getIsPassStrengthEnabled } from 'selectors/features'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { trackUTMAndPromoCode } from 'actions/tracking'

import { Delivery } from './Delivery'

export function mapStateToProps(sectionName) {
  return state => ({
    formName: getDeliveryFormName(state),
    sectionName,
    addressDetail: state.checkout.get('selectedAddress'),
    addresses: state.checkout.get('deliveryAddresses'),
    addressId: state.checkout.get('selectedAddressId'),
    deliveryDaysError: state.error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE),
    deliveryAddress: state.checkout.get('deliveryAddress'),
    addressesPending: state.pending.get('CHECKOUT_ADDRESSES_RECEIVE', false),

    formValues: getFormValues(getDeliveryFormName(state))(state),
    formFields: getFormMeta(getDeliveryFormName(state))(state),
    isCheckoutOverhaulEnabled: getIsCheckoutOverhaulEnabled(state),
    deliveryDays: state.boxSummaryDeliveryDays,
    date: state.basket.get('date'),
    slotId: state.basket.get('slotId'),
    aboutYouErrors: state.form.yourdetails
      && state.form.yourdetails.syncErrors.aboutyou
      && state.request.get('browser') === 'mobile'
      && getIsPassStrengthEnabled(state),
  })
}

const connectComponent = sectionName => connect(mapStateToProps(sectionName), {
  manualSubmit: submit,
  clearErrors: actions.checkoutClearErrors,
  change,
  trackUTMAndPromoCode,
})(Delivery)

export default sectionName => connectComponent(sectionName)

export function validationMessages(sectionName) {
  return ({
    [`${sectionName}.phone`]: 'Please provide a valid UK phone number',
    [`${sectionName}.addressId`]: 'Please select an address',
  })
}

export const getInitialValues = (state, sectionName) => {
  const isCheckoutOverhaulEnabled = getIsCheckoutOverhaulEnabled(state)

  return {
    [sectionName]: {
      addressId: 'placeholder',
      notFound: false,
      addressType: 'home',
      deliveryInstruction: isCheckoutOverhaulEnabled ? 'Please select an option' : 'Front Porch',
      phone: state.basket.get('phone', ''),
      addresses: [],
      confirmed: false,
      ...(isCheckoutOverhaulEnabled && {
        firstName: '',
        lastName: '',
      }),
    },
  }
}

export function addInitialValues(Component, { sectionName }) {
  return connect(
    (state, ownProps) => {
      const formName = getDeliveryFormName(state)
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
          ...getInitialValues(state, sectionName)
        }
      }
    },
    { trackUTMAndPromoCode })(Component)
}
