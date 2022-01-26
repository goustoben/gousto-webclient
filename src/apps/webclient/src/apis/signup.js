import endpoint from 'config/endpoint'
import { fetch } from 'utils/fetch'

export function fetchCountByPostcode(accessToken, reqData) {
  return fetch(accessToken, `${endpoint('customers', 1)}/customers/district/count-by-postcode`, reqData, 'GET')
}
