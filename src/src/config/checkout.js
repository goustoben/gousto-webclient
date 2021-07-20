module.exports = {
  steps: [{
    step: 'boxdetails',
    text: 'next: box details',
    visible: [1],
    aside: false,
  }, {
    step: 'promocode',
    text: 'next: promocode',
    visible: [1],
    aside: true,
  }, {
    step: 'aboutyou',
    text: 'next: about you',
    visible: [2],
    aside: false,
  }, {
    step: 'delivery',
    text: 'next: delivery',
    visible: [2],
    aside: false,
  }, {
    step: 'payment',
    text: 'next: payment',
    visible: [3],
    aside: false,
  }, {
    step: 'summary',
    text: 'next: summary',
    visible: [1, 2, 3],
    aside: true,
  }, {
    step: 'cta',
    text: 'Checkout securely',
    visible: [1],
    mobileOnly: true,
    aside: false,
  }],
  requiredFields: [
    'name_last',
    'name_first',
    'email',
    'password',
    'title',

    'deliveryaddress1',
    'deliverytown',
    'deliverypostcode',

    'deliveryname',
    'deliveryinstruction',
    'phone',
    'order_id',

    'card_type',
    'card_number',
    'card_cvv2',
    'card_holder',
    'card_expires',

    'billingaddresstoggle',
  ],
  mobileSteps: {
    boxdetails: 1,
    'your-details': 2,
    payment: 3,
  },
  labels: {
    checkout: 'Checkout securely',
    submit: 'Submit order',
  },
  maxNameLen: 255,
  promoValidationTime: 500,
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
  deliverToOptions: [
    { value: 'home', label: 'Home' },
    { value: 'work', label: 'Work' },
    { value: 'other', label: 'Other' },
  ],
  leaveBoxDesc: {
    neighbour: 'Additional information, door number, etc:',
    other: 'More details about where to leave your box?',
  },
  tooltip: {
    security: 'The 3-digit security code is found on the back of the card',
    outOfstock: 'You got the last one',
    limitReached: 'You\'ve run out of space in your box!',
  },
  testSagePay: {
    card_type: 'VISA',
    card_number: '4929 0000 0000 6',
    card_cvv2: '123',
    card_holder: 'asdfasdf',
    card_expires: '022020',
  },
  errorMessage: {
    email: 'Invalid email',
    password: 'Password must be at least 6 characters long',
    lastnameLengthMax: 'Name must be under 255 characters',
    lastnameLengthMin: 'Please enter your last name',
    firstnameLengthMax: 'Name must be under 255 characters',
    firstnameLengthMin: 'Please enter your first name',
    nameNumber: 'Name cannot contain numbers',
    customDeliveryLength: 'Please tell us where to leave your box',
    phone: 'Please provide a valid UK phone number',
    cardNameLength: 'Please enter your name as it appears on your card',
    cardNameType: 'No special characters allowed',
    cardNumberLength: 'Please enter a valid credit card number',
    cardTypeLength: 'Please select a card type',
    expiryDate: {
      required: 'Please enter expiry date',
      passed: 'Expiry date has already passed',
    },
    securityCodeLength: 'Please enter 3-digit security code',
    securityCodeType: 'Please enter 3 digit numerical security code',
    addressTypeLength: 'Please enter a valid address',
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
      message: ' with this email or sign up with a different email.',
      prependLoginLinkToMessage: true,
      loginLinkText: 'Log in',
    },
    'payment-failure': {
      header: 'Payment failed',
      message: 'Try again or use a different card or PayPal. If you’re still experiencing difficulties, contact your bank.',
    },
    'user-promo-invalid': {
      header: 'Discount removed',
      message: 'A discount has already been used by this account.',
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
    'valid-card-details-not-provided': {
      header: 'Payment failed',
      message: 'Please check your card details and try again.'
    },
    '422-insufficient-funds': {
      header: 'Insufficient funds',
      message: 'Use a different card or PayPal. If you’re still experiencing difficulties, contact your bank or try again later.',
    },
    '422-declined-do-not-honour': {
      header: 'Bank declined payment',
      message: 'Use a different card or PayPal. If you’re still experiencing difficulties, contact your bank or try again later.',
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
  errorsToHandleForDecoupledPayment: [
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
  ]
}
