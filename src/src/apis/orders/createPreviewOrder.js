import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { orderPreviewRoute } from "config/routes/core/orderPreviewRoute"

export function createPreviewOrder(reqData = {}) {
    return fetch(null, `${endpoint('core')}${orderPreviewRoute}`, reqData, 'POST')
}
