import { connect } from 'react-redux'
import { Map } from 'immutable'
import {
  change,
  getFormAsyncErrors,
  getFormMeta,
  getFormSyncErrors,
  registerField,
  touch,
  untouch,
} from 'redux-form'
import { trackCheckoutButtonPressed } from 'actions/checkout'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { actions } from 'actions'
import { getDeliveryTariffId, getNDDFeatureFlagVal } from 'utils/deliveries'
import { getNDDFeatureValue } from 'selectors/features'
import { Address } from '../../Address'

function getCutoffDate(state) {
  const date = state.basket.get('date')
  const slotId = state.basket.get('slotId')
  const slots = state.boxSummaryDeliveryDays.getIn([date, 'slots'])
  const deliverySlot = slots.find((slot) => slot.get('id') === slotId) || Map()

  return deliverySlot.get('whenCutoff', '')
}

function mapStateToProps(state, ownProps) {
  return {
    addressesPending: state.pending.get('CHECKOUT_ADDRESSES_RECEIVE', false),
    formValues: ownProps.formValues,
    formFields: getFormMeta(ownProps.formName)(state),
    formErrors: {
      ...getFormSyncErrors(ownProps.formName)(state),
      ...getFormAsyncErrors(ownProps.formName)(state),
    },
    sectionName: ownProps.sectionName,
    initialPostcode: state.basket.get('postcode'),
    deliveryDate: state.basket.get('date'),
    menuCutoffUntil: state.menuCutoffUntil,
    cutOffDate: getCutoffDate(state),
    isNDDExperiment: getNDDFeatureFlagVal(state),
    isMobile: state.request.get('browser') === 'mobile',
    deliveryTariffId: getDeliveryTariffId(state.user, getNDDFeatureValue(state)),
  }
}

export const DeliveryAddressContainer = connect(mapStateToProps, {
  checkoutAddressLookup: actions.checkoutAddressLookup,
  onAddressConfirm: actions.basketPostcodeChange,
  change,
  untouch,
  touch,
  registerField,
  trackCheckoutButtonPressed,
  trackUTMAndPromoCode,
  userProspect: actions.userProspect,
})(Address)
