import { fetch } from "utils/fetch"
import { referAFriendRoute } from "config/routes/user/referAFriendRoute"

export function serverReferAFriend(email, recaptchaToken) {
    return fetch(null, referAFriendRoute, {email, recaptchaToken}, 'POST')
}
