import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import actions from 'actions/user'
import MyDeliveries from './MyDeliveries'

const mapStateToProps = (state) => ({
  isFetchingOrders: state.pending.get(actionTypes.USER_LOAD_ORDERS, true) || state.pending.get(actionTypes.USER_LOAD_PROJECTED_DELIVERIES, true),
  didErrorFetchingPendingOrders: state.error.get(actionTypes.USER_LOAD_ORDERS, null),
  didErrorFetchingProjectedOrders: state.error.get(actionTypes.USER_LOAD_PROJECTED_DELIVERIES, null),
  didErrorFetchingAddresses: state.error.get(actionTypes.USER_LOAD_ADDRESSES, null),
})

const MyDeliveriesContainer = connect(mapStateToProps, {
  userLoadAddresses: actions.userLoadAddresses,
  userLoadNewOrders: actions.userLoadNewOrders,
})(MyDeliveries)

export default MyDeliveriesContainer
