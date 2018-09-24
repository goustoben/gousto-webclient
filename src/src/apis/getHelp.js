import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const SSR_URL_LOCAL = 'https://staging-api.gousto.info/ssr/v1/sxsr'

export function fetchRefundAmount() {
	const url = (__ENV__ === 'local')
		? SSR_URL_LOCAL
		: `${endpoint('ssr', routes.version.ssr)}/ssr`

	return fetch(null, url, null, 'GET')
}
