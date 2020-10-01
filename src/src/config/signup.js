export const PaymentMethod = {
  Unchosen: 'Unchosen',
  Card: 'Card',
  Paypal: 'Paypal'
}

export const signupConfig = {
  defaultSteps: ['boxSize', 'postcode', 'delivery'],
  steps: [
    { name: 'welcome', slug: 'welcome' },
    { name: 'boxSize', slug: 'box-size' },
    { name: 'kidsCookFor', slug: 'cook-for-children' },
    { name: 'postcode', slug: 'postcode' },
    { name: 'delivery', slug: 'delivery-options' },
    { name: 'finish', slug: 'finish' },
    { name: 'foodPref', slug: 'food-pref' },
    { name: 'adultsCookFor', slug: 'cook-for-adults' },
  ],
  payment_types: {
    card: 'card',
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
    title: 'How many people do you cook for?',
    subtitle: 'You can always plan for some tasty leftovers.',
    pricingClaritySubtitle: 'You can choose 2, 3 or 4 recipes per box. Our 4-person box works for 2 adults and 2-3 children.',
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
    discountApplied: 'Discount applied'
  },
  postCodeStep: {
    title: 'Where would you like your boxes delivered?'
  },
  deliveryOptionsStep: {
    title: 'Which delivery day would you like?'
  }
}
