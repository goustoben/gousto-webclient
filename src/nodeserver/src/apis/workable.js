import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

export function fetchJobs() {
	return fetch(null, `${endpoint('content', routes.version.content)}/jobs`, null, 'GET')
}
