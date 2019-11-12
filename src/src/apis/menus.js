import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const version = routes.version.menu

export function fetchMenus(accessToken) {
  return fetch(accessToken, `${endpoint('menu', version)}/menus`, {}, 'GET')
}

export function fetchMenusWithUserId(accessToken, userId) {
  return fetch(accessToken, `${endpoint('menu', version)}/menus?userId=${userId}`, {}, 'GET')
}

