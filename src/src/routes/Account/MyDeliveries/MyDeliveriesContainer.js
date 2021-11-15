import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { getUserId } from 'selectors/user'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import { signupSetGoustoOnDemandEnabled } from 'actions/signup/signupSetGoustoOnDemandEnabled'
import { userLoadAddresses } from 'actions/user/userLoadAddresses'
import { userLoadNewOrders } from 'actions/user/userLoadNewOrders'
import { userLoadData } from 'actions/user/userLoadData'
import MyDeliveries from './MyDeliveries'

const mapStateToProps = (state) => ({
  isFetchingOrders: state.pending.get(actionTypes.USER_LOAD_ORDERS, true) || state.pending.get(actionTypes.USER_LOAD_PROJECTED_DELIVERIES, true),
  didErrorFetchingPendingOrders: state.error.get(actionTypes.USER_LOAD_ORDERS, null),
  didErrorFetchingProjectedOrders: state.error.get(actionTypes.USER_LOAD_PROJECTED_DELIVERIES, null),
  didErrorFetchingAddresses: state.error.get(actionTypes.USER_LOAD_ADDRESSES, null),
  userId: getUserId(state),
  isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
})

const MyDeliveriesContainer = connect(mapStateToProps, {
  userLoadAddresses,
  userLoadNewOrders,
  userLoadData,
  signupSetGoustoOnDemandEnabled,
})(MyDeliveries)

export default MyDeliveriesContainer
