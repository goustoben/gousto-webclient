import { fetch } from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'
import Cookies from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'

const version = routes.version.ordersV2

export function deleteOrder(accessToken, orderId, userId) {
  const headers = {
    'Content-Type': 'application/json',
    'x-gousto-device-id': get(Cookies, 'gousto_session_id', false, false),
    'x-gousto-user-id': userId
  }

  return fetch(accessToken, `${endpoint('order', version)}/orders/${orderId}`, {}, 'DELETE', undefined, headers)
}
