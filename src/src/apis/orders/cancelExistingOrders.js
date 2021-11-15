import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { cancelPendingRoute } from "config/routes/core/cancelPendingRoute"

export function cancelExistingOrders(accessToken, reqData = {}) {
    return fetch(accessToken, `${endpoint('core')}${cancelPendingRoute}`, reqData, 'POST')
}
