import endpoint from 'config/endpoint'
import { fetch } from 'utils/fetch'

export function trackOrder(reqData) {
  return fetch(null, `${endpoint('customers', 1)}/customers/track-order`, reqData, 'POST', 'default', {
    'Content-Type': 'application/json'
  })
}
