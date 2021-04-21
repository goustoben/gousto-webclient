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

export const translateCheckoutErrorToMessageCode = (errorName, errorValue) => {
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
    switch (errorValue) {
    case '422-registration-failed':
    case '401-auth-error': {
      return 'user-exists'
    }
    case '422-payment-failed': {
      return 'payment-failure'
    }
    case '409-duplicate-details': {
      return 'user-promo-invalid'
    }
    case '409-missing-preview-order': {
      return 'out-of-stock'
    }
    case 'validation.phone.customer.phone_number': {
      return 'user-phone-number-invalid'
    }
    case '3ds-challenge-failed': {
      return '3ds-challenge-failed'
    }
    case '422-insufficient-funds': {
      return '422-insufficient-funds'
    }
    case '422-declined-do-not-honour': {
      return '422-declined-do-not-honour'
    }
    default: {
      return 'generic'
    }
    }
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
  default: {
    return 'generic'
  }
  }
}
