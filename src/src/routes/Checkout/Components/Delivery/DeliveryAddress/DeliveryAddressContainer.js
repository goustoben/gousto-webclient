import { connect } from 'react-redux'
import { Map } from 'immutable'
import { change, getFormAsyncErrors, getFormMeta, getFormSyncErrors, registerField, touch, untouch } from 'redux-form'
import { trackCheckoutButtonPressed } from 'actions/checkout'
import actions from 'actions'
import { getDeliveryTariffId, getNDDFeatureFlagVal } from 'utils/deliveries'
import { getNDDFeatureValue } from 'selectors/features'
import Address from '../../Address'

function getCutoffDate(state) {
  const date = state.basket.get('date')
  const slotId = state.basket.get('slotId')
  const slots = state.boxSummaryDeliveryDays.getIn([date, 'slots'])
  const deliverySlot = slots.find(slot => slot.get('id') === slotId) || Map()

  return deliverySlot.get('whenCutoff', '')
}

function mapStateToProps(state, ownProps) {
  return {
    addressesPending: state.pending.get('CHECKOUT_ADDRESSES_RECEIVE', false),
    formValues: ownProps.formValues,
    formFields: getFormMeta(ownProps.formName)(state),
    formErrors: Object.assign({}, getFormSyncErrors(ownProps.formName)(state), getFormAsyncErrors(ownProps.formName)(state)),
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

const DeliveryAddressContainer = connect(mapStateToProps, {
  checkoutAddressLookup: actions.checkoutAddressLookup,
  checkoutAddressDetailLookup: actions.checkoutAddressDetailLookup,
  onAddressConfirm: actions.basketPostcodeChange,
  change,
  untouch,
  touch,
  registerField,
  trackCheckoutButtonPressed
})(Address)

export default DeliveryAddressContainer
