import fetch from "utils/fetch"
import { loginRoute } from "config/routes/auth/loginRoute"

export function serverAuthenticate(email, password, rememberMe, recaptchaToken) {
    return fetch(null, `${loginRoute}`, {
        grant_type: 'password',
        username: email,
        password,
        rememberMe,
        recaptchaToken
    }, 'POST', 'no-cache', {}, null, true)
}
