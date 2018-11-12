export default {
  cardName: {
    field: 'Card name',
    rules: [
      { name: 'isLength', options: { min: 1 } },
      { name: 'isLength', options: { max: 200 } },
    ],
  },

  cardNumber: {
    field: 'Card number',
    rules: [
      { name: 'isLength', options: { min: 10 } },
      { name: 'isLength', options: { max: 19 } },
    ],
  },

  cardType: {
    field: 'Card Type',
    rules: [
      { name: 'isLength', options: { min: 1 } },
    ],
  },

  cv2: {
    field: 'Security code',
    rules: [
      { name: 'isLength', options: { min: 1 } },
      { name: 'isLength', options: { max: 3 } },
    ],
  },

  cardExpiryMonth: {
    field: 'Expiry Month',
    rules: [
      { name: 'isLength', options: { min: 1 } },
    ],
  },

  cardExpiryYear: {
    field: 'Expiry Year',
    rules: [
      { name: 'isLength', options: { min: 1 } },
    ],
  },
}
