import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import CancelOrderModalContent from './CancelOrderModalContent'
import { orderCancel } from "actions/order/orderCancel"
import { cancelOrderModalToggleVisibility } from "actions/order/cancelOrderModalToggleVisibility"

const mapStateToProps = (state) => {
  const orderId = state.orderCancelledModalVisibility.get('orderId')
  const error = state.error.get(actionTypes.ORDER_CANCEL, null)

  return {
    orderId,
    didCancelOrderError: error && error.orderId === orderId,
  }
}

export default connect(mapStateToProps, {
  orderCancel,
  cancelOrderModalToggleVisibility,
})(CancelOrderModalContent)
