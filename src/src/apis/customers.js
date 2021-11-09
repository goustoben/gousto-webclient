import { fetch } from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const customersApi = {
  fetchPauseReasons,
  customerSignup,
}

export function fetchPauseReasons(accessToken, userId = null) {
  const args = {
    includes: ['steps'],
  }

  return fetch(
    accessToken,
    `${endpoint('customers')}/customers/${userId}/subscription/pause-reasons`,
    args,
    'GET'
  )
}

export function customerSignup(accessToken, reqData) {
  const TIMEOUT = 50000

  return fetch(accessToken, `${endpoint('customers', 2)}${routes.customers.signup}`, reqData, 'POST', 'default', {}, TIMEOUT)
}

export function newsletterSubscribe(email) {
  return fetch(null, `${endpoint('customers')}${routes.customers.newsletterSubscribers}`, { email }, 'POST')
}

export const fetchReference = () => (
  fetch(null, `${endpoint('customers')}${routes.customers.reference}`, {}, 'GET')
)

export const fetchPromoCodeValidity = (params) => (
  fetch(null, `${endpoint('customers')}${routes.customers.promocode}`, params, 'GET')
)

export default customersApi
