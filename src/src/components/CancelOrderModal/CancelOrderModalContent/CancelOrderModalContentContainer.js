import { connect } from 'react-redux'
import actions from 'actions/order'
import actionTypes from 'actions/actionTypes'
import CancelOrderModalContent from './CancelOrderModalContent'

const mapStateToProps = (state) => {
  const orderId = state.orderCancelledModalVisibility.get('orderId')
  const error = state.error.get(actionTypes.ORDER_CANCEL, null)

  return {
    orderId,
    didCancelOrderError: error && error.orderId === orderId,
  }
}

export default connect(mapStateToProps, {
  orderCancel: actions.orderCancel,
  cancelOrderModalToggleVisibility: actions.cancelOrderModalToggleVisibility,
})(CancelOrderModalContent)
