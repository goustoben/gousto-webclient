import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { newsletterSubscribersRoute } from "config/routes/customers/newsletterSubscribersRoute"

export function newsletterSubscribe(email) {
    return fetch(null, `${endpoint('customers')}${newsletterSubscribersRoute}`, {email}, 'POST')
}
