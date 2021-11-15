import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { userToken } from "config/routes/auth/userToken"

export function forgetUserToken(accessToken) {
    return fetch(accessToken, `${endpoint('auth')}${userToken}`, {}, 'DELETE', 'no-cache')
}
