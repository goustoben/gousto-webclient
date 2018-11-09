import { connect } from 'react-redux'
import OrderRestoreButton from './OrderRestoreButton'
import actionTypes from 'actions/actionTypes'

function mapStateToProps(state, ownProps) {
  const error = state.error.get(actionTypes.PROJECTED_ORDER_RESTORE, null)

  return {
    projectedOrderRestoreError: error && error.orderId === ownProps.orderId,
  }
}

const OrderRestoreButtonContainer = connect(mapStateToProps, {})(OrderRestoreButton)

export default OrderRestoreButtonContainer
