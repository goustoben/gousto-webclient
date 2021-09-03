export const PaymentMethod = {
  Card: 'Card',
  PayPal: 'PayPal'
}

export const signupConfig = {
  defaultSteps: ['boxSize', 'postcode', 'delivery'],
  paymentBeforeChoosingSteps: ['boxSize', 'recipesPerBox', 'postcode', 'delivery'],
  steps: [
    { name: 'welcome', slug: 'welcome' },
    { name: 'boxSize', slug: 'box-size' },
    { name: 'recipesPerBox', slug: 'recipes-per-box' },
    { name: 'kidsCookFor', slug: 'cook-for-children' },
    { name: 'postcode', slug: 'postcode' },
    { name: 'delivery', slug: 'delivery-options' },
    { name: 'finish', slug: 'finish' },
    { name: 'foodPref', slug: 'food-pref' },
    { name: 'adultsCookFor', slug: 'cook-for-adults' },
  ],
  payment_types: {
    card: 'card',
    paypal: 'paypal',
  },
  address_types: {
    billing: 'billing',
    shipping: 'shipping',
  },
  subscriptionOptions: {
    subscription: 'subscription',
    transactional: 'transactional'
  },
  boxSizeStep: {
    title: 'Choose your box size',
    subtitle: 'You can choose 2, 3 or 4 recipes per box.',
    cta: 'Select',
    boxSize: {
      2: {
        description: 'This smaller box is packed with enough pre-measured ingredients for each recipe to feed 2 people.',
        image: require('media/images/box-prices/two-person-box.jpg'),
      },
      4: {
        description: 'This larger box is packed with enough pre-measured ingredients for each recipe to feed 4 people.',
        image: require('media/images/box-prices/four-person-box.jpg'),
      },
    },
    discountApplied: 'Discount applied',
    boxSizeTypes: [
      {
        heading: 'Regular box',
        suitableFor: ['2 adults (or 1 + leftovers)', '1 adult and 1-2 children'],
        ctaText: 'Choose regular box',
        value: 2,
      },
      {
        heading: 'Large box',
        suitableFor: ['4 adults (or 2-3 + leftovers)', '2 adults and 2-3 children'],
        ctaText: 'Choose large box',
        value: 4,
      },
    ],
  },
  recipesPerBoxStep: {
    title: 'How many recipes do you want per box?',
    recipesPerBoxPossibleValues: [2, 3, 4],
  },
  postCodeStep: {
    title: 'Where would you like your boxes delivered?',
    goustoOnDemandTitle: 'Where would you like your box delivered?',
    reminder: 'Free UK delivery, 7 days a week',
    doNotDeliverErrorMessage: 'Sorry, it looks like we don’t currently deliver to your area.',
    genericErrorMessage: 'Please enter a valid postcode'
  },
  deliveryOptionsStep: {
    title: 'Which delivery day would you like?',
    goustoOnDemandTitle: 'When do you want your box delivered?',
  },
  discountAppliedText: 'View this when you reach the checkout.',
  sellThePropositionPagePath: 'about',
  checkAccountPageSlug: 'start',
  applyVoucherPageSlug: 'apply-voucher',
}
