import fetch from "utils/fetch"
import { logoutRoute } from "config/routes/auth/logoutRoute"

export function serverLogout() {
    return fetch(null, `${logoutRoute}`, {}, 'POST', 'no-cache', {}, null, true)
}
