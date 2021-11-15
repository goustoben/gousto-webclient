import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"
import { userOrdersRoute } from "config/routes/core/userOrdersRoute"

export function fetchUserOrders(accessToken, reqData) {
    return fetch(accessToken, `${endpoint('core')}${userOrdersRoute}`, reqData, 'GET')
}
