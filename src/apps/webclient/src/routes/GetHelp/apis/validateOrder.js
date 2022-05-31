import { fetch } from 'utils/fetch'
import endpoint from 'config/endpoint'

export const validateOrder = (accessToken, body) => {
  const url = `${endpoint('ssr', 3)}/validate`

  return fetch(accessToken, url, body, 'GET', 'default', {
    'Content-Type': 'application/json'
  }, null, false)
}
