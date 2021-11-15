import endpoint from "config/endpoint"
import { fetchRaw } from "utils/fetch"

const applyDeliveryCompensation = (accessToken, customerId, orderId, complaintCategoryId) => {
    const url = `${endpoint('ssrdeliveries')}/ssrdeliveries/refund`

    return fetchRaw(
        url,
        {
            customer_id: customerId,
            order_id: orderId,
            category_id: complaintCategoryId,
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
export { applyDeliveryCompensation }
