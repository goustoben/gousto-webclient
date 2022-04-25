import isomorphicFetch from 'isomorphic-fetch'
import { fetch, cacheDefault } from 'utils/fetch'
import endpoint from 'config/endpoint'
import * as userApiV1 from 'apis/user'
import * as orderApiV1 from 'apis/orders'
import { getUserId } from 'selectors/user'
import { getAccessToken } from 'selectors/auth'
import { isOptimizelyFeatureEnabledFactory } from 'containers/OptimizelyRollouts'
import { transformOrderV2ToOrderV1 } from './ordersV2toV1'
import { post } from './fetch'
import { getRequestHeaders } from './_utils'
import { getOrderForUpdateOrderV1, getOrderV2 } from '../selectors/order'

export const createOrder = async (accessToken, order, userId) => {
  const headers = getRequestHeaders(userId)

  const response = await fetch(
    accessToken,
    `${endpoint('order', 2)}/orders`,
    { data: order },
    'POST',
    cacheDefault,
    headers
  )

  const {
    data: { data: orderResponse },
  } = response

  return orderResponse
}

export const getOrderPrice = async (accessToken, order, userId) => {
  const headers = getRequestHeaders(userId)

  return post(accessToken, `${endpoint('order', 2)}/prices`, { data: order }, headers)
}

export async function updateOrder(dispatch, getState, orderId, additionalData) {
  const state = getState()
  const accessToken = getAccessToken(state)
  const userId = getUserId(state)
  const useOrderApiV2 = await isOptimizelyFeatureEnabledFactory(
    'radishes_order_api_v2_putorder_web_enabled'
  )(dispatch, getState)

  // Temporary feature flag until we complete the migration from Order API V1 to Order API V2
  if (!useOrderApiV2) {
    const v1BaseOrder = getOrderForUpdateOrderV1(state)

    return orderApiV1.saveOrder(accessToken, orderId, { ...v1BaseOrder, ...(additionalData || {}) })
  }

  const orderRequest = getOrderV2(state)
  const headers = getRequestHeaders(userId)
  const url = `${endpoint('order', 2)}/orders/${orderId}`

  if (additionalData) {
    // additionalData are sent in v1 format, which is ok for now since we still need them inside the v1 api
    // but if we get to this block it means we're in v2 and we need to set them in v2 format
    if (orderRequest?.relationships?.delivery_slot?.data) {
      orderRequest.relationships.delivery_slot.data.id = additionalData.delivery_slot_id
    }
    if (orderRequest?.relationships?.delivery_day?.data) {
      orderRequest.relationships.delivery_day.data.id = additionalData.delivery_day_id
    }
    if (orderRequest?.relationships?.delivery_slot_lead_time?.data) {
      orderRequest.relationships.delivery_slot_lead_time.data.id =
        additionalData.day_slot_lead_time_id
    }
  }

  return new Promise((resolve, reject) =>
    isomorphicFetch(url, {
      method: 'PUT',
      headers: { ...headers, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ data: orderRequest }),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const fromV2 = transformOrderV2ToOrderV1(jsonResponse.data, jsonResponse.included)
        resolve({ ...jsonResponse, data: fromV2 })
      })
      .catch((error) => {
        reject(error)
      })
  )
}

export async function fetchOrder(dispatch, getState, orderId, include) {
  const state = getState()
  const userId = getUserId(state)
  const accessToken = getAccessToken(state)
  const useOrderApiV2 = await isOptimizelyFeatureEnabledFactory(
    'radishes_order_api_v2_getorder_web_enabled'
  )(dispatch, getState)

  // Temporary feature flag until we complete the migration from Order API V1 to Order API V2
  if (!useOrderApiV2) {
    return orderApiV1.fetchOrder(accessToken, orderId, { include })
  }

  const headers = getRequestHeaders(userId)
  const url = `${endpoint('order', 2)}/orders/${orderId}?include[]=shipping_address`

  return new Promise((resolve, reject) =>
    isomorphicFetch(url, {
      method: 'GET',
      headers: { ...headers, Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const transformedOrder = transformOrderV2ToOrderV1(jsonResponse.data, jsonResponse.included)
        resolve({ ...jsonResponse, data: transformedOrder })
      })
      .catch((error) => {
        reject(error)
      })
  )
}

export async function fetchUserOrders(dispatch, getState, reqData) {
  const state = getState()
  const userId = getUserId(state)
  const headers = getRequestHeaders(userId)
  const params = new URLSearchParams(reqData).toString()
  const accessToken = getAccessToken(state)
  const useOrderApiV2 = await isOptimizelyFeatureEnabledFactory(
    'radishes_order_api_v2_userorders_web_enabled'
  )(dispatch, getState)

  // Temporary feature flag until we complete the migration from Order API V1 to Order API V2
  if (!useOrderApiV2) {
    // eslint-disable-next-line import/no-named-as-default-member
    return userApiV1.fetchUserOrders(accessToken, reqData)
  }

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
        const transformedOrder =
          jsonResponse?.data.map((d) => transformOrderV2ToOrderV1(d, jsonResponse.included)) || []
        resolve({ ...jsonResponse, data: transformedOrder.reverse() })
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
