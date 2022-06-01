import { actionTypes } from 'actions/actionTypes'

export function inferCardType(cardNumber) {
  let type = ''

  if (/^(4026|417500|4405|4508|4844|4913|4917)/.test(cardNumber)) {
    type = 'UKE'
  } else if (/^(50|63|67)/.test(cardNumber)) {
    type = 'MAESTRO'
  } else if (/^4/.test(cardNumber)) {
    type = 'VISA'
  } else if (/^5[1-5]/.test(cardNumber)) {
    type = 'MC'
  } else if (/^3/.test(cardNumber)) {
    type = 'AMEX'
  }

  return type
}

export function getAddress(form) {
  return {
    name: form.get('companyName', 'My Address'),
    line1: form.get('houseNo', ''),
    line2: form.get('street', ''),
    line3: form.get('line3', ''),
    town: form.get('town'),
    county: form.get('county'),
    postcode: form.get('postcode'),
  }
}

const getCheckoutSignupMapping = (code, isGoustoOnDemandEnabled) => {
  const maps = {
    'validation.phone.customer.phone_number': 'user-phone-number-invalid',
    '3ds-challenge-failed': isGoustoOnDemandEnabled ? 'gousto-on-demand-3ds-challenge-failed' : '3ds-challenge-failed',
    '401-auth-error': 'user-exists',
    '409-duplicate-details': isGoustoOnDemandEnabled ? 'gousto-on-demand-user-promo-invalid' : 'user-promo-invalid',
    '409-offer-has-been-used': 'offer-has-been-used',
    '409-missing-preview-order': 'out-of-stock',
    '422-declined-do-not-honour': isGoustoOnDemandEnabled ? 'gousto-on-demand-422-declined-do-not-honour' : '422-declined-do-not-honour',
    '422-insufficient-funds': isGoustoOnDemandEnabled ? 'gousto-on-demand-422-insufficient-funds' : '422-insufficient-funds',
    '422-payment-failed': isGoustoOnDemandEnabled ? 'gousto-on-demand-payment-failure' : 'payment-failure',
    '422-registration-failed': 'user-exists',
  }

  return maps[code] || (isGoustoOnDemandEnabled ? 'gousto-on-demand-generic' : 'generic')
}

const getSignupPaymentMappings = (code, isGoustoOnDemandEnabled) => {
  const maps = {
    '3ds-challenge-failed': isGoustoOnDemandEnabled ? 'gousto-on-demand-3ds-challenge-failed' : 'signup-payments-challenge-failed',
    '422-declined-do-not-honour': isGoustoOnDemandEnabled ? 'gousto-on-demand-422-declined-do-not-honour' : 'signup-payments-declined-do-not-honour',
    '422-insufficient-funds': isGoustoOnDemandEnabled ? 'gousto-on-demand-422-insufficient-funds' : 'signup-payments-insufficient-funds',
    '422-payment-failed': isGoustoOnDemandEnabled ? 'gousto-on-demand-payment-failure' : 'signup-payments-payment-failure',
  }

  return maps[code] || getCheckoutSignupMapping(code, isGoustoOnDemandEnabled)
}

export const translateCheckoutErrorToMessageCode = (errorName, errorValue, isGoustoOnDemandEnabled) => {
  switch (errorName) {
  case actionTypes.PAYPAL_TOKEN_FETCH_FAILED: {
    return 'paypal-token-fetch-failed'
  }
  case actionTypes.PAYPAL_ERROR: {
    return 'paypal-error'
  }
  case actionTypes.CHECKOUT_ERROR_DUPLICATE: {
    return 'postcodeInvalid'
  }
  case actionTypes.CHECKOUT_SIGNUP: {
    return getCheckoutSignupMapping(errorValue, isGoustoOnDemandEnabled)
  }
  case actionTypes.CHECKOUT_PAYMENT: {
    return getSignupPaymentMappings(errorValue, isGoustoOnDemandEnabled)
  }
  case actionTypes.CARD_TOKENIZATION_FAILED: {
    return 'card-tokenization-failed'
  }
  case actionTypes.NETWORK_FAILURE: {
    return 'network-failure'
  }
  case actionTypes.VALID_CARD_DETAILS_NOT_PROVIDED: {
    return 'valid-card-details-not-provided'
  }
  case actionTypes.CHECKOUT_SIGNUP_LOGIN: {
    return 'signupLoginFailed'
  }
  default: {
    return 'generic'
  }
  }
}
