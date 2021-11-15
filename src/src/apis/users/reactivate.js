import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"

export function reactivate(accessToken, reqData) {
    return fetch(accessToken, `${endpoint('core')}/user/${reqData.userId}/restore`, {}, 'PUT')
}
