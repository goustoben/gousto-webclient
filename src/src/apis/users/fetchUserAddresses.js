import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"

export function fetchUserAddresses(accessToken, userId) {
    return fetch(accessToken, `${endpoint('customers')}/customers/${userId}/addresses`, {}, 'GET')
}
