import { fetch } from 'utils/fetch'
import endpoint from 'config/endpoint'
import Cookies from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'

export function deleteOrder(accessToken, orderId, userId) {
  const headers = {
    'Content-Type': 'application/json',
    'x-gousto-device-id': get(Cookies, 'gousto_session_id', false, false),
    'x-gousto-user-id': userId
  }

  return fetch(
    accessToken,
    `${endpoint('order', 2)}/orders/${orderId}?include[]=shipping_address`,
    {},
    'DELETE',
    undefined,
    headers,
  )
}
