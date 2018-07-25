import React from 'react'
import Immutable from 'immutable' /* eslint-disable new-cap */
import ModalPanel from 'Modal/ModalPanel'
import moment from 'moment'
import Button from 'Button'
import css from './DuplicateOrderModal.css'
import Order from './Order'

const renderOrders = (closeOrders) => {
	const ordersRendered = []
	closeOrders.forEach((order, orderId) => {
		ordersRendered.push(
			<div key={orderId}>
				<Order
					id={orderId}
					date={moment(order.get('deliveryDate')).format('dddd, Do MMMM')}
					numPeople={order.getIn(['box', 'numPeople'])}
					numRecipes={order.getIn(['box', 'numRecipes'])}
				/>
			</div>
		)
	})

	return ordersRendered
}

const DuplicateOrderModal = ({ closeOrders = Immutable.Map([]), close }) => (
	<ModalPanel closePortal={close} disableOverlay>
		<div className={css.body}>
			<h2>Your Upcoming Deliveries</h2>
			<div>
				You currently have one box being delivered soon after another. We just want to make sure this is right.
			</div>
			<div>{renderOrders(closeOrders)}</div>
			<div className={css.bottom}>
				<a href="/my-deliveries" className={css.link}>Edit my orders</a>
				<Button onClick={close}>
					{`Yes, I want ${closeOrders.size} boxes`}
				</Button>
			</div>
		</div>
	</ModalPanel>
)

DuplicateOrderModal.propTypes = {
	closeOrders: React.PropTypes.instanceOf(Immutable.Map),
	close: React.PropTypes.func,
}

export default DuplicateOrderModal
