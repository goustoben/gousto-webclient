import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"

export function fetchUserCredit(accessToken) {
    return fetch(accessToken, `${endpoint('core')}/user/current/balance`, {}, 'GET')
}
