import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { getFullScreenBoxSummary } from 'selectors/features'
import { Postcode } from './Postcode'
import { boxSummaryNext } from "actions/boxSummary/boxSummaryNext"
import { basketRestorePreviousValues } from "actions/basket/basketRestorePreviousValues"
import { basketChosenAddressChange } from "actions/basket/basketChosenAddressChange"
import { temp } from "actions/temp/temp"

function mapStateToProps(state) {
  let shippingDefault
  let tempPostcode = state.temp.get('postcode', '')

  if (state.user.get('shippingAddresses')) {
    shippingDefault = state.user.get('shippingAddresses').filter(address => address.get('shippingDefault')).first()
  }

  const chosenAddress = state.basket.get('chosenAddress') || shippingDefault

  if (chosenAddress) {
    tempPostcode = chosenAddress.get('postcode')
  }

  return {
    deliveryDaysError: state.error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE),
    postcodePending: state.basket.get('postcodePending'),
    prevPostcode: state.basket.get('prevPostcode'),
    addresses: state.user.get('shippingAddresses'),
    address: state.basket.get('address'),
    chosenAddress,
    tempPostcode,
    isVisible: state.boxSummaryShow.get('show', false),
    shouldDisplayFullScreenBoxSummary: getFullScreenBoxSummary(state),
  }
}

const PostcodeContainer = connect(mapStateToProps, {
  basketRestorePreviousValues,
  basketChosenAddressChange,
  setTempPostcode: postcode => temp('postcode', postcode),
  boxSummaryNext,
})(Postcode)

export { PostcodeContainer }
