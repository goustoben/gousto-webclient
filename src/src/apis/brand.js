import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const version = routes.version.brand

export function fetchBrandInfo(accessToken, sessionId, userId) {
  const reqData = {}

  const headers = {
    'x-gousto-device-id': sessionId,
    'x-gousto-user-id': userId,
  }

  return fetch(accessToken, `${endpoint('brand', version)}/theme`, reqData, 'GET', 'default', headers)
}

export function fetchBrandMenuHeaders(accessToken, sessionId, userId) {
  const reqData = {}

  const headers = {
    'x-gousto-device-id': sessionId,
    'x-gousto-user-id': userId,
  }

  return fetch(accessToken, `${endpoint('brand', version)}/menu-headers`, reqData, 'GET', 'default', headers)
}
