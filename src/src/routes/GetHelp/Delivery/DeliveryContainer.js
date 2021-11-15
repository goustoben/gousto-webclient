import { connect } from 'react-redux'
import { getUserOrders } from 'selectors/user'
import { getisNewSSRDeliveriesEnabled } from 'selectors/features'
import { Delivery } from './Delivery'
import { userLoadOrderTrackingInfo } from "actions/user/userLoadOrderTrackingInfo"
import { userLoadOrders } from "actions/user/userLoadOrders"
import { trackDeliveryOther } from "routes/GetHelp/actions/getHelp/trackDeliveryOther"
import { trackDeliveryStatus } from "routes/GetHelp/actions/getHelp/trackDeliveryStatus"
import { trackNextBoxTrackingClick } from "routes/GetHelp/actions/getHelp/trackNextBoxTrackingClick"
import { trackSelectDeliveryCategory } from "routes/GetHelp/actions/getHelp/trackSelectDeliveryCategory"

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
  trackSelectDeliveryCategory,
  userLoadOrders,
})(Delivery)

export {
  DeliveryContainer
}
