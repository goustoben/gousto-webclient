import { fetchRaw } from 'utils/fetch'
import endpoint from 'config/endpoint'
import { getRequestHeaders } from 'routes/Menu/apis/_utils'

const options = {
  method: 'GET',
  cache: 'default',
  headers: {},
  timeout: null,
  includeCookies: false,
  useMenuService: true,
}

const getTasteProfileIdFromQuery = (query) => {
  if (query && query.tasteProfileId) {
    return query.tasteProfileId
  }

  return null
}

export function fetchMenus(accessToken, query) {
  const fetchOptions = {
    ...options,
    accessToken,
    headers: {
      ...options.headers,
      ...getRequestHeaders(),
    },
  }

  let adminLinkData
  if (query && query['preview[auth_user_id]']) {
    adminLinkData = {
      'preview[menu_id]': query['preview[menu_id]'],
      'preview[auth_user_id]': query['preview[auth_user_id]'],
      'preview[expiry]': query['preview[expiry]'],
      'preview[signature]': query['preview[signature]'],
    }
  }

  const requestQueryParams = {
    include: 'ingredients',
    addAlternatives: true,
    ...adminLinkData,
  }

  const tasteProfileId = getTasteProfileIdFromQuery(query)

  if (tasteProfileId) {
    requestQueryParams.tasteProfileId = tasteProfileId
  }

  // requestQueryParams.forceSwapsExperimentUserAllocationGroup = 'variant-b'

  return fetchRaw(`${endpoint('menu')}/menus`, requestQueryParams, fetchOptions)
}

export function fetchMenusWithUserId(accessToken, query, userId) {
  const fetchOptions = {
    ...options,
    accessToken,
    headers: {
      ...options.headers,
      ...getRequestHeaders(userId),
    },
  }

  const requestQueryParams = {
    include: 'ingredients',
    addAlternatives: true,
    userId,
  }

  const tasteProfileId = getTasteProfileIdFromQuery(query)

  if (tasteProfileId) {
    requestQueryParams.tasteProfileId = tasteProfileId
  }

  return fetchRaw(`${endpoint('menu')}/menus`, requestQueryParams, fetchOptions)
}

export function fetchSimpleMenu(accessToken, userId) {
  const fetchOptions = {
    ...options,
    accessToken,
    headers: {
      ...options.headers,
      ...getRequestHeaders(userId),
    },
  }

  const requestQueryParams = {
    includeMenuRelationships: false,
    userId,
  }

  return fetchRaw(`${endpoint('menu')}/menus`, requestQueryParams, fetchOptions)
}
