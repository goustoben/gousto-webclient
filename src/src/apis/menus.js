import { fetchRaw } from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const version = routes.version.menu

const options = {
  method: 'GET',
  cache: 'default',
  headers: {},
  timeout: null,
  includeCookies: false,
  includeExperiments: true,
  useMenuService: true
}

export function fetchMenus(accessToken) {
  const fetchOptions = {
    ...options,
    accessToken
  }

  return fetchRaw(`${endpoint('menu', version)}/menus`, {include: 'ingredients'}, fetchOptions)
}

export function fetchMenusWithUserId(accessToken, userId) {
  const fetchOptions = {
    ...options,
    accessToken
  }

  return fetchRaw(`${endpoint('menu', version)}/menus`, {include: 'ingredients', userId: userId}, fetchOptions)
}
