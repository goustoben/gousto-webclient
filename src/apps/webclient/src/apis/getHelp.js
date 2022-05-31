import { fetch, fetchRaw } from 'utils/fetch'
import endpoint from 'config/endpoint'

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

const fetchOrderIssues = (accessToken) => {
  const url = `${endpoint('ssr')}/ssr/categories`

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

const requestRecipeCardsWithIssueReasons = (
  accessToken,
  customerId,
  orderId,
  addressId,
  issues,
) => {
  const url = `${endpoint('ssrrecipecards')}/request-recipe-cards`
  const issuesTransformed = issues.map((issue) => ({
    core_recipe_id: issue.coreRecipeId,
    category_id: issue.complaintCategoryId,
  }))

  return fetchRaw(
    url,
    {
      customer_id: customerId,
      order_id: orderId,
      address_id: addressId,
      issues: issuesTransformed,
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
  fetchOrderIssues,
  shouldShowEntryPointTooltip,
  applyDeliveryCompensation,
  requestRecipeCardsWithIssueReasons,
  validateDelivery,
}
