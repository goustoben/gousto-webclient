import fetch, { fetchRaw } from 'utils/fetch'
import { shouldShowEntryPointTooltip, applyDeliveryCompensation } from '../getHelp'

const ACCESS_TOKEN = 'shhh-is-a-secret'
const MOCK_RESPONSE = { data: [1, 2, 3] }
const ORDER_DELIVERY_DATE = '2019-07-27 00:00:00'
const USER_ID = '12345'
const ORDER_ID = '6789'
const COMPLAINT_CATEGORY = '13578'
const REFUND_VALUE = 38

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
  let response
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('Given shouldShowEntryPointTooltip function is called with the correct payload', () => {
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

  describe('Given applyDeliveryCompensation function is called with the correct payload', () => {
    beforeEach(async () => {
      response = await applyDeliveryCompensation(ACCESS_TOKEN, USER_ID, ORDER_ID, COMPLAINT_CATEGORY, REFUND_VALUE)
    })

    test('the fetch function is called with the right parameters', () => {
      expect(fetchRaw).toHaveBeenCalledTimes(1)
      expect(fetchRaw).toHaveBeenCalledWith(
        'endpoint-ssr/vX/delivery-refund',
        { user_id: USER_ID, order_id: ORDER_ID, complaint_category: COMPLAINT_CATEGORY,refund_value: REFUND_VALUE},
        { accessToken: ACCESS_TOKEN, method: 'POST', headers: { 'Content-Type': 'application/json' } }
      )
    })
  })
})
