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
  titles: [
    'miss',
    'mr',
    'mrs',
    'ms',
    'dr',
  ],
  maxNameLen: 255,
  promoValidationTime: 500,
  leaveBoxOptions: [
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
    leaveBox: 'You don\'t have to be in to accept your deliveries, just tell us the safest place to leave your boxes. Please choose somewhere dry and easily accessible - we can\'t leave boxes in cupboards, in wheelie bins, through windows, or over fences.',
    addressType: 'This makes it easier for our courier to deliver your To aid delivery, please suggest a safe, dry and easily accessible place. Our couriers are unable to leave boxes in cupboards, wheelie bins, through windows, or over fences.',
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
    'out-of-stock': 'There\'s been an error creating your order, please go back to the menu and checkout again',
    postcodeInvalid: 'Please enter a valid postcode',
    invalidPromocode: 'This promocode is not valid',
    promoCode: {
      empty: 'Please enter a promocode',
      valid: 'Promocode added',
      invalid: 'This promocode is not valid',
      expired: 'This promocode has expired',
      forCustomers: 'This promocode is for existing customers',
    },
    generic: 'An error occured, please try again or contact customer service.',
    'payment-failure': 'Payment Failed: Please check your Card Number, Expiry Date, Security Number and Billing Address are all correct',
    'user-exists': 'An account with that e-mail address already exists',
    'user-promo-invalid': 'This discount code is only available for new customers. It looks like you or someone in your household already has a Gousto account.',
    'card-tokenisation-failed': 'Sorry, we don’t accept that type of card. Please try another one.',
    'network-failure': 'Please check your network connection and try again.',
    'valid-card-details-not-provided': 'Your Card Number, Expiry Date and Security Number are required',
    'user-phone-number-invalid': 'Oh dear, it looks like there was a problem with the phone number you gave us. Please go back a step and try again.',
  },
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
}
