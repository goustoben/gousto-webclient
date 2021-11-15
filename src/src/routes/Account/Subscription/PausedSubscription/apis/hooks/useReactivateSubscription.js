import endpoint from "config/endpoint"
import { activateRoute } from "config/routes/subscriptionCommand/activateRoute"
import { useFetch } from "hooks/useFetch"

export function useReactivateSubscription(userId, accessToken, shouldResubscribe, setShouldResubscribe) {
    const reactivateSubscriptionUrl = `${endpoint('subscriptioncommand')}/subscriptions/${userId}${activateRoute}`
    const method = 'POST'

    const [loading, response, error] = useFetch({
        url: reactivateSubscriptionUrl,
        needsAuthorization: true,
        accessToken,
        trigger: {
            shouldRequest: shouldResubscribe,
            setShouldRequest: setShouldResubscribe,
        },
        options: {
            method,
        },
    })
    return {loading, response, error}
}
