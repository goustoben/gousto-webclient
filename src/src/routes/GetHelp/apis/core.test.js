import { fetch } from 'utils/fetch'
import { fetchShippingAddresses } from './core'

jest.mock('config/endpoint', () => (service) => `${service}-endpoint-prefix`)

const MOCK_FETCH_RESULT = { data: [1, 2, 3] }
const ACCESS_TOKEN = 'abcd1234'

jest.mock('utils/fetch', () => ({
  fetch: jest.fn().mockResolvedValue({ data: [1, 2, 3] })
}))

describe('fetchShippingAddresses', () => {
  let result

  beforeAll(async () => {
    result = await fetchShippingAddresses(ACCESS_TOKEN)
  })

  afterEach(() => {
    fetch.mockClear()
  })

  test('calls the endpoint indicating to get only shipping addresses', async () => {
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      ACCESS_TOKEN,
      'core-endpoint-prefix/user/current/address',
      { type: 'shipping' },
      'GET',
    )
  })

  test('returns the result of the fetch unchanged', async () => {
    expect(result).toEqual(MOCK_FETCH_RESULT)
  })
})
