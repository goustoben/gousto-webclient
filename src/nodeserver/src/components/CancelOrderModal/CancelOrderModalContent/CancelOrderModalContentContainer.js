import { connect } from 'react-redux'
import CancelOrderModalContent from './CancelOrderModalContent'
import actions from 'actions/order'
import actionTypes from 'actions/actionTypes'

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
