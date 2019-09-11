import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import NewAddressForm from './NewAddressForm'

const mapStateToProps = (state) => ({
  addresses: state.craftyClicksAddresses.get('craftyClicksAddresses'),
  fullAddress: state.craftyClicksAddresses.get('craftyClicksFullAddress'),
  fullAddressId: state.craftyClicksAddresses.get('craftyClicksFullAddressId'),
  isPosting: state.pending.get(actionTypes.USER_POST_NEW_ADDRESS),
  isFetchingAddresses: state.pending.get(actionTypes.MODAL_ADDRESSES_RECEIVE),
  modalOrderId: state.user.getIn(['deliveryAddressModal', 'orderId']),
  addressesFetchError: state.error.get(actionTypes.MODAL_ADDRESSES_RECEIVE),
  addressFetchError: state.error.get(actionTypes.MODAL_FULL_ADDRESSES_RECEIVE),
  newAddressPostError: state.error.get(actionTypes.USER_POST_NEW_ADDRESS),
})

export default connect(mapStateToProps, {
})(NewAddressForm)
