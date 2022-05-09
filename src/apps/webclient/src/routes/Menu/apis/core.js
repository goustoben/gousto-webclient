import endpoint from 'config/endpoint'
import routes from 'config/routes'
import { fetch } from 'utils/fetch'

export const saveUserOrder = (accessToken, reqData) =>
  fetch(accessToken, `${endpoint('core')}${routes.core.userOrder}`, reqData, 'POST')

export const updateUserOrder = (accessToken, reqData) =>
  fetch(accessToken, `${endpoint('core')}${routes.core.userOrder}`, reqData, 'PUT')
