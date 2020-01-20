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
  useMenuService: true
}

export function fetchMenus(accessToken, query) {
  const fetchOptions = {
    ...options,
    accessToken
  }

  let adminLinkData
  if(query && query['preview[auth_user_id]']) {
    adminLinkData = {
      'preview[menu_id]': query['preview[menu_id]'],
      'preview[auth_user_id]': query['preview[auth_user_id]'],
      'preview[expiry]': query['preview[expiry]'],
      'preview[signature]': query['preview[signature]'],
    }
  }

  return fetchRaw(`${endpoint('menu', version)}/menus`, {
    include: 'ingredients',
    ...adminLinkData,
  }, fetchOptions)
}

export function fetchMenusWithUserId(accessToken, userId) {
  const fetchOptions = {
    ...options,
    accessToken
  }

  return fetchRaw(`${endpoint('menu', version)}/menus`, {include: 'ingredients', userId: userId}, fetchOptions)
}
