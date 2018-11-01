import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const SSR_URL_LOCAL = 'https://staging-api.gousto.info/ssr/v1'

export const fetchRefundAmount = () => {
	const url = (__ENV__ === 'local')
		? `${SSR_URL_LOCAL}/ssr`
		: `${endpoint('ssr', routes.version.ssr)}/ssr`

	return fetch(null, url, null, 'GET')
}

export const setComplaint = (accessToken, body) => {
	const url = (__ENV__ === 'local')
		? `${SSR_URL_LOCAL}/ssr/refund`
		: `${endpoint('ssr', routes.version.ssr)}/refund`

	return fetch(accessToken, url, body, 'POST', 'default', {
		'Content-Type': 'application/json'
	}, null, false, false)
}
