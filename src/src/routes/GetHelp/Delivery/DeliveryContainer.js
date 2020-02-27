import { connect } from 'react-redux'
import userActions, { userLoadOrderTrackingInfo } from 'actions/user'
import { getUserOrders } from 'selectors/user'
import {
  trackDeliveryOther,
  trackDeliveryStatus,
  trackNextBoxTrackingClick,
} from '../actions/getHelp'
import { Delivery } from './Delivery'

function mapStateToProps(state) {
  return {
    nextOrderTracking: state.user.get('nextOrderTracking'),
    orders: getUserOrders(state),
  }
}

const DeliveryContainer = connect(mapStateToProps, {
  loadOrderTrackingInfo: userLoadOrderTrackingInfo,
  trackDeliveryOther,
  trackDeliveryStatus,
  trackNextBoxTrackingClick,
  userLoadOrders: userActions.userLoadOrders,
})(Delivery)

export {
  DeliveryContainer
}
