import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"

export function applyPromo(accessToken, promoCode) {
    return fetch(accessToken, `${endpoint('core')}/user/current/applyPromotionCode/${promoCode}`, {}, 'POST')
}
