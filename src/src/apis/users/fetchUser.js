import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"
import { currentUserRoute } from "config/routes/core/currentUserRoute"

export function fetchUser(accessToken) {
    return fetch(accessToken, `${endpoint('core')}${currentUserRoute}`, {}, 'GET')
}
