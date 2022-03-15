import { fetch } from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

export function getUserExperiments(sessionId, userId) {
  const headers = {
    'x-gousto-device-id': sessionId,
    'x-gousto-user-id': userId,
  }

  const url = `${endpoint('userbucketing')}${routes.userBucketing.experiments}`

  return fetch(null, url, {}, 'GET', 'default', headers)
}

export function updateUserExperiment(experimentName, sessionId, userId) {
  const headers = {
    'x-gousto-device-id': sessionId,
    'x-gousto-user-id': userId,
  }

  const url = `${endpoint('userbucketing')}${routes.userBucketing.experiments}/${experimentName}`

  return fetch(null, url, {}, 'POST', 'default', headers)
}
