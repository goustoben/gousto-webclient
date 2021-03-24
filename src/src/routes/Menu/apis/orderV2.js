import fetch, {
  cacheDefault,
  timeoutDefault,
  includeCookiesDefault,
  useMenuServiceDefault,
} from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const version = routes.version.ordersV2

export const createOrder = async (accessToken, order, sessionId, userId) => {
  const headers = {
    'Content-Type': 'application/json',
    'x-gousto-device-id': sessionId,
    'x-gousto-user-id': userId
  }

  const response = await fetch(accessToken, `${endpoint('order', version)}/orders`, { data: order }, 'POST', cacheDefault, headers)

  const { data: { data: orderResponse } } = response

  return orderResponse
}

export const updateOrder = (accessToken, orderId, order, sessionId, userId) => {
  const headers = {
    'Content-Type': 'application/json',
    'x-gousto-device-id': sessionId,
    'x-gousto-user-id': userId
  }
  const useOverwriteRequestMethod = false

  return fetch(
    accessToken,
    `${endpoint('order', version)}/orders/${orderId}`,
    { data: order },
    'PUT',
    cacheDefault,
    headers,
    timeoutDefault,
    includeCookiesDefault,
    useMenuServiceDefault,
    // This flag makes sure that the method isn't overwritten `POST`
    useOverwriteRequestMethod
  )
}

export const getOrder = (accessToken, orderId, include, sessionId, userId) => {
  const reqData = {
    include
  }

  const headers = {
    'Content-Type': 'application/json',
    'x-gousto-device-id': sessionId,
    'x-gousto-user-id': userId,
  }

  return fetch(accessToken, `${endpoint('order', version)}/orders/${orderId}`, reqData, 'GET', cacheDefault, headers)
}

export const getUserOrders = (accessToken, userId, sessionId, phases, include, limit = 15, sort = 'deliveryDate') => {
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

  return fetch(accessToken, `${endpoint('order', version)}/users/${userId}/orders`, reqData, 'GET', cacheDefault, headers)
}
