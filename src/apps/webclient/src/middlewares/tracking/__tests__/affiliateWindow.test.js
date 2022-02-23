import affiliateWindow from 'middlewares/tracking/affiliateWindow'
import { canUseWindow } from 'utils/browserEnvironment'

jest.mock('utils/browserEnvironment')

describe('affiliateWindow tracking middleware', () => {
  beforeEach(() => {
    window.dataLayer = []
  })

  describe('when window is available', () => {
    beforeEach(() => {
      canUseWindow.mockReturnValue(true)
    })

    test('should merge the given action with { eventType: \'affiliateEvent\' } and push it into window.dataLayer if asource is "awin"', () => {
      affiliateWindow({ asource: 'awin', orderId: '1234' })
      expect(window.dataLayer.length).toBe(1)
      expect(window.dataLayer[0]).toEqual({
        asource: 'awin',
        eventType: 'affiliateEvent',
        orderId: '1234',
        state: {},
      })
    })

    test('should merge the given action with { eventType: \'affiliateEvent\' } and push it into window.dataLayer if asource is "awin"', () => {
      affiliateWindow({
        asource: ['awin', 'awin'],
        orderId: '5678',
      })

      expect(window.dataLayer.length).toBe(1)
      expect(window.dataLayer[0]).toEqual({
        asource: 'awin',
        eventType: 'affiliateEvent',
        orderId: '5678',
        state: {},
      })
    })

    test('should not push items onto window.dataLayer if asource is not "awin"', () => {
      affiliateWindow({ orderId: '1234' })
      expect(window.dataLayer.length).toBe(0)
    })
  })

  describe('when window is not available', () => {
    beforeEach(() => {
      canUseWindow.mockReturnValue(false)
    })

    test('does nothing', () => {
      affiliateWindow({ asource: 'awin', orderId: '1234' })
      expect(window.dataLayer.length).toBe(0)
    })
  })
})
