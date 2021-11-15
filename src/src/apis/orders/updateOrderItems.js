import fetch from "utils/fetch"
import endpoint from "config/endpoint"

export function updateOrderItems(accessToken, orderId, reqData = {}) {
    return fetch(accessToken, `${endpoint('core')}/order/${orderId}/update-items`, reqData, 'PUT', undefined, {
        'Content-Type': 'application/json',
    })
}
