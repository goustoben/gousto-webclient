import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const SSR_URL_LOCAL = 'https://staging-api.gousto.info/ssr/v1'

const getServiceUrl = (name) => (
	(__ENV__ === 'local')
		? `${SSR_URL_LOCAL}/${name}`
		: `${endpoint('ssr', routes.version.ssr)}/ssr/${name}`
)

export const fetchRefundAmount = () => (
	fetch(null, getServiceUrl('ssr'), null, 'GET')
)

export const setComplaint = (accessToken, body) => (
	fetch(accessToken, getServiceUrl('refund'), body, 'POST')
)
