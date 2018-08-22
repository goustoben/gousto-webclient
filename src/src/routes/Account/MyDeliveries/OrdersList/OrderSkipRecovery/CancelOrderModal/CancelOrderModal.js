import React, { PropTypes } from 'react'

import css from '../OrderSkipRecovery.css'
import ModalComponent, { ModalContent, ModalFooter } from 'ModalComponent'

const skipCancelOrder = (type, dayId, orderId, cancelOrder, skipOrder) => {
	if (type === 'pending') {
		cancelOrder(orderId)
	} else {
		skipOrder(dayId)
	}
}

const CancelOrderModal = ({ visible, orderId, dayId, type, keepOrder, cancelPendingOrder, cancelProjectedOrder }) => (
		<ModalComponent visible={visible}>
				<ModalContent>
						<div className={css.orderSkipRecoveryMessage}>Are you sure you want to {(type === 'pending') ? 'cancel' : 'skip'}?</div>
				</ModalContent>
				<ModalFooter>
					<button
						className={css.keepButton}
						onClick={() => keepOrder({ orderId, status: type })}
					>Keep Box</button>
					<div className={css.skipAnyWay} onClick={() => skipCancelOrder(type, dayId, orderId, cancelPendingOrder, cancelProjectedOrder)}>
						{type === 'pending' ? 'Cancel' : 'Skip'} anyway
					</div>
				</ModalFooter>
		</ModalComponent>
)

CancelOrderModal.propTypes = {
		visible: PropTypes.bool,
		orderId: PropTypes.string,
		dayId: PropTypes.string,
		type: PropTypes.string,
		keepOrder: PropTypes.func,
		cancelOrder: PropTypes.func,
		skipOrder: PropTypes.func,
}

export { CancelOrderModal }
