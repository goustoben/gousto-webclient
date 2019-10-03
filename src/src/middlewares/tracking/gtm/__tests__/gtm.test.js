import { gtmMiddleware } from ".."

describe('gtm middleware', () => {

  test('should push to gtm with correct data', () => {
    window.dataLayer = []

    const action = {
      gtmEvent: {
        event: 'test-event'
      }
    }

    gtmMiddleware(action)

    expect(window.dataLayer[0]).toEqual({ event: 'test-event' })
  })
})
