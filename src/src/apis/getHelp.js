import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const SSR_URL_LOCAL = 'https://staging-api.gousto.info/ssr/v1'

const fetchRefundAmount = (accessToken, body) => {
  const url = (__ENV__ === 'local')
    ? `${SSR_URL_LOCAL}/ssr/value`
    : `${endpoint('ssr', routes.version.ssr)}/ssr/value`

  return fetch(accessToken, url, body, 'POST', 'default', {
    'Content-Type': 'application/json'
  }, null, false, false)
}

const setComplaint = (accessToken, body) => {
  const url = (__ENV__ === 'local')
    ? `${SSR_URL_LOCAL}/ssr/refund`
    : `${endpoint('ssr', routes.version.ssr)}/ssr/refund`

  return fetch(accessToken, url, body, 'POST', 'default', {
    'Content-Type': 'application/json'
  }, null, false, false)
}

const validateIngredients = (accessToken, body) => {
  const url = (__ENV__ === 'local')
    ? `${SSR_URL_LOCAL}/ssr/validate-ingredients`
    : `${endpoint('ssr', routes.version.ssr)}/ssr/validate-ingredients`

  return fetch(accessToken, url, body, 'POST', 'default', {
    'Content-Type': 'application/json'
  }, null, false, false)
}

const validateOrder = (accessToken, body) => {
  const url = (__ENV__ === 'local')
    ? `${SSR_URL_LOCAL}/ssr/validate`
    : `${endpoint('ssr', routes.version.ssr)}/ssr/validate`

  return fetch(accessToken, url, body, 'POST', 'default', {
    'Content-Type': 'application/json'
  }, null, false, false)
}

export {
  fetchRefundAmount,
  setComplaint,
  validateIngredients,
  validateOrder,
}
