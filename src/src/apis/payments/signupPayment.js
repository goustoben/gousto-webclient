import { fetch } from "utils/fetch"
import { HEADERS, PAYMENTS_API } from "apis/payments/configuration"

function signupPayment(reqData, provider) {
    return fetch(null, `${PAYMENTS_API}/signup-payments?provider=${provider}`, reqData, 'POST', undefined, HEADERS)
}

export { signupPayment }
