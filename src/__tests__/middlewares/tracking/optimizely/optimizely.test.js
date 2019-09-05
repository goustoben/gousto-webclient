import { optimizelyTracker } from 'middlewares/tracking/optimizely'

describe('optimizely middleware', () => {
  const action = {
    type: 'Order Placed',
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
    type: 'Order Placed',
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
