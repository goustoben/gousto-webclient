import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { projectedOrderRestore } from 'actions/order'
import OrderRestoreButton from './OrderRestoreButton'

function mapStateToProps(state, ownProps) {
  const error = state.error.get(actionTypes.PROJECTED_ORDER_RESTORE, null)

  return {
    projectedOrderRestoreError: error && error.orderId === ownProps.orderId,
    pending: state.pending.get(actionTypes.PROJECTED_ORDER_RESTORE),
    osrOrderId: state.temp.get('osrOrderId')
  }
}

const OrderRestoreButtonContainer = connect(mapStateToProps, {
  projectedOrderRestore,
})(OrderRestoreButton)

export default OrderRestoreButtonContainer
