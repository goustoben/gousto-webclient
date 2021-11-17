export const PaymentMethod = {
  Card: 'Card',
  PayPal: 'PayPal'
}

export const signupConfig = {
  defaultSteps: ['boxSize', 'postcode', 'delivery'],
  paymentBeforeChoosingSteps: ['boxSize', 'recipesPerBox', 'postcode', 'delivery'],
  steps: [
    { name: 'boxSize', slug: 'box-size' },
    { name: 'recipesPerBox', slug: 'recipes-per-box' },
    { name: 'postcode', slug: 'postcode' },
    { name: 'delivery', slug: 'delivery-options' },
  ],
  payment_types: {
    card: 'card',
    paypal: 'paypal',
  },
  address_types: {
    billing: 'billing',
    shipping: 'shipping',
  },
  boxSizeStep: {
    title: 'Choose your subscription frequency',
    subtitle: 'You can choose a one off box or a monthly subscription',
    cta: 'Select',
    boxSize: {
      1: {
        description: 'This smaller box is packed with enough pre-measured ingredients for each recipe to feed 2 people.',
        image: require('media/images/box-prices/two-person-box.jpg'),
      },
      2: {
        description: 'This larger box is packed with enough pre-measured ingredients for each recipe to feed 4 people.',
        image: require('media/images/box-prices/four-person-box.jpg'),
      },
    },
    discountApplied: 'Discount applied',
    boxSizeTypes: [
      {
        heading: 'One-off box',
        suitableFor: ['Perfect for a gift or a one-off treat!'],
        ctaText: 'Choose one-off box',
        value: 1,
      },
      {
        heading: 'Monthly subscription',
        suitableFor: ['One bottle of gin, mixers, snacks and a magazine per month'],
        ctaText: 'Choose subscription',
        value: 2,
      },
    ],
  },
  recipesPerBoxStep: {
    title: 'How many recipes do you want per box?',
    recipesPerBoxPossibleValues: [1, 2],
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
