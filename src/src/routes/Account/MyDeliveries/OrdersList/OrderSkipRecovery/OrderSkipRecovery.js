import React, { PropTypes } from 'react'

import { CancelOrderModal } from './CancelOrderModal'

// Switch between the modals for skip recovery
const OrderSkipRecovery = ({ visible, orderId, dayId, orderType, boxNumber, skipRecovery, keepOrder, cancelPendingOrder, cancelProjectedOrder }) => (
	<CancelOrderModal
		visible={visible}
		orderId={orderId}
		dayId={dayId}
		boxNumber={boxNumber}
		type={orderType}
		skipRecovery={skipRecovery}
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
	boxNumber: PropTypes.number,
	skipRecovery: PropTypes.bool,
	keepOrder: PropTypes.func,
	cancelPendingOrder: PropTypes.func,
	cancelProjectedOrder: PropTypes.func,
}

export { OrderSkipRecovery }
