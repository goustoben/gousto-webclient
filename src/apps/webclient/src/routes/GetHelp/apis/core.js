import { fetch } from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

export function fetchShippingAddresses(accessToken) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.userAddress}`, { type: 'shipping' }, 'GET')
}
