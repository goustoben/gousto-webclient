export const validationRules = {
  cardName: {
    field: 'Card name',
    rules: [
      { name: 'isLength', options: { min: 1 } },
      { name: 'isLength', options: { max: 200 } },
    ],
  },
}
