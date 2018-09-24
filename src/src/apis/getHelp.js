import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

export function fetchRefundAmount() {
	const url = __ENV__ === 'local' ?
		'https://staging-api.gousto.info/ssr/v1/ssr'
		: `${endpoint('ssr', routes.version.ssr)}/ssr`

	return fetch(null, url, null, 'GET')
}
