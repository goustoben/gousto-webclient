import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const customersApi = {
  fetchPauseReasons,
  customerSignup,
  fetchIntervals,
}

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

export function customerSignup(accessToken, reqData) {
  return fetch(accessToken, `${endpoint('customers', routes.version.customersV2)}${routes.customers.signup}`, reqData, 'POST')
}

export function newsletterSubscribe(email) {
  return fetch(null, `${endpoint('customers', routes.version.customers)}${routes.customers.newsletterSubscribers}`, { email }, 'POST')
}

export const fetchIntervals = () => (
  fetch(null, `${endpoint('customers', routes.version.customers)}${routes.customers.intervals}`, {}, 'GET')
)

export default customersApi
