import { getRequestHeaders } from "routes/Menu/apis/_utils"
import fetch, { cacheDefault } from "utils/fetch"
import endpoint from "config/endpoint"

export const createOrder = async (accessToken, order, userId) => {
    const headers = getRequestHeaders(userId)

    const response = await fetch(accessToken, `${endpoint('order', 2)}/orders`, {data: order}, 'POST', cacheDefault, headers)

    const {data: {data: orderResponse}} = response

    return orderResponse
}
