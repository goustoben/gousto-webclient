import { fetch } from 'utils/fetch'
import {
  withMockEnvironmentAndDomain
} from '_testing/isomorphic-environment-test-utils'
import { validateOrder } from './validateOrder'

const ACCESS_TOKEN = 'shhh-is-a-secret'
const MOCK_RESPONSE = { data: [1, 2, 3] }
const VALIDATE_ORDER_BODY = {
  customer_id: 100,
  order_id: 200,
}

jest.mock('utils/fetch')
fetch.mockResolvedValue(MOCK_RESPONSE)

describe('getHelp API', () => {
  // mock the environment and domain config used by these tests to generate endpoints
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

  let response
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('Given shouldShowEntryPointTooltip function is called with the correct payload', () => {
    beforeEach(async () => {
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
