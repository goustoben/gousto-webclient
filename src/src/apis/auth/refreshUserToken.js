import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { refreshTokenRoute } from "config/routes/auth/refreshTokenRoute"

export function refreshUserToken(refreshToken, clientId, clientSecret) {
    return fetch(null, `${endpoint('auth')}${refreshTokenRoute}`, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret
    }, 'POST', 'no-cache', {}, false)
}
