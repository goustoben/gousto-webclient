import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { validateUserPasswordRoute } from "config/routes/auth/validateUserPasswordRoute"

export function validateUserPassword(password, version) {
    return fetch(null, `${endpoint('auth', version)}${validateUserPasswordRoute}`, {password}, 'POST', 'no-cache')
}
