import { getTasteProfileIdFromQuery, options } from "routes/Menu/fetchData/common"
import { getRequestHeaders } from "routes/Menu/apis/_utils"
import { fetchRaw } from "utils/fetch"
import endpoint from "config/endpoint"

export function fetchMenusWithUserId(accessToken, query, userId) {
    const fetchOptions = {
        ...options,
        accessToken,
        headers: {
            ...options.headers,
            ...getRequestHeaders(userId)
        }
    }

    const requestQueryParams = {
        include: 'ingredients',
        addAlternatives: true,
        userId
    }

    const tasteProfileId = getTasteProfileIdFromQuery(query)

    if (tasteProfileId) {
        requestQueryParams.tasteProfileId = tasteProfileId
    }

    return fetchRaw(`${endpoint('menu')}/menus`, requestQueryParams, fetchOptions)
}
