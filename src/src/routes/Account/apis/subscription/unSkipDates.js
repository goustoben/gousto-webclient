import fetch from "utils/fetch"
import { buildSubscriptionCommandUrl } from "routes/Account/apis/subscription/common"
import { unSkipRoute } from "config/routes/subscriptionCommand/unskipRoute"

export function unSkipDates(accessToken, userId, dates) {
    return fetch(
        accessToken,
        `${buildSubscriptionCommandUrl(userId, unSkipRoute)}`,
        {
            unskipDates: dates,
        },
        'POST',
        'default',
        {'Content-Type': 'application/json'}
    )
}
