export const checkoutConfig = {
  leaveBoxOptions: [
    'Please select an option',
    'Front Porch',
    'Back Porch',
    'Garage',
    'Shed/Greenhouse/Outbuilding',
    'Conservatory',
    'Neighbour',
    'Other',
  ],
  tooltip: {
    security: 'The 3-digit security code is found on the back of the card',
    outOfstock: 'You got the last one',
    limitReached: 'You\'ve run out of space in your box!',
  },
  errorMessage: {
    invalidPromocode: 'This discount code is not valid',
    'card-tokenization-failed': 'Sorry, we don’t accept that type of card. Please try another one.',
    'network-failure': 'Please check your network connection and try again.',
    'paypal-token-fetch-failed': {
      header: 'Cannot connect to PayPal',
      message: 'Click the PayPal button below to try again or select card payment above.',
    },
    'paypal-error': {
      header: 'Cannot connect to PayPal',
      message: 'Click the PayPal button below to try again or select card payment above.',
    },
    'postcodeInvalid': {
      header: 'Invalid postcode',
      message: 'Enter a valid postcode, for example, W3 7UP.',
    },
    'user-exists': {
      header: 'Email already in use',
      message: 'Log in with this email to add this offer to your existing Gousto account.',
      showLoginCTA: true,
    },
    'payment-failure': {
      header: 'Payment failed',
      message: 'Try again or use a different card or PayPal. If you’re still experiencing difficulties, contact your bank.',
    },
    'gousto-on-demand-payment-failure': {
      header: 'Payment failed',
      message: 'Try again or use a different card. If you’re still experiencing difficulties, contact your bank.',
    },
    'user-promo-invalid': {
      header: 'Discount removed',
      message: 'A discount has already been used by this account.',
    },
    'gousto-on-demand-user-promo-invalid': {
      header: 'Offer could not be applied',
      message: 'It looks like you already have a Gousto account. Log in with your Gousto email to add this offer to your account.',
      showLoginCTA: true,
    },
    'offer-has-been-used': {
      header: 'Offer has already been used',
      message: 'It looks like your offer has already been used. If this doesn’t look right, contact the person / organisation who gave you the offer.',
    },
    'out-of-stock': {
      header: 'Cannot create order',
      message: 'Go back to the menu and checkout again.',
    },
    'user-phone-number-invalid': {
      header: 'Invalid phone number',
      message: 'Go back a step and enter a valid phone number.',
    },
    '3ds-challenge-failed': {
      header: 'Payment failed',
      message: 'Try again or use a different card or PayPal. If you’re still experiencing difficulties, contact your bank.',
    },
    'gousto-on-demand-3ds-challenge-failed': {
      header: 'Payment failed',
      message: 'Try again or use a different card. If you’re still experiencing difficulties, contact your bank.',
    },
    'valid-card-details-not-provided': {
      header: 'Payment failed',
      message: 'Please check your card details and try again.'
    },
    '422-insufficient-funds': {
      header: 'Insufficient funds',
      message: 'Use a different card or PayPal. If you’re still experiencing difficulties, contact your bank or try again later.',
    },
    'gousto-on-demand-422-insufficient-funds': {
      header: 'Insufficient funds',
      message: 'Use a different card. If you’re still experiencing difficulties, contact your bank or try again later.',
    },
    '422-declined-do-not-honour': {
      header: 'Bank declined payment',
      message: 'Use a different card or PayPal. If you’re still experiencing difficulties, contact your bank or try again later.',
    },
    'gousto-on-demand-422-declined-do-not-honour': {
      header: 'Bank declined payment',
      message: 'Use a different card. If you’re still experiencing difficulties, contact your bank or try again later.',
    },
    'signup-payments-payment-failure': {
      header: 'Payment failed',
      message: 'Try again or use a different card or PayPal. If you’re still experiencing difficulties, contact your bank.',
    },
    'signup-payments-insufficient-funds': {
      header: 'Insufficient funds',
      message: 'Use a different card or PayPal. If you’re still experiencing difficulties, contact your bank or try again later.',
    },
    'signup-payments-declined-do-not-honour': {
      header: 'Bank declined payment',
      message: 'Use a different card or PayPal. If you’re still experiencing difficulties, contact your bank or try again later.',
    },
    'signup-payments-challenge-failed': {
      header: 'Payment failed',
      message: 'Try again or use a different card or PayPal. If you’re still experiencing difficulties, contact your bank.',
    },
    'generic': {
      header: 'An error occurred',
      message: 'Click "Start your subscription" to try again.',
    },
    'gousto-on-demand-generic': {
      header: 'An error occurred',
      message: 'Click "Order your box" to try again.',
    },
  },
  errorsThatClearOrderPreview: [
    'assign-order-failed',
    'activate-oauth-account-failed',
    '422-payment-failed',
    '422-insufficient-funds',
    '422-declined-do-not-honour',
    '422-payment-function-error',
    '3ds-challenge-failed',
  ],
  errorsToHandleForSignupPayment: [
    '422-payment-failed',
    '422-insufficient-funds',
    '422-declined-do-not-honour',
    '3ds-challenge-failed',
  ],
  errorsRequireGoBack: ['user-phone-number-invalid'],
  terms: 'By placing your order you agree to our',
  supportedCardTypes: ['VISA', 'MC', 'DELTA', 'MCDEBIT', 'UKE', 'MAESTRO'],
  cardTypeOptions: [
    { label: 'Select', value: '', icon: 'alt' },
    { label: 'Visa Debit', value: 'DELTA', icon: 'visa' },
    { label: 'Visa', value: 'VISA', icon: 'visa' },
    { label: 'Mastercard', value: 'MC', icon: 'mc' },
    { label: 'Mastercard Debit', value: 'MCDEBIT', icon: 'mc' },
    { label: 'Visa Electron', value: 'UKE', icon: 'visa' },
    { label: 'Maestro', value: 'MAESTRO', icon: 'alt2' },
  ],
  passwordRules: [
    'validation.min.string.password',
    'validation.one_uppercase_character.password',
    'validation.one_lowercase_character.password',
    'validation.one_symbol_or_number.password',
    'validation.password_policy.password',
  ],
}
