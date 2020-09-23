import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'
const version = routes.version.clientMetrics

export function sendClientMetric(name, detail, userId) {
  const reqData = {
    client: 'webclient',
    time: (new Date()).toISOString(),
    name,
    detail: {
      ...detail,
      _userId: userId || null
    },
  }
  const headers = {
    'Content-Type': 'application/json',
  }

  return fetch(null, `${endpoint('clientmetrics', version)}/event`, reqData, 'POST', 'default', headers)
}
