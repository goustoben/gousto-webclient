import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

export function deactivateSubscription(accessToken, reqData = {}) {
	return fetch(accessToken, `${endpoint('core')}${routes.core.deactivateSub}`, reqData, 'PUT')
}

export function fetchSubscription(accessToken, reqData = {}) {
	return fetch(accessToken, `${endpoint('core')}${routes.core.currentSubscription}`, reqData, 'GET')
}

export default {
	deactivateSubscription,
	fetchSubscription,
}
