import { fetchRaw } from 'utils/fetch'
import { validateRecipeCards } from './ssrrecipecards'

jest.mock('config/endpoint', () => (service) => `${service}-endpoint-prefix`)
jest.mock('utils/fetch', () => ({
  fetchRaw: jest.fn()
}))

const MOCK_FETCH_RESULT = {
  data: {
    eligible_core_recipe_ids: ['111', '333'],
  }
}
const ACCESS_TOKEN = 'abcd1234'
const USER_ID = '12345'
const ORDER_ID = '6789'
const CORE_RECIPE_IDS = ['111', '222', '333', '444']

describe('validateRecipeCards', () => {
  let result

  beforeAll(async () => {
    fetchRaw.mockResolvedValue(MOCK_FETCH_RESULT)
    result = await validateRecipeCards(ACCESS_TOKEN, USER_ID, ORDER_ID, CORE_RECIPE_IDS)
  })

  afterEach(() => {
    fetchRaw.mockClear()
  })

  test('calls the endpoint indicating with the right parameters', async () => {
    expect(fetchRaw).toHaveBeenCalledTimes(1)
    expect(fetchRaw).toHaveBeenCalledWith(
      'ssrrecipecards-endpoint-prefix/validate',
      { customer_id: USER_ID, order_id: ORDER_ID, core_recipe_ids: JSON.stringify(CORE_RECIPE_IDS)},
      { accessToken: ACCESS_TOKEN, method: 'GET', headers: { 'Content-Type': 'application/json' } }
    )
  })

  test('returns the result of the fetch unchanged', async () => {
    expect(result).toEqual(MOCK_FETCH_RESULT)
  })
})
