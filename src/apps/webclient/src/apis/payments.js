import { fetch } from 'utils/fetch'
import endpoint from 'config/endpoint'

const PAYMENTS_API = `${endpoint('payments')}/payments`
const HEADERS = {
  'Content-Type': 'application/json',
}

function authPayment(reqData, sessionId) {
  return fetch(null, `${PAYMENTS_API}/payment-auth?session_id=${sessionId}`, reqData, 'POST', undefined, HEADERS)
}

function checkPayment(checkoutSessionId, goustoSessionId) {
  return fetch(null, `${PAYMENTS_API}/payments/${checkoutSessionId}?session_id=${goustoSessionId}`, null, 'GET', undefined, HEADERS)
}

function fetchPayPalToken() {
  const params = { provider: 'paypal' }

  return fetch(null, `${PAYMENTS_API}/token`, params, 'GET', undefined, HEADERS)
}

function signupPayment(reqData, provider, sessionId) {
  return fetch(null, `${PAYMENTS_API}/signup-payments?provider=${provider}&session_id=${sessionId}`, reqData, 'POST', undefined, HEADERS)
}

function get3DSCompliantToken(goustoRef) {
  return fetch(null, `${PAYMENTS_API}/3ds-compliant/${goustoRef}`, {}, 'GET', undefined, HEADERS)
}

export {
  authPayment,
  checkPayment,
  fetchPayPalToken,
  signupPayment,
  get3DSCompliantToken,
}
