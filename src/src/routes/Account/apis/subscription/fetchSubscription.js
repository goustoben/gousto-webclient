import fetch from "utils/fetch"
import { buildSubscriptionQueryUrl } from "routes/Account/apis/subscription/common"
import { subscriptionsRoute } from "config/routes/subscriptionQuery/subscriptionsRoute"

export function fetchSubscription(accessToken, userId) {
    return fetch(
        accessToken,
        buildSubscriptionQueryUrl(userId, subscriptionsRoute),
        {},
        'GET',
    )
}
