import fetch, {
  cacheDefault,
  timeoutDefault,
  includeCookiesDefault,
  useMenuServiceDefault,
} from 'utils/fetch'
import Cookies from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const version = routes.version.ordersV2

const getSessionId = () => get(Cookies, 'gousto_session_id', false, false)
const getRequestHeaders = (userId) => ({
  'Content-Type': 'application/json',
  'x-gousto-device-id': getSessionId(),
  'x-gousto-user-id': userId
})

export const createOrder = async (accessToken, order, userId) => {
  const headers = getRequestHeaders(userId)

  const response = await fetch(accessToken, `${endpoint('order', version)}/orders`, { data: order }, 'POST', cacheDefault, headers)

  const { data: { data: orderResponse } } = response

  return orderResponse
}

export const updateOrder = (accessToken, orderId, order, userId) => {
  const headers = getRequestHeaders(userId)
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

export const getOrder = (accessToken, orderId, userId, include) => {
  const reqData = {
    include
  }

  const headers = getRequestHeaders(userId)

  return fetch(accessToken, `${endpoint('order', version)}/orders/${orderId}`, reqData, 'GET', cacheDefault, headers)
}

export const getUserOrders = (accessToken, userId, phases, include, limit = 15, sort = 'deliveryDate') => {
  const headers = getRequestHeaders(userId)

  const reqData = {
    'filter[phase]': phases,
    include,
    'page[limit]': limit,
    sort,
  }

  return fetch(accessToken, `${endpoint('order', version)}/users/${userId}/orders`, reqData, 'GET', cacheDefault, headers)
}
