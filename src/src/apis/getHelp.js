import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const SSR_URL_LOCAL = 'https://staging-api.gousto.info/ssr/v1'

const fetchRefundAmount = (accessToken, body) => {
  const url = `${endpoint('ssr', routes.version.ssrV2)}/value`

  return fetch(accessToken, url, body, 'POST', 'default', {
    'Content-Type': 'application/json'
  }, null, false)
}

const setComplaint = (accessToken, body) => {
  const url = `${endpoint('ssr', routes.version.ssrV2)}/refund`

  return fetch(accessToken, url, body, 'POST', 'default', {
    'Content-Type': 'application/json'
  }, null, false)
}

const validateIngredients = (accessToken, body) => {
  const url = `${endpoint('ssr', routes.version.ssrV2)}/validate-ingredients`

  return fetch(accessToken, url, body, 'POST', 'default', {
    'Content-Type': 'application/json'
  }, null, false)
}

const validateOrder = (accessToken, body) => {
  const url = (__ENV__ === 'local')
    ? `${SSR_URL_LOCAL}/ssr/validate`
    : `${endpoint('ssr', routes.version.ssr)}/ssr/validate`

  return fetch(accessToken, url, body, 'POST', 'default', {
    'Content-Type': 'application/json'
  }, null, false)
}

const fetchOrderIssues = (accessToken) => {
  const url = (__ENV__ === 'local')
    ? `${SSR_URL_LOCAL}/ssr/categories`
    : `${endpoint('ssr', routes.version.ssr)}/ssr/categories`

  return fetch(accessToken, url, null, 'GET')
}

const shouldShowEntryPointTooltip = (accessToken, orderDeliveryDate) => (
  fetch(
    accessToken,
    `${endpoint('ssr', routes.version.ssr)}/ssr/show-tooltip`,
    { delivery_date: orderDeliveryDate },
    'GET'
  )
)

export {
  fetchRefundAmount,
  setComplaint,
  validateIngredients,
  validateOrder,
  fetchOrderIssues,
  shouldShowEntryPointTooltip,
}
