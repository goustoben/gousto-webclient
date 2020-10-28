import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'

const PAYMENTS_API = `${endpoint('payments', 'v1')}/payments`
const HEADERS = {
  'Content-Type': 'application/json',
}

function authPayment(reqData) {
  return fetch(null, `${PAYMENTS_API}/payment-auth`, reqData, 'POST', undefined, HEADERS)
}

function checkPayment(sessionId) {
  return fetch(null, `${PAYMENTS_API}/payments/${sessionId}`, null, 'GET', undefined, HEADERS)
}

function fetchPayPalToken() {
  const params = { provider: 'paypal' }

  return fetch(null, `${PAYMENTS_API}/token`, params, 'GET', undefined, HEADERS)
}

export {
  authPayment,
  checkPayment,
  fetchPayPalToken,
}
