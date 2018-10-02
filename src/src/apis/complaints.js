import fetch from 'utils/fetch'
import routes from 'config/routes'
import endpoint from 'config/endpoint'

const setComplaint = (accessToken, payload) => {
	const url = `${endpoint('complaints', routes.version.complaints)}/complaints`

	fetch(accessToken, url, payload, 'POST')
}

export { setComplaint }
