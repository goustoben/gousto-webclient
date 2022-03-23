import { fetch } from 'utils/fetch'
import endpoint from 'config/endpoint'

const getPaymentsEndpoint = () => `${endpoint('payments')}/payments/`

const HEADERS = {
  'Content-Type': 'application/json',
}

function authPayment(reqData, sessionId) {
  return fetch(null, `${getPaymentsEndpoint()}payment-auth?session_id=${sessionId}`, reqData, 'POST', undefined, HEADERS)
}

function checkPayment(checkoutSessionId, goustoSessionId) {
  return fetch(null, `${getPaymentsEndpoint()}payments/${checkoutSessionId}?session_id=${goustoSessionId}`, null, 'GET', undefined, HEADERS)
}

function fetchPayPalToken() {
  const params = { provider: 'paypal' }

  return fetch(null, `${getPaymentsEndpoint()}token`, params, 'GET', undefined, HEADERS)
}

function signupPayment(reqData, provider, sessionId) {
  return fetch(null, `${getPaymentsEndpoint()}signup-payments?provider=${provider}&session_id=${sessionId}`, reqData, 'POST', undefined, HEADERS)
}

function get3DSCompliantToken(goustoRef) {
  return fetch(null, `${getPaymentsEndpoint()}3ds-compliant/${goustoRef}`, {}, 'GET', undefined, HEADERS)
}

export {
  authPayment,
  checkPayment,
  fetchPayPalToken,
  signupPayment,
  get3DSCompliantToken,
}
