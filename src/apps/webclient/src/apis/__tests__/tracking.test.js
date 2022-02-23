import { fetch } from 'utils/fetch'
import { trackOrder } from '../tracking'

jest.mock('utils/fetch', () => ({
  fetch: jest.fn()
}))

describe('tracking api', () => {
  describe('trackOrder', () => {
    test('should make POST request to the correct url with the passed request data', async () => {
      const request = {
        common: {
          order_id: 'fake_order_id',
        },
        awin: {
          merchant: 'fake_merchant_id',
          amount: '100',
          parts: 'fake_parts',
          cr: 'GBP',
          cks: 'fake_cks',
        },
        tapjoy: {
          transaction_id: 'fake_transaction_id'
        },
      }

      await trackOrder(request)

      expect(fetch).toHaveBeenCalledWith(
        null,
        'https://production-api.gousto.co.uk/customers/v1/customers/track-order',
        request,
        'POST',
        'default',
        { 'Content-Type': 'application/json' }
      )
    })
  })
})
