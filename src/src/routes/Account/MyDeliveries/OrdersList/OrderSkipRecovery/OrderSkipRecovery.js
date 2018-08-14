import React, { PropTypes } from 'react'

import CancelPendingOrderModal from './CancelPendingOrderModal'

// Switch between the modals for skip recovery
const OrderSkipRecovery = ({ visible, orderId, keepOrder, cancelOrder }) => (
	<CancelPendingOrderModal
		visible={visible}
		orderId={orderId}
		keepOrder={keepOrder}
		cancelOrder={cancelOrder}
	/>
)

OrderSkipRecovery.propTypes = {
	visible: PropTypes.bool,
	orderId: PropTypes.string,
	keepOrder: PropTypes.func,
	cancelOrder: PropTypes.func,
}

export default OrderSkipRecovery
