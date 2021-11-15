import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { signupRoute } from "config/routes/customers/signupRoute"

export function customerSignup(accessToken, reqData) {
    const TIMEOUT = 50000

    return fetch(accessToken, `${endpoint('customers', 2)}${signupRoute}`, reqData, 'POST', 'default', {}, TIMEOUT)
}
