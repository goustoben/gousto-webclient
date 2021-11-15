import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"

export function referAFriend(accessToken, email) {
  return fetch(accessToken, `${endpoint('core')}/user/current/referral`, {emails: [email]}, 'POST')
}
