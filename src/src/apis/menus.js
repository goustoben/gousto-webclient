import { fetchRaw } from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const version = routes.version.menu

export function fetchMenus(accessToken) {
  const options = {
    accessToken,
  }

  return fetchRaw(`${endpoint('menu', version)}/menus`, {include: 'ingredients'}, options)
}

export function fetchMenusWithUserId(accessToken, userId) {
  const options = {
    accessToken,
  }

  return fetchRaw(`${endpoint('menu', version)}/menus`, {include: 'ingredients', userId: userId}, options)
}

