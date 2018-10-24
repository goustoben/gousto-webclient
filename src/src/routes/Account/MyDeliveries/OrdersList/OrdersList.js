import PropTypes from 'prop-types'
import React from 'react'
import Order from './Order'
import NoOrders from './NoOrders'
import NewAddressModal from './NewAddressModal'
import CancelledAllBoxesModal from './CancelledAllBoxesModal'
import Immutable from 'immutable' // eslint-disable no-caps

const OrdersList = ({ orders, recipes, boxType }) => (
	<div>
		<NewAddressModal />
		<CancelledAllBoxesModal />
		{orders.size < 1 ? <NoOrders recipes={recipes} boxType={boxType} /> : null}
		{orders.toList().map((order) => (
			<div key={order.get('id')}>
				<Order order={order} />
			</div>
		))}
	</div>
)

OrdersList.propTypes = {
	orders: PropTypes.instanceOf(Immutable.Map),
	recipes: PropTypes.instanceOf(Immutable.List),
	boxType: PropTypes.string,
}
OrdersList.defaultProps = {
	orders: Immutable.fromJS({}),
	recipes: Immutable.fromJS([]),
	boxType: '',
}

export default OrdersList
