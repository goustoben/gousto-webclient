import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import OrderCancelButton from './OrderCancelButton'
import actions from 'actions/order'

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
