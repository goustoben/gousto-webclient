import endpoint from 'config/endpoint'
import routes from 'config/routes'
import { fetch } from 'utils/fetch'

export function saveUserOrder(accessToken, reqData) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.userOrder}`, reqData, 'POST')
}

export function updateUserOrder(accessToken, reqData) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.userOrder}`, reqData, 'PUT')
}
