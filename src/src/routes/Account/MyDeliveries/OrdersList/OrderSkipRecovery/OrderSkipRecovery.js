import React, { PropTypes } from 'react'

import { CancelOrderModal } from './CancelOrderModal'

// Switch between the modals for skip recovery
const OrderSkipRecovery = ({ visible, orderId, dayId, orderType, keepOrder, cancelPendingOrder, cancelProjectedOrder }) => (
	<CancelOrderModal
		visible={visible}
		orderId={orderId}
		dayId={dayId}
		type={orderType}
		keepOrder={keepOrder}
		cancelPendingOrder={cancelPendingOrder}
		cancelProjectedOrder={cancelProjectedOrder}
	/>
)

OrderSkipRecovery.propTypes = {
	visible: PropTypes.bool,
	orderId: PropTypes.string,
	dayId: PropTypes.string,
	orderType: PropTypes.string,
	keepOrder: PropTypes.func,
	cancelPendingOrder: PropTypes.func,
	cancelProjectedOrder: PropTypes.func,
}

export { OrderSkipRecovery }
