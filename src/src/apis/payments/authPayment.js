import { fetch } from "utils/fetch"
import { HEADERS, PAYMENTS_API } from "apis/payments/configuration"

function authPayment(reqData) {
    return fetch(null, `${PAYMENTS_API}/payment-auth`, reqData, 'POST', undefined, HEADERS)
}

export { authPayment }
