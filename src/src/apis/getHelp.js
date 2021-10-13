import fetch, { fetchRaw } from 'utils/fetch'
import endpoint from 'config/endpoint'

const SSR_URL_LOCAL = 'https://stagingdr-api.gousto.info/ssr/v1'
// const SSR_URL_LOCAL = 'https://staging-api.gousto.info/ssr/v1'

const fetchRefundAmount = (accessToken, body) => {
  const url = `${endpoint('ssr',2)}/value`

  return fetch(accessToken, url, body, 'POST', 'default', {
    'Content-Type': 'application/json'
  }, null, false)
}

const setComplaint = (accessToken, body) => {
  const url = `${endpoint('ssr', 2)}/refund`

  return fetch(accessToken, url, body, 'POST', 'default', {
    'Content-Type': 'application/json'
  }, null, false)
}

const validateIngredients = (accessToken, body) => {
  const url = `${endpoint('ssr', 2)}/validate-ingredients`

  return fetch(accessToken, url, body, 'POST', 'default', {
    'Content-Type': 'application/json'
  }, null, false)
}

const validateOrder = (accessToken, body) => {
  const url = (__ENV__ === 'local')
    ? `${SSR_URL_LOCAL}/ssr/validate`
    : `${endpoint('ssr')}/ssr/validate`

  return fetch(accessToken, url, body, 'POST', 'default', {
    'Content-Type': 'application/json'
  }, null, false)
}

const fetchOrderIssues = (accessToken) => {
  const url = (__ENV__ === 'local')
    ? `${SSR_URL_LOCAL}/ssr/categories`
    : `${endpoint('ssr')}/ssr/categories`

  return fetch(accessToken, url, null, 'GET')
}

const shouldShowEntryPointTooltip = (accessToken, orderDeliveryDate) => (
  fetch(
    accessToken,
    `${endpoint('ssr')}/ssr/show-tooltip`,
    { delivery_date: orderDeliveryDate },
    'GET'
  )
)

const applyDeliveryCompensation = (accessToken, customerId, orderId, complaintCategoryId ) => {
  const url = `${endpoint('ssrdeliveries')}/ssrdeliveries/refund`

  return fetchRaw(
    url,
    {
      customer_id: customerId,
      order_id: orderId,
      category_id: complaintCategoryId,
    },
    {
      accessToken,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }
  )
}

const validateDelivery = (accessToken, customerId, orderId) => {
  const url = `${endpoint('ssrdeliveries')}/ssrdeliveries/validate`

  return fetchRaw(
    url,
    {
      customer_id: customerId,
      order_id: orderId,
    },
    {
      accessToken,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }
  )
}

export {
  fetchRefundAmount,
  setComplaint,
  validateIngredients,
  validateOrder,
  fetchOrderIssues,
  shouldShowEntryPointTooltip,
  applyDeliveryCompensation,
  validateDelivery,
}
