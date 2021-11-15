import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"

export function addPaymentMethod(accessToken, reqData, userId) {
    return fetch(accessToken, `${endpoint('core')}/user/${userId}/paymentMethod`, reqData, 'PUT')
}
