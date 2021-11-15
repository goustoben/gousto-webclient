import fetch from "utils/fetch"
import { forgetRoute } from "config/routes/auth/forgetRoute"

export function serverForget(accessToken) {
    return fetch(null, `${forgetRoute}`, {accessToken}, 'POST', 'no-cache', {}, null, true)
}
