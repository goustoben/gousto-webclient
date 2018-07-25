import actionTypes from 'actions/actionTypes'

const boxSummaryViews = {
	POSTCODE: 'POSTCODE',
	DELIVERY_SLOT: 'DELIVERY_SLOT',
	DETAILS: 'DETAILS',
}

function getCurrentBoxSummaryView(state) {
	const postcode = state.basket.get('postcode')
	const deliveryDaysError = Boolean(state.error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE))
	const postcodePending = state.basket.get('postcodePending')
	const slotId = state.basket.get('slotId')
	const orderId = state.basket.get('orderId')
	const menuPending = state.menuRecieveMenuPending || state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE, false) || state.pending.get(actionTypes.MENU_FETCH_DATA, false)

	const showPostcode = (!postcode || deliveryDaysError || postcodePending) && !orderId

	const showDeliverySlot = ((!showPostcode && !slotId) || menuPending) && !orderId

	const showDetailsView = !showPostcode && !showDeliverySlot

	let currentView

	if (showPostcode) {
		currentView = boxSummaryViews.POSTCODE
	} else if (showDeliverySlot) {
		currentView = boxSummaryViews.DELIVERY_SLOT
	} else if (showDetailsView) {
		currentView = boxSummaryViews.DETAILS
	}

	return currentView
}

export { boxSummaryViews, getCurrentBoxSummaryView }
