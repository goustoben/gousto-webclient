import { options } from "routes/Menu/fetchData/common"
import { getRequestHeaders } from "routes/Menu/apis/_utils"
import { fetchRaw } from "utils/fetch"
import endpoint from "config/endpoint"

export function fetchSimpleMenu(accessToken, userId) {
    const fetchOptions = {
        ...options,
        accessToken,
        headers: {
            ...options.headers,
            ...getRequestHeaders(userId)
        }
    }

    const requestQueryParams = {
        includeMenuRelationships: false,
        userId
    }

    return fetchRaw(`${endpoint('menu')}/menus`, requestQueryParams, fetchOptions)
}
