import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Immutable from 'immutable'
import ModalPanel from 'Modal/ModalPanel'
import Button from 'Button'
import Overlay from 'Overlay'
import timeFormat from 'utils/timeFormat'
import Link from 'Link'
import css from './CancelledAllBoxesModal.css'

const CancelledAllBoxesModal = ({
	isModalOpen,
	pendingOrdersDates,
	toggleModalVisibility,
}) => {
	const closeModal = () => {
		toggleModalVisibility(false)
	}

	return (
		<Overlay open={Boolean(isModalOpen)} from="top">
			<ModalPanel closePortal={() => closeModal()} disableClickOutside disableOverlay className={css.modal}>
				<div className={css.body}>
					<h2 className={css.modalTitle}>Manage your subscription</h2>
					<div className={css.modalBodyText}>
						We noticed you've cancelled all your upcoming boxes, so want to double-check: Would you like to pause for now or keep your subscription active?
						<ul className={css.pendingOrders}>
							{pendingOrdersDates.entrySeq().toJS().map(([orderId, pendingOrderDate]) => (
								<li key={orderId}>We'll deliver your box on {timeFormat(pendingOrderDate, 'dayAndMonth')} as requested</li>
							))}
						</ul>
					</div>
					<div className={css.bottom}>
						<Button color="negative" onClick={() => closeModal()} className={css.firstButton}>
							Keep subscription active
						</Button>
						<Link to={'/my-subscription'} clientRouted={false}>
							<Button color="primary" noDecoration className={css.secondButton}>
								Pause subscription
							</Button>
						</Link>
					</div>
				</div>
			</ModalPanel>
		</Overlay>
	)
}

CancelledAllBoxesModal.propTypes = {
	isModalOpen: PropTypes.bool,
	pendingOrdersDates: ImmutablePropTypes.mapOf(PropTypes.string),
	toggleModalVisibility: PropTypes.func,
}

CancelledAllBoxesModal.defaultProps = {
	isModalOpen: false,
	pendingOrdersDates: Immutable.Map({}),
	toggleModalVisibility: () => {},
}

export default CancelledAllBoxesModal
