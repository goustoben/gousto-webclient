import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"

export function referralDetails(accessToken, reqData) {
    return fetch(accessToken, `${endpoint('core')}/user/current/referralDetails`, reqData, 'GET')
}
