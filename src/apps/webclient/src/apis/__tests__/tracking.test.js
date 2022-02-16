import { fetch } from 'utils/fetch'
import { trackAwinOrder } from '../tracking'

jest.mock('utils/fetch', () => ({
  fetch: jest.fn()
}))

describe('tracking api', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('trackAwinOrder', () => {
    test('should make POST request to the correct url with the passed request data', async () => {
      const common = {
        order_id: '156',
      }
      const awin = {
        merchant: 'fake_merchant_id',
        amount: '100',
        parts: 'fake_parts',
        cr: 'GBP',
        cks: 'fake_cks',
      }

      await trackAwinOrder(common, awin)

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        null,
        'https://production-api.gousto.co.uk/customers/v1/customers/track-order',
        {
          common,
          awin,
        },
        'POST',
        'default',
        { 'Content-Type': 'application/json' }
      )
    })
  })
})
