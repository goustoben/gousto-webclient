import fetch from "utils/fetch"
import { buildSubscriptionCommandUrl } from "routes/Account/apis/subscription/common"
import { deactivateRoute } from "config/routes/subscriptionCommand/deactivateRoute"

export function deactivateSubscription(accessToken, pauseDate, userId) {
    return fetch(
        accessToken,
        `${buildSubscriptionCommandUrl(userId, deactivateRoute)}`,
        {pauseDate},
        'POST',
        'default',
        {'Content-Type': 'application/json'}
    )
}
