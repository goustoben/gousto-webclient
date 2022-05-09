import { connect } from 'react-redux'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { boxSummaryNext } from 'actions/boxSummary'
import { getFullScreenBoxSummary } from 'selectors/features'
import { Postcode } from './Postcode'

function mapStateToProps(state) {
  let shippingDefault
  let tempPostcode = state.temp.get('postcode', '')

  if (state.user.get('shippingAddresses')) {
    shippingDefault = state.user
      .get('shippingAddresses')
      .filter((address) => address.get('shippingDefault'))
      .first()
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
    chosenAddress,
    tempPostcode,
    isVisible: state.boxSummaryShow.get('show', false),
    shouldDisplayFullScreenBoxSummary: getFullScreenBoxSummary(state),
  }
}

const PostcodeContainer = connect(mapStateToProps, {
  basketRestorePreviousValues: actions.basketRestorePreviousValues,
  basketChosenAddressChange: actions.basketChosenAddressChange,
  setTempPostcode: (postcode) => actions.temp('postcode', postcode),
  boxSummaryNext,
})(Postcode)

export { PostcodeContainer }
