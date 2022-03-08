import endpoint from 'config/endpoint'
import routes from 'config/routes'
import { fetch, fetchRaw } from 'utils/fetch'

export function applyPromo(accessToken, promoCode) {
  return fetch(
    accessToken,
    `${endpoint('core')}/user/current/applyPromotionCode/${promoCode}`,
    {},
    'POST'
  )
}

export function fetchUserCredit(accessToken) {
  return fetch(accessToken, `${endpoint('core')}/user/current/balance`, {}, 'GET')
}

export function fetchReferralOffer(accessToken) {
  return fetch(accessToken, `${endpoint('core')}/user/current/raf-campaign-details`, {}, 'GET')
}

export function fetchPromo(accessToken) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.userPromo}`, {}, 'GET')
}

export function fetchUser(accessToken) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.currentUser}`, {}, 'GET')
}

export function fetchShippingAddresses(accessToken) {
  return fetch(
    accessToken,
    `${endpoint('core')}${routes.core.userAddress}`,
    { type: 'shipping' },
    'GET'
  )
}

export function fetchUserOrders(accessToken, reqData) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.userOrders}`, reqData, 'GET')
}

export function reactivate(accessToken, reqData) {
  return fetch(accessToken, `${endpoint('core')}/user/${reqData.userId}/restore`, {}, 'PUT')
}

export function verifyAge(accessToken, userId) {
  return fetch(accessToken, `${endpoint('core')}/user/${userId}`, { age_verified: 1 }, 'PUT')
}

export function checkDuplicateUser(reqData) {
  return fetch(null, `${endpoint('core')}/user/check-duplicate`, reqData, 'POST')
}

export function referralDetails(accessToken, reqData) {
  return fetch(accessToken, `${endpoint('core')}/user/current/referralDetails`, reqData, 'GET')
}

export function referAFriend(accessToken, email) {
  return fetch(
    accessToken,
    `${endpoint('core')}/user/current/referral`,
    { emails: [email] },
    'POST'
  )
}

export function serverReferAFriend(email, recaptchaToken) {
  return fetch(null, routes.user.referAFriend, { email, recaptchaToken }, 'POST')
}

export function addPaymentMethod(accessToken, reqData, userId) {
  return fetch(accessToken, `${endpoint('core')}/user/${userId}/paymentMethod`, reqData, 'PUT')
}

export function fetchUserAddresses(accessToken, userId) {
  return fetch(
    accessToken,
    `${endpoint('customers')}/customers/${userId}/addresses`,
    {},
    'GET',
    'default',
    {},
    600000
  )
}
export function deleteMarketingSubscription(authUserId, marketingType, marketingUnsubscribeToken) {
  return fetchRaw(
    `${endpoint('core')}/user/${authUserId}/marketing/${marketingType}`,
    { marketing_unsubscribe_token: marketingUnsubscribeToken },
    { method: 'PUT', useOverwriteRequestMethod: false }
  )
}
