import fetch, {
  cacheDefault,
  timeoutDefault,
  includeCookiesDefault,
  useMenuServiceDefault,
} from 'utils/fetch'
import Cookies from 'utils/GoustoCookies'
import { get as getCookie } from 'utils/cookieHelper2'
import endpoint from 'config/endpoint'
import { get } from './fetch'

const getSessionId = () => getCookie(Cookies, 'gousto_session_id', false, false)
const getRequestHeaders = (userId) => ({
  'Content-Type': 'application/json',
  'x-gousto-device-id': getSessionId(),
  'x-gousto-user-id': userId
})

export const createOrder = async (accessToken, order, userId) => {
  const headers = getRequestHeaders(userId)

  const response = await fetch(accessToken, `${endpoint('order', 2)}/orders`, { data: order }, 'POST', cacheDefault, headers)

  const { data: { data: orderResponse } } = response

  return orderResponse
}

export const updateOrder = (accessToken, orderId, order, userId) => {
  const headers = getRequestHeaders(userId)
  const useOverwriteRequestMethod = false

  return fetch(
    accessToken,
    `${endpoint('order', 2)}/orders/${orderId}`,
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
  const authOptions = {
    accessToken,
    userId,
    sessionId: getSessionId()
  }
  const url = `${endpoint('order', 2)}/orders/${orderId}`

  if (include) {
    return get(authOptions, url, { include })
  }

  return get(authOptions, url)
}

/**
 * Make an HTTP request to `/users/:userId/orders`
 *
 * @param {string} accessToken - access token for authentication
 * @param {string} userId - user id for authentication and to construct the endpoint
 * @param {} [phases] - phase to apply in the `filter` query parameter
 * @param {} [include] - `include` query parameter
 * @param {number} [limit=15] - the amount of orders to request
 * @param {string} [sort='deliveryDate'] - the sort field to request
 *
 * @returns {Promise<JSONAPIResponse<Order[]>>} a promise resolving to the users orders in JSON API format
 */
export const getUserOrders = async (accessToken, userId, phases, include, limit = 15, sort = 'deliveryDate') => {
  let reqData = {
    'page[limit]': limit,
    sort,
  }

  if (phases !== null) {
    reqData = {
      ...reqData,
      'filter[phase]': phases
    }
  }

  if (include !== null) {
    reqData = {
      ...reqData,
      include
    }
  }

  const [ response, error, status ] = await get(
    {
      accessToken,
      userId,
      sessionId: getSessionId()
    },
    `${endpoint('order', 2)}/users/${userId}/orders`,
    reqData
  )

  if (error) {
    throw new Error({
      message: error,
      status
    })
  }

  return response
}
