import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

export function fetchPauseReasons(accessToken, userId = null) {
  const args = {
    includes: ['steps'],
  }

  return fetch(
    accessToken,
    `${endpoint('customers', routes.version.customers)}/customers/${userId}/subscription/pause-reasons`,
    args,
    'GET'
  )
}

export function customerSignup(accessToken, reqData, isCheckout) {
  const version = isCheckout ? routes.version.customers2 : routes.version.customers

  return fetch(accessToken, `${endpoint('customers', version)}${routes.customers.signup}`, reqData, 'POST')
}

export function newsletterSubscribe(email) {
  return fetch(null, `${endpoint('customers', routes.version.customers)}${routes.customers.newsletterSubscribers}`, { email }, 'POST')
}

export const fetchIntervals = () => (
  fetch(null, `${endpoint('customers', routes.version.customers)}${routes.customers.intervals}`, {}, 'GET')
)

export default {
  fetchPauseReasons,
  customerSignup,
  fetchIntervals,
}
