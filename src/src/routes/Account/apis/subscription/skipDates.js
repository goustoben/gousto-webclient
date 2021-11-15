import fetch from "utils/fetch"
import { buildSubscriptionCommandUrl } from "routes/Account/apis/subscription/common"
import { skipRoute } from "config/routes/subscriptionCommand/skipRoute"

export function skipDates(accessToken, userId, dates) {
    return fetch(
        accessToken,
        `${buildSubscriptionCommandUrl(userId, skipRoute)}`,
        {
            skipDates: dates,
        },
        'POST',
        'default',
        {'Content-Type': 'application/json'}
    )
}
