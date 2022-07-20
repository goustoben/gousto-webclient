import { useMenu as useMenuBase } from '@library/api-menu-service'

import { MenuQueryParams, useMenuQueryParams } from 'routes/Menu/context/menuQueryContext'

const getTasteProfileIdFromQuery = (query: MenuQueryParams) => {
  if (query && query.tasteProfileId) {
    return query.tasteProfileId
  }

  return null
}

export function useMenuRequestArgs(): Parameters<typeof useMenuBase>[0]['requestData'] {
  const query = useMenuQueryParams()

  if (!query) {
    throw Error('Attempted to read menu request args outside of context provider')
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

  const tasteProfileId = getTasteProfileIdFromQuery(query)

  return {
    include: 'ingredients',
    addAlternatives: true,
    ...adminLinkData,

    ...(tasteProfileId ? { tasteProfileId } : {}),
  }
}
