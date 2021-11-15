import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { resetUserPasswordRoute } from "config/routes/auth/resetUserPasswordRoute"

export function resetUserPassword(password, passwordToken, version = 2) {
    return fetch(null, `${endpoint('auth', version)}${resetUserPasswordRoute}`, {
        password,
        password_token: passwordToken,
    }, 'POST', 'no-cache')
}
