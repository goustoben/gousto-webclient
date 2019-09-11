import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import actions from 'actions/order'
import OrderCancelButton from './OrderCancelButton'

function mapStateToProps(state, ownProps) {
  const error = state.error.get(actionTypes.PROJECTED_ORDER_CANCEL, null)

  return {
    didCancelProjectedError: error && error.orderId === ownProps.orderId,
  }
}

const OrderCancelButtonContainer = connect(mapStateToProps, {
  projectedOrderCancel: actions.projectedOrderCancel,
  cancelOrderModalToggleVisibility: actions.cancelOrderModalToggleVisibility,
  orderCancel: actions.orderCancel,
})(OrderCancelButton)

export default OrderCancelButtonContainer
