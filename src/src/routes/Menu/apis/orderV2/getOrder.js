import { getRequestHeaders } from "routes/Menu/apis/_utils"
import fetch, { cacheDefault } from "utils/fetch"
import endpoint from "config/endpoint"

export const getOrder = (accessToken, orderId, userId, include) => {
    const reqData = {
        include
    }

    const headers = getRequestHeaders(userId)

    return fetch(accessToken, `${endpoint('order', 2)}/orders/${orderId}`, reqData, 'GET', cacheDefault, headers)
}
