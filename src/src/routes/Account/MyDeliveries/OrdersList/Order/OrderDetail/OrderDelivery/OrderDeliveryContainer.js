import { connect } from 'react-redux'
import OrderDelivery from './OrderDelivery'

function mapStateToProps(state, ownProps) {
	const order = state.user.getIn(['newOrders', ownProps.orderId])
	const shippingAddressId = order.get('shippingAddressId')

	return {
		shippingAddressObj: state.user.getIn(['addresses', shippingAddressId]),
		availableFrom: order.get('availableFrom'),
		availableTo: order.get('availableTo'),
	}
}

const OrderDeliveryContainer = connect(mapStateToProps, {})(OrderDelivery)

export default OrderDeliveryContainer
