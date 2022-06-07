import { fetchRaw } from 'utils/fetch'
import { validateIngredients } from './ssrIngredients'

jest.mock('config/endpoint', () => (service) => `${service}-endpoint-prefix`)
jest.mock('utils/fetch', () => ({
  fetchRaw: jest.fn()
}))

const MOCK_FETCH_RESULT = {
  data: {
    valid: true,
  }
}
const ACCESS_TOKEN = 'abcd1234'
const USER_ID = '12345'
const ORDER_ID = '6789'
const INGREDIENTS = [{ ingredient_uuid: '45645', recipe_gousto_reference: '987' }]
const BODY = {
  customer_id: USER_ID,
  order_id: ORDER_ID,
  ingredients: JSON.stringify(INGREDIENTS),
}

describe('validateIngredients', () => {
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
      'ssr-endpoint-prefix/validate-ingredients',
      { customer_id: USER_ID, order_id: ORDER_ID, ingredients: JSON.stringify(INGREDIENTS)},
      { accessToken: ACCESS_TOKEN, method: 'GET', headers: { 'Content-Type': 'application/json' } }
    )
  })

  test('returns the result of the fetch unchanged', async () => {
    expect(result).toEqual(MOCK_FETCH_RESULT)
  })
})
