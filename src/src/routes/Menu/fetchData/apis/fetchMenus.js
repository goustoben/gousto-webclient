import { getTasteProfileIdFromQuery, options } from "routes/Menu/fetchData/common"
import { getRequestHeaders } from "routes/Menu/apis/_utils"
import { fetchRaw } from "utils/fetch"
import endpoint from "config/endpoint"

export function fetchMenus(accessToken, query) {
    const fetchOptions = {
        ...options,
        accessToken,
        headers: {
            ...options.headers,
            ...getRequestHeaders()
        }
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

    return fetchRaw(`${endpoint('menu')}/menus`, requestQueryParams, fetchOptions)
}
