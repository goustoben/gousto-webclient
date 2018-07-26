import endpoint from 'config/endpoint'
import routes from 'config/routes'
import fetch, * as fetchUtils from 'utils/fetch'

export function applyPromo(accessToken, promoCode) {
	return fetch(accessToken, `${endpoint('core')}/user/current/applyPromotionCode/${promoCode}`, {}, 'POST')
}

export function fetchPromo(accessToken) {
	return fetch(accessToken, `${endpoint('core')}${routes.core.userPromo}`, {}, 'GET')
}

export function fetchUser(accessToken) {
	return fetch(accessToken, `${endpoint('core')}${routes.core.currentUser}`, {}, 'GET')
}

export function fetchShippingAddresses(accessToken) {
	return fetch(accessToken, `${endpoint('core')}${routes.core.userAddress}`, { type: 'shipping' }, 'GET')
}

export function fetchUserOrders(accessToken, reqData) {
	return fetch(accessToken, `${endpoint('core')}${routes.core.userOrders}`, reqData, 'GET')
}

export function fetchUserOrdersNew(accessToken, reqData) {
	return fetch(accessToken, `${endpoint('orders', routes.version.orders)}/customers/${reqData.userId}/orders/`, reqData, 'GET')
}

export function fetchUserProjectedDeliveries(accessToken) {
	return fetchUtils.fetch(accessToken, `${endpoint('core')}${routes.core.userProjectedDeliveries}`, {}, 'GET')
}

export function saveUserOrder(accessToken, reqData) {
	return fetch(accessToken, `${endpoint('core')}${routes.core.userOrder}`, reqData, 'POST')
}

export function updateUserOrder(accessToken, reqData) {
	return fetchUtils.fetch(accessToken, `${endpoint('core')}${routes.core.userOrder}`, reqData, 'PUT')
}

export function skipDelivery(accessToken, deliveryDayId) {
	return fetchUtils.fetch(accessToken, `${endpoint('core')}${routes.core.userDelivery}/disable`, {
		delivery_day_id: deliveryDayId,
	}, 'PUT')
}

export function restoreDelivery(accessToken, userId, deliveryDayId) {
	return fetchUtils.fetch(accessToken, `${endpoint('core')}${routes.core.user}/${userId}/subscription/delivery/enable`, {
		delivery_day_id: deliveryDayId,
	}, 'PUT')
}

export function reactivate(accessToken, reqData) {
	return fetch(accessToken, `${endpoint('core')}/user/${reqData.userId}/restore`, {}, 'PUT')
}

export function verifyAge(accessToken, userId) {
	return fetch(accessToken, `${endpoint('core')}/user/${userId}`, { age_verified: 1 }, 'PUT')
}

export function userRateCount(accessToken, reqData) {
	return fetch(accessToken, `${endpoint('core')}${routes.core.rateCount}`, reqData, 'GET')
}

export function checkDuplicateUser(reqData) {
	return fetch(null, `${endpoint('core')}/user/check-duplicate`, reqData, 'POST')
}

export function addPaymentMethod(accessToken, reqData, userId) {
	return fetch(accessToken, `${endpoint('core')}/user/${userId}/paymentMethod`, reqData, 'PUT')
}

export function fetchUserAddresses(accessToken, userId) {
	return fetchUtils.fetch(accessToken, `${endpoint('customers', routes.version.customers)}/customers/${userId}/addresses`, {}, 'GET')
}

export function addNewAddress(accessToken, userId, reqData) {
	return fetchUtils.fetch(accessToken, `${endpoint('customers', routes.version.customers)}/customers/${userId}/addresses`, reqData, 'POST')
}

export function deleteMarketingSubscription(authUserId, marketingType, marketingUnsubscribeToken) {
	return fetchUtils.fetch(
		null,
		`${endpoint('core')}/user/${authUserId}/marketing/${marketingType}`,
		{ marketing_unsubscribe_token: marketingUnsubscribeToken },
		'DELETE'
	)
}
