import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"
import { userPromoRoute } from "config/routes/core/userPromoRoute"

export function fetchPromo(accessToken) {
    return fetch(accessToken, `${endpoint('core')}${userPromoRoute}`, {}, 'GET')
}
