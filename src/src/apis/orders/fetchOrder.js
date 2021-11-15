import fetch from "utils/fetch"
import endpoint from "config/endpoint"

export function fetchOrder(accessToken, orderId, reqData = {}) {
    return fetch(accessToken, `${endpoint('core')}/order/${orderId}`, reqData, 'GET', undefined, {
        'Content-Type': 'application/json',
    })
}
