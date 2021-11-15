import endpoint from "config/endpoint"
import { fetchRaw } from "utils/fetch"

const validateDelivery = (accessToken, customerId, orderId) => {
    const url = `${endpoint('ssrdeliveries')}/ssrdeliveries/validate`

    return fetchRaw(
        url,
        {
            customer_id: customerId,
            order_id: orderId,
        },
        {
            accessToken,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }
    )
}
export { validateDelivery }
