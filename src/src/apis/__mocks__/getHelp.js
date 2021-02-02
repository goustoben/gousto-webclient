const fetchOrderIssuesMockResponse = {
  status: 'ok',
  data: [
    {
      category: {
        requireDescription: false,
        id: 101,
        name: 'Missing ingredients'
      },
      type: 'category',
      groupLabel: null
    },
    {
      category: {
        requireDescription: false,
        id: 102,
        name: 'Wrong ingredients'
      },
      type: 'category',
      groupLabel: null
    },
    {
      category: {
        requireDescription: true,
        id: 104,
        name: 'Fruit or Veg - Mouldy'
      },
      type: 'subcategory',
      groupLabel: 'Ingredient quality'
    },
    {
      category: {
        requireDescription: false,
        id: 105,
        name: 'Fruit or Veg - not fresh'
      },
      type: 'subcategory',
      groupLabel: 'Ingredient quality'
    },
    {
      category: {
        requireDescription: true,
        id: 107,
        name: 'Meat - gristle or bones'
      },
      type: 'subcategory',
      groupLabel: 'Another group'
    },
  ],
}

// eslint-disable-next-line no-undef
const fetchOrderIssues = jest.fn()
fetchOrderIssues.mockResolvedValue(fetchOrderIssuesMockResponse)

// eslint-disable-next-line no-undef
const fetchRefundAmount = jest.fn()
fetchRefundAmount.mockResolvedValue({ data: { value: 7.77, type: 'a-type' } })

// eslint-disable-next-line no-undef
const setComplaint = jest.fn()
setComplaint.mockResolvedValue({})

// eslint-disable-next-line no-undef
const validateOrder = jest.fn()
validateOrder.mockResolvedValue({
  data: { valid: true }
})

// eslint-disable-next-line no-undef
const validateIngredients = jest.fn()
validateIngredients.mockResolvedValue({
  data: { valid: true }
})

export {
  fetchOrderIssues,
  fetchOrderIssuesMockResponse,
  fetchRefundAmount,
  setComplaint,
  validateOrder,
  validateIngredients,
}
