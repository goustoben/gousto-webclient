import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"

export function deleteMarketingSubscription(authUserId, marketingType, marketingUnsubscribeToken) {
    return fetch(
        null,
        `${endpoint('core')}/user/${authUserId}/marketing/${marketingType}`,
        {marketing_unsubscribe_token: marketingUnsubscribeToken},
        'DELETE'
    )
}
