const fetchOrderIssuesMockResponse = {
  "status": "ok",
  "data": [
    {
      "category": {
        "requireDescription": false,
        "id": 101,
        "name": "Missing ingredients"
      },
      "type": "category",
      "groupLabel": null
    },
    {
      "category": {
        "requireDescription": false,
        "id": 102,
        "name": "Wrong ingredients"
      },
      "type": "category",
      "groupLabel": null
    },
    {
      "category": {
        "requireDescription": true,
        "id": 104,
        "name": "Fruit or Veg - Mouldy"
      },
      "type": "subcategory",
      "groupLabel": "Ingredient quality"
    },
    {
      "category": {
        "requireDescription": false,
        "id": 105,
        "name": "Fruit or Veg - not fresh"
      },
      "type": "subcategory",
      "groupLabel": "Ingredient quality"
    },
    {
      "category": {
        "requireDescription": true,
        "id": 107,
        "name": "Meat - gristle or bones"
      },
      "type": "subcategory",
      "groupLabel": "Another group"
    },
  ],
}

const fetchOrderIssues = jest.fn()
fetchOrderIssues.mockResolvedValue(fetchOrderIssuesMockResponse)

const fetchRefundAmount = jest.fn()
fetchRefundAmount.mockResolvedValue({ data: { value: 7.77, type: 'a-type' } })

const fetchRefundAmountV2 = jest.fn()
fetchRefundAmountV2.mockResolvedValue({ data: { value: 7.77, type: 'a-type' } })

const setComplaint = jest.fn()
setComplaint.mockResolvedValue({})

const setComplaintV2 = jest.fn()
setComplaintV2.mockResolvedValue({})

const validateOrder = jest.fn()
validateOrder.mockResolvedValue({
  data: { valid: true }
})

const validateIngredients = jest.fn()
validateIngredients.mockResolvedValue({
  data: { valid: true }
})

const validateIngredientsV2 = jest.fn()
validateIngredientsV2.mockResolvedValue({
  data: { valid: true }
})

export {
  fetchOrderIssues,
  fetchOrderIssuesMockResponse,
  fetchRefundAmount,
  fetchRefundAmountV2,
  setComplaint,
  setComplaintV2,
  validateOrder,
  validateIngredients,
  validateIngredientsV2,
}
