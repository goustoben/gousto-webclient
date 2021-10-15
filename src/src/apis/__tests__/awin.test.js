import { fetch } from 'utils/fetch'
import { awinServerToServer } from '../awin'

jest.mock('utils/fetch', () => ({
  fetch: jest.fn()
}))

describe('awin apis', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('awinServerToServer', () => {
    test('should fetch the correct url', async () => {
      const reqData = {
        merchant: '5070',
        amount: '12.50',
        ref: '12345',
        cr: 'GBR',
        vc: 'DTI-CODE',
        parts: 'commissionGroup:12.50',
        cks: '5070_awin_click_checksum',
        user_id: '54321',
      }
      await awinServerToServer(reqData)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(
        null,
        'https://production-api.gousto.co.uk/customers/v1/customers/awin-server-to-server',
        reqData,
        'POST',
        'default',
        { 'Content-Type': 'application/json' }
      )
    })
  })
})
