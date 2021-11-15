import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"

export function checkDuplicateUser(reqData) {
    return fetch(null, `${endpoint('core')}/user/check-duplicate`, reqData, 'POST')
}
