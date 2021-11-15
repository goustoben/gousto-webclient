import endpoint from "config/endpoint"

export function buildSubscriptionCommandUrl(userId, path = '') {
    return `${endpoint('subscriptioncommand')}/subscriptions/${userId}${path}`
}

export function buildSubscriptionQueryUrl(userId, path) {
    return `${endpoint(
        'subscriptionquery'
    )}${path}/${userId}`
}
