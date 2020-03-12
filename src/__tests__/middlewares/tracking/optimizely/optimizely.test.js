import { optimizelyTracker } from 'middlewares/tracking/optimizely'
import * as trackingKeys from 'actions/trackingKeys'

describe('optimizely middleware', () => {
  const action = {
    type: trackingKeys.placeOrder,
    optimizelyData: {
      type: 'event',
      eventName: 'order_placed_gross',
      tags: {
        revenue: '10.00'
      },
      attributes: {
        isSignUpInLast30days: false
      }
    }
  }

  const notOptimizelyAction = {
    type: trackingKeys.placeOrder,
  }

  const nextMock = jest.fn()

  beforeEach(() => {
    window.optimizely = []
  })

  test('should push to optimizely with correct data', () => {

    const result = {
      type: 'event',
      eventName: 'order_placed_gross',
      tags: {
        revenue: 1000
      },
      attributes: {
        isSignUpInLast30days: false
      }
    }

    optimizelyTracker()(nextMock)(action)
    expect(window.optimizely[0]).toEqual(result)
    expect(nextMock).toHaveBeenCalled()
  })

  test('should not push to optimizely and should call next callback if optimizelyData not passed', () => {
    optimizelyTracker()(nextMock)(notOptimizelyAction)
    expect(window.optimizely).toEqual([])
    expect(nextMock).toHaveBeenCalled()
  })
})
