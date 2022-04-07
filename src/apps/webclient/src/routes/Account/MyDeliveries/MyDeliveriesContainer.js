import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import actions from 'actions/user'
import { signupSetGoustoOnDemandEnabled } from 'actions/signup'
import {
  didErrorFetchingPendingOrders,
  didErrorFetchingProjectedOrders,
  getUserId
} from 'selectors/user'
import { getIsGoustoOnDemandEnabled } from 'selectors/features'
import MyDeliveries from './MyDeliveries'

const mapStateToProps = (state) => ({
  isFetchingOrders: state.pending.get(actionTypes.USER_LOAD_ORDERS, true) || state.pending.get(actionTypes.USER_LOAD_PROJECTED_DELIVERIES, true),
  didErrorFetchingPendingOrders: didErrorFetchingPendingOrders(state),
  didErrorFetchingProjectedOrders: didErrorFetchingProjectedOrders(state),
  userId: getUserId(state),
  isGoustoOnDemandEnabled: getIsGoustoOnDemandEnabled(state),
})

const MyDeliveriesContainer = connect(mapStateToProps, {
  userLoadAddresses: actions.userLoadAddresses,
  userLoadNewOrders: actions.userLoadNewOrders,
  userLoadData: actions.userLoadData,
  signupSetGoustoOnDemandEnabled,
})(MyDeliveries)

export default MyDeliveriesContainer
