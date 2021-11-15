import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"

export function fetchReferralOffer(accessToken) {
    return fetch(accessToken, `${endpoint('core')}/user/current/raf-campaign-details`, {}, 'GET')
}
