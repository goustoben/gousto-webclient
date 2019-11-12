import fetch from 'utils/fetch'
import pricing from '../pricing'

const mockFetchResult = { data: [1, 2, 3] }
jest.mock('utils/fetch', () =>
  jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [1, 2, 3] })

    return getData()
  })
)

jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation((service, version = '') => `endpoint-${service}${version}`)
)

jest.mock('config/routes', () => ({
  core: {
    prices: '/prices',
  }
}))

describe('pricing api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('pricing', () => {
    test('should fetch the correct url', async () => {
      const accessToken = 'token'
      const items = [ { id: '123' }, { id: '456' } ]
      const deliveryDate = '2019-09-10T00:00:00'
      const deliverySlotId = '234'
      const promocode = 'FREEFOODPLS'
      const tariffId = '345'
      const daySlotLeadTimeId = '456'
      const deliveryTariffId = '567'

      const expectedReqData = {
        items,
        promo_code: promocode,
        delivery_slot_id: deliverySlotId,
        delivery_date: deliveryDate,
        day_slot_lead_time_id: daySlotLeadTimeId,
        delivery_tariff_id: deliveryTariffId,
        tariff_id: tariffId,
      }
      await pricing(
        accessToken,
        items,
        deliveryDate,
        deliverySlotId,
        promocode,
        daySlotLeadTimeId,
        deliveryTariffId,
        tariffId
      )
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(accessToken, 'endpoint-core/prices', expectedReqData, 'GET')
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await pricing('token', [], '2019-09-10T00:00:00', '1', 'a', '1')
      expect(result).toEqual(mockFetchResult)
    })
  })
})
