import { getRequestHeaders } from "routes/Menu/apis/_utils"
import { post } from "routes/Menu/apis/fetch"
import endpoint from "config/endpoint"

export const getOrderPrice = async (accessToken, order, userId) => {
    const headers = getRequestHeaders(userId)

    return post(accessToken, `${endpoint('order', 2)}/prices`, {data: order}, headers)
}
