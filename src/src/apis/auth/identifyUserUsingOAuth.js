import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { identifyUserRoute } from "config/routes/auth/identifyUserRoute"

export function identifyUserUsingOAuth(accessToken) {
    return fetch(accessToken, `${endpoint('auth')}${identifyUserRoute}`, {}, 'GET', 'no-cache')
}
