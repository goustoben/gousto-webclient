module.exports = {
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
  }
}
