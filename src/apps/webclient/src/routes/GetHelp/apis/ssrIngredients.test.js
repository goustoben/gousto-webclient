import { fetchRaw, fetch } from 'utils/fetch'
import {
  withMockEnvironmentAndDomain
} from '_testing/isomorphic-environment-test-utils'
import {
  validateOrder,
  validateIngredients,
  fetchRefundAmount,
  setComplaint,
} from './ssrIngredients'

jest.mock('utils/fetch', () => ({
  fetchRaw: jest.fn(),
  fetch: jest.fn(),
}))

const ACCESS_TOKEN = 'abcd1234'
const USER_ID = '12345'
const ORDER_ID = '6789'

describe('validateIngredients', () => {
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

  const MOCK_FETCH_RESULT = {
    data: {
      valid: true,
    }
  }

  const INGREDIENTS = [{ ingredient_uuid: '45645', recipe_gousto_reference: '987' }]
  const BODY = {
    customer_id: USER_ID,
    order_id: ORDER_ID,
    ingredients: JSON.stringify(INGREDIENTS),
  }
  let result

  beforeEach(async () => {
    fetchRaw.mockResolvedValue(MOCK_FETCH_RESULT)
    result = await validateIngredients(ACCESS_TOKEN, BODY)
  })

  afterEach(() => {
    fetchRaw.mockClear()
  })

  test('calls the validate-ingredients endpoint with the right parameters', async () => {
    expect(fetchRaw).toHaveBeenCalledTimes(1)
    expect(fetchRaw).toHaveBeenCalledWith(
      'https://production-api.gousto.co.uk/ssr/v3/validate-ingredients',
      { customer_id: USER_ID, order_id: ORDER_ID, ingredients: JSON.stringify(INGREDIENTS)},
      { accessToken: ACCESS_TOKEN, method: 'GET', headers: { 'Content-Type': 'application/json' } }
    )
  })

  test('returns the result of the fetch unchanged', async () => {
    expect(result).toEqual(MOCK_FETCH_RESULT)
  })
})

describe('validateOrder', () => {
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

  const MOCK_RESPONSE = { data: [1, 2, 3] }
  const VALIDATE_ORDER_BODY = {
    customer_id: USER_ID,
    order_id: ORDER_ID,
  }
  let response

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given validateOrder function is called with the correct payload', () => {
    beforeEach(async () => {
      fetch.mockResolvedValue(MOCK_RESPONSE)

      response = await validateOrder(ACCESS_TOKEN, VALIDATE_ORDER_BODY)
    })

    test('the fetch function is called with the right parameters', () => {
      expect(fetch).toHaveBeenCalledWith(
        ACCESS_TOKEN,
        'https://production-api.gousto.co.uk/ssr/v3/validate',
        VALIDATE_ORDER_BODY,
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

describe('fetchRefundAmount', () => {
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

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
    customer_id: USER_ID,
    order_id: ORDER_ID,
    ingredients: JSON.stringify([
      {
        ingredient_uuid: '4e949ce8-d92c-43fa-8c0d-110d903d6e60',
        recipe_gousto_reference: '347'
      }
    ])
  }
  let response

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given fetchRefundAmount function is called with the correct payload', () => {
    beforeEach(async () => {
      fetch.mockResolvedValue(MOCK_RESPONSE)
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

describe('setComplaint API', () => {
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

  const MOCK_RESPONSE = { data: [1, 2, 3] }
  const SELECTED_INGREDIENTS = {
    '385&3c07d126-f655-437c-aa1d-c38dbbae0398': {
      recipeId: '385',
      ingredientUuid: '3c07d126-f655-437c-aa1d-c38dbbae0398',
      label: '8ml soy sauce',
      recipeGoustoReference: '408',
      issueId: '4',
      issueName: 'Wrong Ingredients',
      issueDescription: 'description A'
    },
    '2223&488d5751-dcff-4985-88c0-bf745ff54904': {
      recipeId: '2223',
      ingredientUuid: '488d5751-dcff-4985-88c0-bf745ff54904',
      label: '40g Cornish clotted cream',
      recipeGoustoReference: '2093',
      issueId: '3',
      issueName: 'Missing Ingredients',
      issueDescription: 'description B'
    },
  }
  const issues = Object.keys(SELECTED_INGREDIENTS).map(key => {
    const {
      issueId,
      ingredientUuid,
      issueDescription,
      recipeGoustoReference,
    } = SELECTED_INGREDIENTS[key]

    return {
      category_id: Number(issueId),
      ingredient_uuid: ingredientUuid,
      description: issueDescription,
      recipe_gousto_reference: recipeGoustoReference,
      portions: 2
    }
  })
  const SET_COMPLAINT_BODY = {
    customer_id: USER_ID,
    order_id: ORDER_ID,
    issues
  }
  let response

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given setComplaint function is called with the correct payload', () => {
    beforeEach(async () => {
      fetch.mockResolvedValue(MOCK_RESPONSE)
      response = await setComplaint(ACCESS_TOKEN, SET_COMPLAINT_BODY)
    })

    test('the fetch function is called with the right parameters', () => {
      expect(fetch).toHaveBeenCalledWith(
        ACCESS_TOKEN,
        'https://production-api.gousto.co.uk/ssr/v3/refund',
        SET_COMPLAINT_BODY,
        'POST',
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
