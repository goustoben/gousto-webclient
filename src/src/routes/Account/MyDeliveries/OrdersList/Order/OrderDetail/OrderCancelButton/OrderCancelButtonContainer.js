import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import OrderCancelButton from './OrderCancelButton'
import { orderCancelStart } from "actions/onScreenRecovery/orderCancelStart"
import { projectedOrderCancel } from "actions/order/projectedOrderCancel"
import { cancelOrderModalToggleVisibility } from "actions/order/cancelOrderModalToggleVisibility"
import { orderCancel } from "actions/order/orderCancel"

function mapStateToProps(state, ownProps) {
  const error = state.error.get(actionTypes.PROJECTED_ORDER_CANCEL, null)

  return {
    didCancelProjectedError: error && error.orderId === ownProps.orderId,
    contentPending: state.pending.get(actionTypes.ORDER_SKIP_RECOVERY_TRIGGERED),
    osrDeliveryDayId: state.onScreenRecovery.get('deliveryDayId'),
    osrOrderId: state.onScreenRecovery.get('orderId')
  }
}

const OrderCancelButtonContainer = connect(mapStateToProps, {
  projectedOrderCancel,
  cancelOrderModalToggleVisibility,
  orderCancel,
  orderCancelStart,
})(OrderCancelButton)

export default OrderCancelButtonContainer
