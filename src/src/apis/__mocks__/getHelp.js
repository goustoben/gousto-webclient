const fetchOrderIssuesMockResponse = {
  "status": "ok",
  "data": [
    {
      "category": {
        "require_description": false,
        "id": 101,
        "name": "Missing ingredients"
      },
      "type": "category",
      "group_label": null
    },
    {
      "category": {
        "require_description": false,
        "id": 102,
        "name": "Wrong ingredients"
      },
      "type": "category",
      "group_label": null
    },
  ],
}

const fetchOrderIssues = jest.fn()
fetchOrderIssues.mockImplementation(() => Promise.resolve(
  fetchOrderIssuesMockResponse
))

const fetchRefundAmount = jest.fn()
fetchRefundAmount.mockImplementation(() => Promise.resolve(
  { data: { value: 7.77, type: 'a-type' } }
))

const setComplaint = jest.fn()
setComplaint.mockResolvedValue({})

const validateOrder = jest.fn()
validateOrder.mockResolvedValue({
  data: { valid: true }
})

export {
  fetchOrderIssues,
  fetchOrderIssuesMockResponse,
  fetchRefundAmount,
  setComplaint,
  validateOrder,
}
