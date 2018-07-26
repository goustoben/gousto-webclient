import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

export function fetchBoxPrices(accessToken, reqData) {
	return fetch(accessToken, `${endpoint('core')}${routes.core.boxPrices}`, reqData, 'GET')
}
