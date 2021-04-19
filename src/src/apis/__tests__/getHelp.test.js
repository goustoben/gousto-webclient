import fetch, { fetchRaw } from 'utils/fetch'
import {
  applyDeliveryCompensation,
  shouldShowEntryPointTooltip,
  validateDelivery,
} from '../getHelp'

const ACCESS_TOKEN = 'shhh-is-a-secret'
const MOCK_RESPONSE = { data: [1, 2, 3] }
const ORDER_DELIVERY_DATE = '2019-07-27 00:00:00'
const USER_ID = '12345'
const ORDER_ID = '6789'
const COMPLAINT_CATEGORY_ID = '13578'

jest.mock('utils/fetch')
fetch.mockResolvedValue(MOCK_RESPONSE)

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
        'https://production-api.gousto.co.uk/ssr/v1/ssr/show-tooltip',
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
      response = await applyDeliveryCompensation(ACCESS_TOKEN, USER_ID, ORDER_ID, COMPLAINT_CATEGORY_ID)
    })

    test('the fetch function is called with the right parameters', () => {
      expect(fetchRaw).toHaveBeenCalledTimes(1)
      expect(fetchRaw).toHaveBeenCalledWith(
        'https://production-api.gousto.co.uk/ssrdeliveries/v1/ssrdeliveries/refund',
        { customer_id: USER_ID, order_id: ORDER_ID, category_id: COMPLAINT_CATEGORY_ID },
        { accessToken: ACCESS_TOKEN, method: 'POST', headers: { 'Content-Type': 'application/json' } }
      )
    })
  })

  describe('Given validateDelivery function is called with the correct payload', () => {
    const MOCK_FETCH_RESULT = {
      status: 'ok',
      data: {
        compensation: 48.3,
        percentage: 10,
      }
    }
    fetchRaw.mockResolvedValue(MOCK_FETCH_RESULT)

    beforeEach(async () => {
      response = await validateDelivery(ACCESS_TOKEN, USER_ID, ORDER_ID)
    })

    test('the fetch function is called with the right parameters', () => {
      expect(fetchRaw).toHaveBeenCalledTimes(1)
      expect(fetchRaw).toHaveBeenCalledWith(
        'https://production-api.gousto.co.uk/ssrdeliveries/v1/ssrdeliveries/validate',
        { customer_id: USER_ID, order_id: ORDER_ID},
        { accessToken: ACCESS_TOKEN, method: 'POST', headers: { 'Content-Type': 'application/json' } }
      )
    })

    test('it returns the response received without modifying it', () => {
      expect(response).toEqual(MOCK_FETCH_RESULT)
    })
  })
})
