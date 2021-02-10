import endpoint from 'config/endpoint'
import { fetch } from 'utils/fetch'

export const cancelOrder = (accessToken, orderId, reqData = {}) =>
  fetch(accessToken, `${endpoint('core')}/order/${orderId}`, reqData, 'DELETE', undefined, {
    'Content-Type': 'application/json',
  })
