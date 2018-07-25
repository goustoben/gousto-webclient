import { connect } from 'react-redux'
import CheckoutButton from './CheckoutButton'
import { getSlot } from 'utils/deliveries'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable'

function getCoreSlotId(deliveryDays, date, slotId) {
	const slot = getSlot(deliveryDays, date, slotId)
	let coreSlotId = ''
	if (slot) {
		coreSlotId = slot.get('coreSlotId', '')
	}

	return coreSlotId
}

function mapStateToProps(state) {
	const basket = state.basket

	return {
		recipes: basket.get('recipes'),
		numPortions: basket.get('numPortions'),
		promoCode: basket.get('promoCode'),
		postcode: basket.get('postcode'),
		orderId: basket.get('orderId'),
		slotId: getCoreSlotId(state.boxSummaryDeliveryDays, basket.get('date'), basket.get('slotId')),
		deliveryDayId: state.boxSummaryDeliveryDays.getIn([basket.get('date'), 'coreDayId']),
		addressId: state.basket.getIn(['address', 'id'], ''),
		userOrders: state.user.get('orders', Immutable.List([])),  // eslint-disable-line new-cap
		orderSaveError: state.error.get(actionTypes.ORDER_SAVE, null),
		isAuthenticated: state.auth.get('isAuthenticated'),
	}
}

const CheckoutButtonContainer = connect(mapStateToProps, {
	basketCheckedOut: actions.basketCheckedOut,
	boxSummaryVisibilityChange: actions.boxSummaryVisibilityChange,
	basketProceedToCheckout: actions.basketProceedToCheckout,
	orderUpdate: actions.orderUpdate,
})(CheckoutButton)

export default CheckoutButtonContainer
