import isomorphicFetch from 'isomorphic-fetch'
import {
  fetch,
  cacheDefault,
  timeoutDefault,
  includeCookiesDefault,
  useMenuServiceDefault,
} from 'utils/fetch'
import endpoint from 'config/endpoint'
import * as userApiV1 from 'apis/user'
import { getUserId } from 'selectors/user'
import { getAccessToken } from 'selectors/auth'
import { isOptimizelyFeatureEnabledFactory } from 'containers/OptimizelyRollouts'
import { transformOrderV2ToOrderV1 } from './ordersV2toV1'
import { post } from './fetch'
import { getRequestHeaders } from './_utils'

export const createOrder = async (accessToken, order, userId) => {
  const headers = getRequestHeaders(userId)

  const response = await fetch(accessToken, `${endpoint('order', 2)}/orders`, { data: order }, 'POST', cacheDefault, headers)

  const {
    data: { data: orderResponse },
  } = response

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
    include,
  }

  const headers = getRequestHeaders(userId)

  return fetch(accessToken, `${endpoint('order', 2)}/orders/${orderId}`, reqData, 'GET', cacheDefault, headers)
}

const wait = (ms = 1) => new Promise((r) => setTimeout(r, ms))

const getServiceReady = async (dispatch, getState, optimizelyFlag) => {
  let userId
  let isEnabled
  while (userId === '' || userId === undefined) {
    userId = await getUserId(getState())
    isEnabled = await isOptimizelyFeatureEnabledFactory(optimizelyFlag)(dispatch, getState)
    await wait(1000)
  }
  return { userId, isEnabled }
}

export async function fetchUserOrders(dispatch, getState, reqData) {
  const  { userId } = await getServiceReady(dispatch, getState, 'radishes_order_api_v2_userorders_web_enabled')
  const state = getState()
  const headers = getRequestHeaders(userId)
  const params = new URLSearchParams(reqData).toString()
  const accessToken = getAccessToken(state)

  let url = `${endpoint('order', 2)}/users/${userId}/orders`
  if (params) {
    url = `${url}?${params}`
  }

  return new Promise((resolve, reject) =>
      isomorphicFetch(url, {
      method: 'GET',
      headers: { ...headers, Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => response.json())
    .then((jsonResponse) => {
      const fromV2 =
        jsonResponse?.data.map((d) => transformOrderV2ToOrderV1(d, jsonResponse.included)) || []
      resolve({ ...jsonResponse, data: fromV2.reverse() })
    })
    .catch((error) => {
      reject(error)
    })
  )
}
