import { fetch } from 'utils/fetch'
import {
  withMockEnvironmentAndDomain
} from '_testing/isomorphic-environment-test-utils'
import { fetchRefundAmount } from './fetchRefundAmount'

const ACCESS_TOKEN = 'shhh-is-a-secret'
const MOCK_RESPONSE = {
  status: 'ok',
  data: {
    value: '0.5',
    experiment_reference: null,
    num_orders_checked: 4,
    num_orders_compensated: 1,
    multi_complaint_total_value: '2.5',
    type: 'credit',
    key_ingredients: []
  }
}

const FETCH_REFUND_BODY = {
  customer_id: '40790784',
  order_id: '48671010',
  ingredients: JSON.stringify([
    {
      ingredient_uuid: '4e949ce8-d92c-43fa-8c0d-110d903d6e60',
      recipe_gousto_reference: '347'
    }
  ])
}

jest.mock('utils/fetch')
fetch.mockResolvedValue(MOCK_RESPONSE)

describe('fetchRefundAmount', () => {
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

  let response
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('Given fetchRefundAmount function is called with the correct payload', () => {
    beforeEach(async () => {
      response = await fetchRefundAmount(ACCESS_TOKEN, FETCH_REFUND_BODY)
    })

    test('the fetch function is called with the right parameters', () => {
      expect(fetch).toHaveBeenCalledWith(
        ACCESS_TOKEN,
        'https://production-api.gousto.co.uk/ssr/v3/value',
        FETCH_REFUND_BODY,
        'GET',
        'default',
        {
          'Content-Type': 'application/json'
        },
        null,
        false
      )
      expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('it returns the response received without modifying it', () => {
      expect(response).toBe(MOCK_RESPONSE)
    })
  })
})
