import fetch, {
  cacheDefault,
  timeoutDefault,
  includeCookiesDefault,
  useMenuServiceDefault,
} from 'utils/fetch'
import endpoint from 'config/endpoint'
import { post } from './fetch'
import { getRequestHeaders } from './_utils'

export const createOrder = async (accessToken, order, userId) => {
  const headers = getRequestHeaders(userId)

  const response = await fetch(accessToken, `${endpoint('order', 2)}/orders`, { data: order }, 'POST', cacheDefault, headers)

  const { data: { data: orderResponse } } = response

  return orderResponse
}

export const getOrderPrice = async (accessToken, order, userId) => {
  const headers = getRequestHeaders(userId)

  return post(accessToken, `${endpoint('order', 2)}/prices`, { data: order }, headers)
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
  const reqData = {
    include
  }

  const headers = getRequestHeaders(userId)

  return fetch(accessToken, `${endpoint('order', 2)}/orders/${orderId}`, reqData, 'GET', cacheDefault, headers)
}

export const getUserOrders = (accessToken, userId, phases, include, limit = 15, sort = 'deliveryDate') => {
  const headers = getRequestHeaders(userId)

  const reqData = {
    'filter[phase]': phases,
    include,
    'page[limit]': limit,
    sort,
  }

  return fetch(accessToken, `${endpoint('order', 2)}/users/${userId}/orders`, reqData, 'GET', cacheDefault, headers)
}
