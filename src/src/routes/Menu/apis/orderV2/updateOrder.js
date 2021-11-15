import { getRequestHeaders } from "routes/Menu/apis/_utils"
import fetch, { cacheDefault, includeCookiesDefault, timeoutDefault, useMenuServiceDefault } from "utils/fetch"
import endpoint from "config/endpoint"

export const updateOrder = (accessToken, orderId, order, userId) => {
    const headers = getRequestHeaders(userId)
    const useOverwriteRequestMethod = false

    return fetch(
        accessToken,
        `${endpoint('order', 2)}/orders/${orderId}`,
        {data: order},
        'PUT',
        cacheDefault,
        headers,
        timeoutDefault,
        includeCookiesDefault,
        useMenuServiceDefault,
        // This flag makes sure that the method isn't overwritten `POST`
        useOverwriteRequestMethod
    )
}
