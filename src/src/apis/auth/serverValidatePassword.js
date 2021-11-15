import fetch from "utils/fetch"
import { validateRoute } from "config/routes/auth/validateRoute"

export function serverValidatePassword(password) {
    return fetch(null, `${validateRoute}`, {password}, 'POST', 'no-cache', {}, null, true)
}
