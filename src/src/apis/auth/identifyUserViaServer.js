import fetch from "utils/fetch"
import { identifyRoute } from "config/routes/auth/identifyRoute"

export function identifyUserViaServer() {
    return fetch(null, `${identifyRoute}`, {}, 'POST', 'no-cache', {}, null, true)
}
