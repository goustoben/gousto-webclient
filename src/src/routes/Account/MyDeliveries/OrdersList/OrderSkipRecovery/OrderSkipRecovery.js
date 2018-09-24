import React, { PropTypes } from 'react'

import ModalComponent, { ModalContent, ModalTitle } from 'ModalComponent'

import css from './OrderSkipRecovery.css'

import Title from './Title'
import Offer from './Offer'
import ValueProposition from './ValueProposition'
import Header from './Header'
import Footer from './Footer'

const propTypes = {
	visible: PropTypes.bool,
	orderId: PropTypes.string,
	dayId: PropTypes.string,
	orderType: PropTypes.string,
	featureFlag: PropTypes.bool,
	keepOrder: PropTypes.func.isRequired,
	cancelPendingOrder: PropTypes.func.isRequired,
	cancelProjectedOrder: PropTypes.func.isRequired,
	title: PropTypes.string,
	offer: PropTypes.object,
	valueProposition: PropTypes.shape({
		message: PropTypes.string,
		title: PropTypes.string,
	}),
	callToActions: PropTypes.shape({
		confirm: PropTypes.string,
		keep: PropTypes.string,
	})
}

class OrderSkipRecovery extends React.PureComponent {

	componentDidUpdate(prevProps) {
		const { triggered, orderId, orderDate, dayId, orderType, getSkipRecoveryContent } = this.props
		const actionTriggered = (orderType === 'pending') ? 'Cancel' : 'Skip'

		if (triggered && (prevProps.triggered !== triggered)) {

			getSkipRecoveryContent({
				orderId,
				orderDate,
				dayId,
				orderType,
				actionTriggered,
			})
		}
	}

	skipCancelOrder(orderId, dayId, orderType, cancelPendingOrder, cancelProjectedOrder) {
		if (orderType === 'pending') {
			cancelPendingOrder(orderId)
		} else {
			cancelProjectedOrder(dayId)
		}
	}

	render() {
		const { visible, dayId, orderId, orderType, featureFlag, keepOrder, cancelPendingOrder, cancelProjectedOrder, title, offer, valueProposition, callToActions } = this.props
		const onClickKeepOrder = () => keepOrder({ orderId, status: orderType })
		const onClickSkipCancel = () => this.skipCancelOrder(orderId, dayId, orderType, cancelPendingOrder, cancelProjectedOrder)

		return (
			<ModalComponent visible={visible}>
				<Header offer={offer} featureFlag={featureFlag} />
				<div className={css.container}>
					<ModalTitle>
						<Title title={title} orderType={orderType} />
					</ModalTitle>
					{(featureFlag) && (
						<ModalContent>
							<Offer offer={offer} />
							{(offer && valueProposition) ? <hr className={css.rule} /> : null}
							<ValueProposition valueProposition={valueProposition} />
						</ModalContent>
					)}
					<Footer orderType={orderType} callToActions={callToActions} onClickKeepOrder={onClickKeepOrder} onClickSkipCancel={onClickSkipCancel} />
				</div>
			</ModalComponent>
		)
	}
}

OrderSkipRecovery.propTypes = propTypes

export { OrderSkipRecovery }
