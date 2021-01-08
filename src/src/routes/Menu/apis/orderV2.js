import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'
const version = routes.version.ordersV2

export function getOrder(accessToken, orderId, include, sessionId, userId) {
  const reqData = {
    include
  }

  const headers = {
    'Content-Type': 'application/json',
    'x-gousto-device-id': sessionId,
    'x-gousto-user-id': userId,
  }

  return fetch(accessToken, `${endpoint('order', version)}/orders/${orderId}`, reqData, 'GET', headers)
}

export function getUserOrders(accessToken, userId, sessionId, phases, include, limit = 15, sort = 'deliveryDate') {
  const headers = {
    'Content-Type': 'application/json',
    'x-gousto-device-id': sessionId,
    'x-gousto-user-id': userId,
  }

  const reqData = {
    'filter[phase]': phases,
    include,
    'page[limit]': limit,
    sort,
  }

  return fetch(accessToken, `${endpoint('order', version)}/users/${userId}/orders`, reqData, 'GET', headers)
}

export function createOrder(orderDetails) {
  const {accessToken, sessionId, userId, deliveryDayId, deliverySlotId, components, shippingAddressId, deliverySlotLeadTimeId} = orderDetails

  const headers = {
    'Content-Type': 'application/json',
    'x-gousto-device-id': sessionId,
    'x-gousto-user-id': userId
  }

  let shippingAddress = {}
  let deliverySlotLeadTime = {}

  if (shippingAddressId) {
    shippingAddress = { shipping_address: {
      data: {
        type: 'shipping-address',
        id: shippingAddressId
      }
    }}
  }

  if (deliverySlotLeadTimeId) {
    deliverySlotLeadTime = { delivery_slot_lead_time: {
      data: {
        type: 'delivery-slot-lead-time',
        id: deliverySlotLeadTimeId
      }
    }}
  }

  const order = {
    data: {
      attributes: {
        delivery_day_id: deliveryDayId,
      },
      relationships: {
        ...shippingAddress,
        delivery_slot: {
          data: {
            type: 'delivery-slot',
            id: deliverySlotId
          }
        },
        ...deliverySlotLeadTime,
        components: {
          data: components
        }
      }
    }
  }

  return fetch(accessToken, `${endpoint('order', version)}/orders`, order, 'POST', headers)
}

export function deleteOrder(accessToken, orderId, sessionId, userId) {
  const headers = {
    'Content-Type': 'application/json',
    'x-gousto-device-id': sessionId,
    'x-gousto-user-id': userId
  }

  return fetch(accessToken, `${endpoint('order', version)}/orders/${orderId}`, 'DELETE', headers)
}
