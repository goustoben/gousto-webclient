import fetch from "utils/fetch"
import { buildSubscriptionQueryUrl } from "routes/Account/apis/subscription/common"
import { projectedDeliveriesRoute } from "config/routes/subscriptionQuery/projectedDeliveriesRoute"

export function fetchProjectedDeliveries(accessToken, userId) {
    return fetch(
        accessToken,
        `${buildSubscriptionQueryUrl(userId, projectedDeliveriesRoute)}`,
        {},
        'GET',
    )
}
