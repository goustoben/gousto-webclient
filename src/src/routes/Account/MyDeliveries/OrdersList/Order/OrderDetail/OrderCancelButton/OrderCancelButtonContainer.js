import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import actions from 'actions/order'
import { orderCancelStart } from 'actions/onScreenRecovery'
import OrderCancelButton from './OrderCancelButton'

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
  projectedOrderCancel: actions.projectedOrderCancel,
  cancelOrderModalToggleVisibility: actions.cancelOrderModalToggleVisibility,
  orderCancel: actions.orderCancel,
  orderCancelStart,
})(OrderCancelButton)

export default OrderCancelButtonContainer
