import fetch from 'utils/fetch'
import { shouldShowEntryPointTooltip } from '../getHelp'

const ACCESS_TOKEN = 'shhh-is-a-secret'
const MOCK_RESPONSE = { data: [1, 2, 3] }
const ORDER_DELIVERY_DATE = '2019-07-27 00:00:00'

jest.mock('utils/fetch')
fetch.mockResolvedValue(MOCK_RESPONSE)

jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation(
    (service, version = '') => `endpoint-${service}/${version}`
  )
)

jest.mock('config/routes', () => ({
  version: {
    ssr: 'vX',
  },
}))

describe('getHelp API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given shouldShowEntryPointTooltip function is called with the correct payload', () => {
    let response

    beforeEach(async () => {
      response = await shouldShowEntryPointTooltip(ACCESS_TOKEN, ORDER_DELIVERY_DATE)
    })

    test('the fetch function is called with the right parameters', () => {
      expect(fetch).toHaveBeenCalledWith(
        ACCESS_TOKEN,
        'endpoint-ssr/vX/ssr/show-tooltip',
        { delivery_date: ORDER_DELIVERY_DATE },
        'GET'
      )
      expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('it returns the response received without modifying it', () => {
      expect(response).toBe(MOCK_RESPONSE)
    })
  })
})
