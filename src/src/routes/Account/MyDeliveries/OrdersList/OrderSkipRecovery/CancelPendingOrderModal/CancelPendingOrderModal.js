import React, { PropTypes } from 'react'

import css from '../OrderSkipRecovery.css'
import ModalComponent, { ModalContent, ModalFooter } from 'ModalComponent'

const CancelPendingOrderModal = ({ visible, orderId, keepOrder, cancelOrder }) => (
		<ModalComponent visible={visible}>
				<ModalContent>
						<div className={css.orderSkipRecoveryMessage}>Are you sure you want to skip?</div>
				</ModalContent>
				<ModalFooter>
					<button
						className={css.keepButton}
						onClick={() => keepOrder({ orderId, status: 'pending' })}
					>Keep Box</button>
					<div className={css.skipAnyWay} onClick={() => cancelOrder(orderId)}>Skip anyway</div>
				</ModalFooter>
		</ModalComponent>
)

CancelPendingOrderModal.propTypes = {
		visible: PropTypes.bool,
		orderId: PropTypes.string,
		keepOrder: PropTypes.func,
		cancelOrder: PropTypes.func,
}

export default CancelPendingOrderModal
