import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"

export function verifyAge(accessToken, userId) {
    return fetch(accessToken, `${endpoint('core')}/user/${userId}`, {age_verified: 1}, 'PUT')
}
