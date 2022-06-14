import { fetchRaw, fetch } from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

export const validateOrder = (accessToken, body) => {
  const url = `${endpoint('ssr', 3)}/validate`

  return fetch(accessToken, url, body, 'GET', 'default', {
    'Content-Type': 'application/json'
  }, null, false)
}

export const validateIngredients = (accessToken, body) => {
  const url = `${endpoint('ssr', 3)}${routes.ssr.validateIngredients}`

  return fetchRaw(
    url,
    body,
    {
      accessToken,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
}

export const fetchRefundAmount = (accessToken, body) => {
  const url = `${endpoint('ssr', 3)}/value`

  return fetch(accessToken, url, body, 'GET', 'default', {
    'Content-Type': 'application/json'
  }, null, false)
}

export const setComplaint = (accessToken, body) => {
  const url = `${endpoint('ssr', 3)}/refund`

  return fetch(accessToken, url, body, 'POST', 'default', {
    'Content-Type': 'application/json'
  }, null, false)
}
