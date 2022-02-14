import { canUseWindow } from 'utils/browserEnvironment'
import { gtmMiddleware } from '..'

jest.mock('utils/browserEnvironment')

const action = {
  gtmEvent: {
    event: 'test-event',
  },
}

describe('gtm middleware', () => {
  describe('when window is available', () => {
    beforeEach(() => {
      canUseWindow.mockReturnValue(true)
    })

    test('should push to gtm with correct data', () => {
      window.dataLayer = []

      gtmMiddleware(action)

      expect(window.dataLayer[0]).toEqual({ event: 'test-event' })
    })
  })

  describe('when window is not available', () => {
    beforeEach(() => {
      canUseWindow.mockReturnValue(false)
    })

    test('should not push to gtm', () => {
      window.dataLayer = []

      gtmMiddleware(action)

      expect(window.dataLayer).toHaveLength(0)
    })
  })
})
