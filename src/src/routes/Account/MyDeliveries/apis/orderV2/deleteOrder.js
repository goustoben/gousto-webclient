import { get } from "utils/cookieHelper2"
import Cookies from "utils/GoustoCookies"
import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"

export function deleteOrder(accessToken, orderId, userId) {
    const headers = {
        'Content-Type': 'application/json',
        'x-gousto-device-id': get(Cookies, 'gousto_session_id', false, false),
        'x-gousto-user-id': userId
    }

    return fetch(accessToken, `${endpoint('order', 2)}/orders/${orderId}`, {}, 'DELETE', undefined, headers)
}
