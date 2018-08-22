import React, { PropTypes } from 'react'

import css from '../OrderSkipRecovery.css'
import ModalComponent, { ModalTitle, ModalContent, ModalFooter } from 'ModalComponent'

const skipCancelOrder = (type, dayId, orderId, cancelOrder, skipOrder) => {
	if (type === 'pending') {
		cancelOrder(orderId)
	} else {
		skipOrder(dayId)
	}
}

class CancelOrderModal extends React.PureComponent {
	render() {
		const { visible, orderId, dayId, type, boxNumber, skipRecovery, keepOrder, cancelPendingOrder, cancelProjectedOrder } = this.props

		return (
			<ModalComponent visible={visible}>
				<ModalTitle>
					<div className={css.orderSkipRecoveryMessage}>Are you sure you want to {(type === 'pending') ? 'cancel' : 'skip'}?</div>
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
						onClick={() => keepOrder({ orderId, status: type })}
					>Keep Box</button>
					<div className={css.skipAnyWay} onClick={() => skipCancelOrder(type, dayId, orderId, cancelPendingOrder, cancelProjectedOrder)}>
						{type === 'pending' ? 'Cancel' : 'Skip'} anyway
					</div>
				</ModalFooter>
			</ModalComponent>
		)
	}
}

CancelOrderModal.propTypes = {
	visible: PropTypes.bool,
	orderId: PropTypes.string,
	dayId: PropTypes.string,
	type: PropTypes.string,
	boxNumber: PropTypes.number,
	skipRecovery: PropTypes.bool,
	keepOrder: PropTypes.func,
	cancelOrder: PropTypes.func,
	skipOrder: PropTypes.func,
}

export { CancelOrderModal }
