import fetch from 'utils/fetch'
import { fetchDeliveryDays } from "apis/deliveries/fetchDeliveryDays"
import { fetchDeliveryConsignment } from "apis/deliveries/fetchDeliveryConsignment"

const mockFetchResult = { data: [1, 2, 3] }
jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
)

jest.mock('config/routes', () => ({
  deliveries: {
    days: '/days',
    consignments: '/consignments',
  }
}))

describe('deliveries api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('fetchDeliveryDays', () => {
    describe('given a request', () => {
      const accessToken = 'accessCode'
      const cutoffDatetimeFrom = 'cutoffDatetimeFrom'
      const menuCutoffUntil = 'menuCutoffUntil'
      const isNDDExperiment = true
      const deliveryTariffId = '123'

      describe('and no postcode is provided', () => {
        describe('when `fetchDeliveryDays` called', () => {
          let result

          beforeEach(async () => {
            result = await fetchDeliveryDays(accessToken, cutoffDatetimeFrom, menuCutoffUntil, isNDDExperiment, deliveryTariffId)
          })

          test('then fetch the correct url with a GET request', () => {
            expect(fetch).toHaveBeenCalledTimes(1)
            expect(fetch).toHaveBeenNthCalledWith(1, expect.anything(), 'https://production-api.gousto.co.uk/deliveries/v1.0/days', expect.anything(), 'GET')
          })

          test('then the access token should have been provided', () => {
            expect(fetch).toHaveBeenCalledTimes(1)
            expect(fetch).toHaveBeenNthCalledWith(1, accessToken, expect.anything(), expect.anything(), expect.anything())
          })

          test('then the correct request body should be sent', () => {
            const expectedRequestBody = {
              'filters[cutoff_datetime_from]': cutoffDatetimeFrom,
              'filters[cutoff_datetime_until]': menuCutoffUntil,
              ndd: 'true',
              delivery_tariff_id: deliveryTariffId,
              sort: 'date',
              direction: 'asc',
            }

            expect(fetch).toHaveBeenCalledTimes(1)
            expect(fetch).toHaveBeenNthCalledWith(1, accessToken, expect.anything(), expectedRequestBody, expect.anything())
          })

          test('then the result equals expected result', () => {
            expect(result).toEqual(mockFetchResult)
          })
        })
      })

      describe('and the provided postocde of 4 character or less', () => {
        const postcode = 'rm14'
        let result

        describe('when `fetchDeliveryDays` called', () => {
          beforeEach(async () => {
            result = await fetchDeliveryDays(accessToken, cutoffDatetimeFrom, menuCutoffUntil, isNDDExperiment, deliveryTariffId, postcode)
          })

          test('then fetch the correct url with a GET request', () => {
            expect(fetch).toHaveBeenCalledTimes(1)
            expect(fetch).toHaveBeenNthCalledWith(1, expect.anything(), 'https://production-api.gousto.co.uk/deliveries/v1.0/days', expect.anything(), 'GET')
          })

          test('then the access token should have been provided', () => {
            expect(fetch).toHaveBeenCalledTimes(1)
            expect(fetch).toHaveBeenNthCalledWith(1, accessToken, expect.anything(), expect.anything(), expect.anything())
          })

          test('then body should not contain the postcode', () => {
            const expectedRequestBody = {
              'filters[cutoff_datetime_from]': cutoffDatetimeFrom,
              'filters[cutoff_datetime_until]': menuCutoffUntil,
              ndd: 'true',
              delivery_tariff_id: deliveryTariffId,
              sort: 'date',
              direction: 'asc',
            }

            expect(fetch).toHaveBeenCalledTimes(1)
            expect(fetch).toHaveBeenNthCalledWith(1, accessToken, expect.anything(), expectedRequestBody, expect.anything())
          })

          test('then the result equals expected result', () => {
            expect(result).toEqual(mockFetchResult)
          })
        })
      })

      describe('and the provided postcode is 5 characterss or longer', () => {
        const postcode = 'RM14 1DL'
        let result

        describe('when `fetchDeliveryDays` called', () => {
          beforeEach(async () => {
            result = await fetchDeliveryDays(accessToken, cutoffDatetimeFrom, menuCutoffUntil, isNDDExperiment, deliveryTariffId, postcode)
          })

          test('then fetch the correct url with a GET request', () => {
            expect(fetch).toHaveBeenCalledTimes(1)
            expect(fetch).toHaveBeenNthCalledWith(1, expect.anything(), 'https://production-api.gousto.co.uk/deliveries/v1.0/days', expect.anything(), 'GET')
          })

          test('then the access token should have been provided', () => {
            expect(fetch).toHaveBeenCalledTimes(1)
            expect(fetch).toHaveBeenNthCalledWith(1, accessToken, expect.anything(), expect.anything(), expect.anything())
          })

          test('then the body should contain the postcode trimmed to 4 characters and lowercased', () => {
            const expectedRequestBody = {
              'filters[cutoff_datetime_from]': cutoffDatetimeFrom,
              'filters[cutoff_datetime_until]': menuCutoffUntil,
              ndd: 'true',
              delivery_tariff_id: deliveryTariffId,
              postcode: 'rm14',
              sort: 'date',
              direction: 'asc',
            }

            expect(fetch).toHaveBeenCalledTimes(1)
            expect(fetch).toHaveBeenNthCalledWith(1, accessToken, expect.anything(), expectedRequestBody, expect.anything())
          })

          test('then the result equals expected result', () => {
            expect(result).toEqual(mockFetchResult)
          })
        })
      })
    })
  })

  describe('fetchDeliveryConsignment', () => {
    test('should fetch from the correct URL', async () => {
      const accessToken = 'token'
      const orderId = '12345'
      await fetchDeliveryConsignment(accessToken, orderId)

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        accessToken, 'https://production-api.gousto.co.uk/deliveries/v1.0/consignments', {'filters[order_id]': '12345'}, 'GET'
      )
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchDeliveryConsignment('token', {})
      expect(result).toEqual(mockFetchResult)
    })
  })
})
