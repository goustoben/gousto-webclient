import endpoint from 'config/endpoint'
import routes from 'config/routes'
import { fetch } from 'utils/fetch'

export function applyPromo(accessToken, promoCode) {
  return fetch(accessToken, `${endpoint('core')}/user/current/applyPromotionCode/${promoCode}`, {}, 'POST')
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
  return fetch(accessToken, `${endpoint('core')}${routes.core.userAddress}`, { type: 'shipping' }, 'GET')
}

export function fetchUserOrders(accessToken, reqData) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.userOrders}`, reqData, 'GET')
}

export function fetchUserProjectedDeliveries(accessToken) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.userProjectedDeliveries}`, {}, 'GET')
}

export function skipDelivery(accessToken, deliveryDayId) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.userDelivery}/disable`, { delivery_day_id: deliveryDayId }, 'PUT')
}

export function restoreDelivery(accessToken, userId, deliveryDayId) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.user}/${userId}/subscription/delivery/enable`, {
    delivery_day_id: deliveryDayId,
  }, 'PUT')
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
  return fetch(accessToken, `${endpoint('core')}/user/current/referral`, { emails: [email] }, 'POST')
}

export function addPaymentMethod(accessToken, reqData, userId) {
  return fetch(accessToken, `${endpoint('core')}/user/${userId}/paymentMethod`, reqData, 'PUT')
}

export function fetchUserAddresses(accessToken, userId) {
  return fetch(accessToken, `${endpoint('customers', routes.version.customers)}/customers/${userId}/addresses`, {}, 'GET')
}

export function deleteMarketingSubscription(authUserId, marketingType, marketingUnsubscribeToken) {
  return fetch(
    null,
    `${endpoint('core')}/user/${authUserId}/marketing/${marketingType}`,
    { marketing_unsubscribe_token: marketingUnsubscribeToken },
    'DELETE'
  )
}
