import React, { PropTypes } from 'react'

import css from './OrderSkipRecovery.css'
import ModalComponent, { ModalTitle, ModalContent, ModalFooter } from 'ModalComponent'

const skipCancelOrder = (orderId, dayId, orderType, cancelPendingOrder, cancelProjectedOrder) => {

	if (orderType === 'pending') {
		cancelPendingOrder(orderId)
	} else {
		cancelProjectedOrder(dayId)
	}
}

const OrderSkipRecovery = ({ visible, dayId, orderId, orderType, boxNumber, skipRecovery, keepOrder, cancelPendingOrder, cancelProjectedOrder }) => (
	<ModalComponent visible={visible}>
		<ModalTitle>
			<div className={css.orderSkipRecoveryMessage}>Are you sure you want to {(orderType === 'pending') ? 'cancel' : 'skip'}?</div>
		</ModalTitle>
		{(boxNumber < 10 && skipRecovery) &&
			<ModalContent>
				<div className={css.valuePropositionTitle}>Not in on your delivery date?</div>
				<div className={css.valuePropositionDescription}>Change your delivery day easily for any box you can choose recipes for.</div>
			</ModalContent>
		}
		<ModalFooter>
			<button
				className={css.keepButton}
				onClick={() => keepOrder({ orderId, status: orderType })}
			>Keep Box</button>
			<div className={css.skipAnyWay} onClick={() => skipCancelOrder(orderId, dayId, orderType, cancelPendingOrder, cancelProjectedOrder)}>
				{orderType === 'pending' ? 'Cancel' : 'Skip'} anyway
					</div>
		</ModalFooter>
	</ModalComponent>
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
