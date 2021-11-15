import { getRequestHeaders } from "routes/Menu/apis/_utils"
import fetch, { cacheDefault } from "utils/fetch"
import endpoint from "config/endpoint"

export const getUserOrders = (accessToken, userId, phases, include, limit = 15, sort = 'deliveryDate') => {
    const headers = getRequestHeaders(userId)

    const reqData = {
        'filter[phase]': phases,
        include,
        'page[limit]': limit,
        sort,
    }

    return fetch(accessToken, `${endpoint('order', 2)}/users/${userId}/orders`, reqData, 'GET', cacheDefault, headers)
}
