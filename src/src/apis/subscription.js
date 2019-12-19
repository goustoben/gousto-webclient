import fetch from 'utils/fetch'
import routes from 'config/routes'
import endpoint from 'config/endpoint'

const subscriptionApi = {
  deactivateSubscription,
  fetchSubscription,
}

export function deactivateSubscription(accessToken, reqData = {}) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.deactivateSub}`, reqData, 'PUT')
}

export function fetchSubscription(accessToken, reqData = {}) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.currentSubscription}`, reqData, 'GET')
}

export default subscriptionApi
