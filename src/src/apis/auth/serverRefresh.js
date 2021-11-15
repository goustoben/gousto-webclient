import fetch from "utils/fetch"
import { refreshRoute } from "config/routes/auth/refreshRoute"

export function serverRefresh(rememberMe) {
    return fetch(null, `${refreshRoute}`, {rememberMe}, 'POST', 'no-cache', {}, null, true)
}
