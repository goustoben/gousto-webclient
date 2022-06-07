import { fetch } from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

/** @deprecated use orderV2.fetchOrder instead */
export function fetchOrder(accessToken, orderId, reqData = {}) {
  return fetch(accessToken, `${endpoint('core')}/order/${orderId}`, reqData, 'GET', undefined, {
    'Content-Type': 'application/json',
  })
}

/** @deprecated use orderV2.createOrder instead */
export function createPreviewOrder(reqData = {}) {
  return fetch(null, `${endpoint('core')}${routes.core.orderPreview}`, reqData, 'POST')
}

/** @deprecated use orderV2.updateOrder instead */
export function updateOrderItems(accessToken, orderId, reqData = {}) {
  return fetch(accessToken, `${endpoint('core')}/order/${orderId}/update-items`, reqData, 'PUT', undefined, {
    'Content-Type': 'application/json',
  })
}

/** @deprecated use orderV2.createOrder instead */
export function saveOrder(accessToken, orderId, reqData) {
  return fetch(accessToken, `${endpoint('core')}/order/${orderId}`, reqData, 'PUT', undefined, {
    'Content-Type': 'application/json',
  })
}

/** @deprecated use orderV2.cancelPendingOrders instead */
export function cancelExistingOrders(accessToken, reqData = {}) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.cancelPending}`, reqData, 'POST')
}

/** @deprecated use orderV2.updateOrder instead */
export function updateOrderAddress(accessToken, orderId, addressId) {
  return fetch(accessToken, `${endpoint('core')}/order/${orderId}/change-address/`, { address_id: addressId }, 'PUT', undefined, {
    'Content-Type': 'application/json',
  })
}
