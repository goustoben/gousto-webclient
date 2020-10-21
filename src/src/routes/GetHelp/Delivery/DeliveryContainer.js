import { connect } from 'react-redux'
import userActions, { userLoadOrderTrackingInfo } from 'actions/user'
import { getUserOrders } from 'selectors/user'
import { getisNewSSRDeliveriesEnabled } from 'selectors/features'
import {
  trackDeliveryOther,
  trackDeliveryStatus,
  trackNextBoxTrackingClick,
} from '../actions/getHelp'
import { Delivery } from './Delivery'

function mapStateToProps(state) {
  return {
    isNewSSRDeliveriesEnabled: getisNewSSRDeliveriesEnabled(state),
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
