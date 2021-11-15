import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { userToken } from "config/routes/auth/userToken"

export function getUserToken({email, password, clientId, clientSecret, headers}) {
    return fetch(null, `${endpoint('auth')}${userToken}`, {
        grant_type: 'password',
        username: email,
        password,
        client_id: clientId,
        client_secret: clientSecret
    }, 'POST', 'no-cache', {
        'x-forwarded-for': headers['x-forwarded-for'],
        'user-agent': headers['user-agent']
    })
}
