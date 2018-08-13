import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

export function fetchOrder(accessToken, orderId, reqData = {}) {
	return fetch(accessToken, `${endpoint('core')}/order/${orderId}`, reqData, 'GET')
}

export function createPreviewOrder(reqData = {}) {
	return fetch(null, `${endpoint('core')}${routes.core.orderPreview}`, reqData, 'POST')
}

export function updateOrderItems(accessToken, orderId, reqData = {}) {
	return fetch(accessToken, `${endpoint('core')}/order/${orderId}/update-items`, reqData, 'PUT')
}

export function saveOrder(accessToken, orderId, reqData) {
	return fetch(accessToken, `${endpoint('core')}/order/${orderId}`, reqData, 'PUT')
}

export function cancelOrder(accessToken, orderId, reqData = {}) {
	return fetch(accessToken, `${endpoint('core')}/order/${orderId}`, reqData, 'DELETE')
}

export function cancelExistingOrders(accessToken, reqData = {}) {
	return fetch(accessToken, `${endpoint('core')}${routes.core.cancelPending}`, reqData, 'POST')
}

export function updateOrderAddress(accessToken, orderId, addressId) {
	return fetch(accessToken, `${endpoint('core')}/order/${orderId}/change-address/`, { address_id: addressId }, 'PUT')
}

export default {
	fetchOrder,
	updateOrderItems,
	saveOrder,
	cancelOrder,
	cancelExistingOrders,
	updateOrderAddress,
}
