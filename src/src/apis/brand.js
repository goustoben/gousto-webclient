import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const version = routes.version.brand

export function fetchBrandInfo(accessToken) {
  const reqData = {}

  return fetch(accessToken, `${endpoint('brand', version)}/theme`, reqData, 'GET')
}

export function fetchBrandMenuHeaders(accessToken) {
  const reqData = {}

  return fetch(accessToken, `${endpoint('brand', version)}/menu-headers`, reqData, 'GET')
}
