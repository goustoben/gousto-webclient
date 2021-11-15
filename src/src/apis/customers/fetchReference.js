import fetch from "utils/fetch"
import endpoint from "config/endpoint"
import { referenceRoute } from "config/routes/customers/referenceRoute"

export const fetchReference = () => (
    fetch(null, `${endpoint('customers')}${referenceRoute}`, {}, 'GET')
)
