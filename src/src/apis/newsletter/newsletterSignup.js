import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { newsletterRoute } from "config/routes/core/newsletterRoute"

function newsletterSignup(accessToken, email) {
    return fetch(accessToken, `${endpoint('core')}${newsletterRoute}`, {email}, 'POST')
}

export default newsletterSignup
