import fetch from "utils/fetch"
import endpoint from "config/endpoint"

export function fetchSubscriptionPauseContent(accessToken, enableOffer) {
    // TODO replace the 1 with subscription id when a) we have access to it, and b) the back end uses it
    return fetch(accessToken, `${endpoint('subpauseosr')}/subscriptionpauserecovery/1`, {enableOffer}, 'GET')
}
